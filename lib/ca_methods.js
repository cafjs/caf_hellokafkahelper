'use strict';

const caf = require('caf_core');
const caf_comp = caf.caf_components;
const myUtils = caf_comp.myUtils;
const app = require('../public/js/app.js');
const APP_SESSION = 'default';

exports.methods = {
    // Methods called by framework
    async __ca_init__() {
        this.$.security.addRule(this.$.security.newSimpleRule('change'));
        this.$.security.addRule(this.$.security
                                .newSimpleRule('__external_ca_touch__'));

        this.state.balance = this.$.props.initialBalance;
        this.state.users = {};
        this.state.numUpdates = 0;
        this.$.session.limitQueue(1, APP_SESSION); // only the last notification
        this.state.fullName = this.__ca_getAppName__() + '#' +
            this.__ca_getName__();
        return [];
    },

    async __ca_pulse__() {
        this.$.log && this.$.log.debug(`Calling PULSE: ${this.state.balance}`);

        this.$.react.render(app.main, [this.state]);

        return [];
    },

    //External methods

    async hello(key) {
        key && this.$.react.setCacheKey(key);
        return this.getState();
    },

    async change(user, offset, inc) {
        let lastOffset = this.state.users[user];
        lastOffset = (typeof lastOffset === 'undefined') ? -1 : lastOffset;
        if (offset > lastOffset) {
            this.state.users[user] = offset;
            this.state.numUpdates = this.state.numUpdates + 1;
            this.state.balance = this.state.balance + inc;
            this.$.session.notify([{
                balance: this.state.balance,
                numUpdates: this.state.numUpdates
            }], APP_SESSION);
            return this.getState();
        } else {
            const err = new Error(`Invalid offset ${offset}`);
            err['isInvalidOffset'] = true;
            return [err];
        }
    },

    async reset() {
        this.state.users = {};
        this.state.numUpdates = 0;
        this.state.balance = this.$.props.initialBalance;
        return this.getState();
    },

    async getState() {
        this.$.react.coin();
        const newState = myUtils.deepClone(this.state);
        delete newState.users;
        return [null, newState];
    }
};

caf.init(module);
