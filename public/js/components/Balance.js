'use strict';

const React = require('react');
const rB = require('react-bootstrap');
const cE = React.createElement;
const AppActions = require('../actions/AppActions');

class Balance extends React.Component {

    constructor(props) {
        super(props);
        this.doReset = this.doReset.bind(this);
    }

    doReset() {
        AppActions.reset(this.props.ctx);
    }

    render() {
        return cE(rB.Form, {horizontal: true},
                  cE(rB.FormGroup, {controlId: 'counterId', bsSize: 'large'},
                     cE(rB.Col, {sm:4, xs: 12},
                        cE(rB.ControlLabel, null, 'Current')
                       ),
                      cE(rB.Col, {sm:8, xs: 12},
                         cE(rB.FormControl, {
                             type: 'text',
                             readOnly: true,
                             value: this.props.balance
                         })
                        )
                    ),
                  cE(rB.FormGroup, {controlId: 'updateId', bsSize: 'large'},
                     cE(rB.Col, {sm:4, xs: 12},
                        cE(rB.ControlLabel, null, '#Updates')
                       ),
                      cE(rB.Col, {sm:8, xs: 12},
                         cE(rB.FormControl, {
                             type: 'text',
                             readOnly: true,
                             value: this.props.numUpdates
                         })
                        )
                    ),
                  cE(rB.FormGroup, {controlId: 'buttonId', bsSize: 'large'},
                     cE(rB.Col, {smOffset:4, sm:8, xs: 12},
                        cE(rB.Button, {
                            bsStyle: 'danger',
                            onClick: this.doReset
                        }, 'Reset')
                       )
                     )
                 );
    }
}

module.exports = Balance;
