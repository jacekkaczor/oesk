import { GiSandsOfTime } from "react-icons/gi";
import { MdRepeatOne } from "react-icons/md";
import React, { Component } from "react";
import { connect } from "react-redux";
import { addRequest } from "../actions/urls";
import PropTypes from "prop-types";

class InputForm extends Component {
  state = {
    url: "",
    n: 1,
    c: 1,
    reccuring: false
  };

  static propTypes = {
    addRequest: PropTypes.func.isRequired
  };

  handleRecurringChange = e => {
    let reccuring = e.target.value === "recurring" ? true : false;
    this.setState({
      reccuring
    });
  };

  onChangeUrl = e => {
    this.setState({ url: e.target.value });
  };

  onChangeValue = (type, e) => {
    if (type === "n") this.setState({ n: e.target.value });
    else if (type === "c") this.setState({ c: e.target.value });
  };

  onSubmit = () => {
    const { url, n, c } = this.state;
    let data = JSON.stringify({
      url: url,
      n: n,
      c: c
    });
    this.props.addRequest(data);
  };

  render() {
    const { url, n, c } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h4 className="card-title pb-2">New query</h4>
        <form>
          <div className="form-group">
            <label>URL address</label>
            <input
              type="url"
              className="form-control"
              id="inputUrl"
              value={url}
              onChange={e => this.onChangeUrl(e)}
            />
            <small id="urlHelp" className="form-text text-muted">
              Enter the URL of the page you want to test. Correct address
              format: "google.pl/".
            </small>
          </div>

          <div className="form-row align-items-center">
            <div className="col-auto w-50">
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">-n</div>
                </div>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Number of requests"
                  min="1"
                  value={n}
                  onChange={e => this.onChangeValue("n", e)}
                />
              </div>
            </div>
            <div className="col-auto w-50">
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">-c</div>
                </div>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Level of parallelism"
                  min="1"
                  value={c}
                  onChange={e => this.onChangeValue("c", e)}
                />
              </div>
            </div>
          </div>

          <div className="mt-2 mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="radios"
                id="nonRecurringRadio"
                value="nonRecurring"
                checked={this.state.reccuring === false}
                onChange={this.handleRecurringChange}
              />
              <label className="form-check-label" htmlFor="nonRecurringRadio">
                non-recurring
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="radios"
                id="recurringRadio"
                value="recurring"
                checked={this.state.reccuring === true}
                onChange={this.handleRecurringChange}
              />
              <label className="form-check-label" htmlFor="recurringRadio">
                recurring
              </label>
            </div>
          </div>

          {this.state.reccuring ? (
            <div className="form-row align-items-center mt-2 mb-2">
              <div className="col-auto w-50">
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <GiSandsOfTime />
                    </div>
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Frequency"
                    min="2"
                  />
                </div>
              </div>
              <div className="col-auto w-50">
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <MdRepeatOne />
                    </div>
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Number of repetitions"
                    min="2"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div />
          )}

          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.onSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    urls: state.urls.urls,
    text: state.urls.text
  };
};

export default connect(mapStateToProps, { addRequest })(InputForm);
