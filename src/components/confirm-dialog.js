import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, FlatButton } from 'material-ui';

export class ConfirmDialog extends Component {

  state = {
    open: false
  };

  activate = () => {
    this.setState({open: true});
  };

  confirm = () => {
    this.hideDialog();
    this.props.onConfirm()
  }

  componentWillReceiveProps ({activate}) {
    if (activate && !this.state.open) {
      this.activate();
    }
  }

  hideDialog = () => {
    this.setState({open: false});
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  };

  render () {
    const { message } = this.props;
    
    return (
          <Dialog
            actions={[
              <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.hideDialog.bind(this)}
              />,
              <FlatButton
                label="Confirm"
                primary={true}
                keyboardFocused={true}
                onClick={this.confirm.bind(this)}
              />
            ]}
            modal={false}
            open={this.state.open}
            onRequestClose={this.hideDialog}
          >
            {message}
          </Dialog>
    )
  }
}

ConfirmDialog.propTypes = {
  activate: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func
};