import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      error.msg.errors.map(err =>
        alert.error(`${err.field}: ${err.defaultMessage}`)
      );
      /*alert.error(
        `${error.msg.errors[0].field}: ${error.msg.errors[0].defaultMessage}`
      );*/
    }

    if (message !== prevProps.message) {
      if (message.addRequest) alert.success(message.addRequest);
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToPros = state => ({
  error: state.errors,
  message: state.messages
});

export default connect(mapStateToPros)(withAlert()(Alerts));
