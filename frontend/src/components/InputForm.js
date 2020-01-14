import { GiSandsOfTime } from "react-icons/gi";
import { MdRepeatOne, MdAccessTime } from "react-icons/md";
import { GoCalendar } from "react-icons/go";
import React, { Component } from "react";
import { connect } from "react-redux";
import { addRequest } from "../actions/urls";
import PropTypes from "prop-types";

class InputForm extends Component {
  state = {
    url: "",
    n: 1,
    c: 1,
    reccuring: false,
    date: "2020-01-15",
    time: "10:00",
    frequency: 1,
    repetitions: 1,
    startNow: false
  };

  static propTypes = {
    addRequest: PropTypes.func.isRequired
  };

  componentDidMount() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    var hh = String(today.getHours() + 1);

    if (hh.length === 1) hh = "0" + hh;
    var date = yyyy + "-" + mm + "-" + dd;
    var time = hh + ":00";

    this.setState({
      date,
      time
    });
  }

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

  setStartNow = e => {
    this.setState({ startNow: e.target.checked });
  };

  setDate = (e, type) => {
    if (type === "date") {
      this.setState({ date: e.target.value });
    } else if (type === "time") {
      this.setState({ time: e.target.value });
    }
    console.log("date", this.state.date, this.state.time);
  };

  setFrequency = e => {
    this.setState({ frequency: e.target.value });
  };

  setRepetitions = e => {
    this.setState({ repetitions: e.target.value });
  };

  onSubmit = () => {
    const {
      url,
      n,
      c,
      reccuring,
      date,
      time,
      frequency,
      repetitions,
      startNow
    } = this.state;
    const start = new Date(date + " " + time).toJSON();

    var data = {
      url: url,
      n: n,
      c: c
    };

    if (reccuring) {
      data["frequency"] = frequency;
      data["repetitions"] = repetitions;
      if (!startNow) data["start"] = start;
    }
    this.props.addRequest(JSON.stringify(data));
  };

  render() {
    const {
      url,
      n,
      c,
      reccuring,
      startNow,
      date,
      time,
      frequency,
      repetitions
    } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h4 className="card-title pb-2">New query</h4>
        <form>
          <div className="form-group">
            <label>URL address</label>
            <input
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
              <small id="requests" className="form-text text-muted">
                Number of requests.
              </small>
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
                  id="requests"
                />
              </div>
            </div>
            <div className="col-auto w-50">
              <small id="parallelism" className="form-text text-muted">
                Level of parallelism.
              </small>
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
                  id="parallelism"
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
                checked={reccuring === false}
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
                checked={reccuring === true}
                onChange={this.handleRecurringChange}
              />
              <label className="form-check-label" htmlFor="recurringRadio">
                recurring
              </label>
            </div>
          </div>

          {reccuring ? (
            <div>
              <div className="form-row align-items-center mt-2 mb-2">
                <div className="col-sm ">
                  <small id="frequency" className="form-text text-muted">
                    The number of repetitions (-1: infinity).
                  </small>
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
                      min="1"
                      id="frequency"
                      value={frequency}
                      onChange={e => this.setFrequency(e)}
                    />
                  </div>
                </div>
                <div className="col-sm">
                  <small id="repetitions" className="form-text text-muted">
                    How often perform task (in seconds).
                  </small>
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
                      min="-1"
                      value={repetitions}
                      onChange={e => this.setRepetitions(e)}
                      id="repetitions"
                    />
                  </div>
                </div>
              </div>

              {startNow ? null : (
                <div className="form-row align-items-center">
                  <div className="col-sm ">
                    <small id="date" className="form-text text-muted">
                      Date of first request.
                    </small>
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <GoCalendar />
                        </div>
                      </div>
                      <input
                        className="form-control"
                        type="date"
                        placeholder="Date"
                        value={date}
                        onChange={e => this.setDate(e, "date")}
                        id="date"
                      />
                    </div>
                  </div>
                  <div className="col-sm ">
                    <small id="time" className="form-text text-muted">
                      Time of first request.
                    </small>
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <MdAccessTime />
                        </div>
                      </div>
                      <input
                        className="form-control"
                        type="time"
                        placeholder="Time"
                        value={time}
                        onChange={e => this.setDate(e, "time")}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  value={startNow}
                  onChange={e => this.setStartNow(e)}
                  checked={startNow}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Start now
                </label>
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
