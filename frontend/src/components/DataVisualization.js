import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { MdKeyboardBackspace } from "react-icons/md";

const measurements = ["min", "mean", "sd", "median", "max"];
const colors = ["#8884d8", "#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

class DataVisualization extends Component {
  state = {
    allN: [],
    allC: [],
    selectedN: null,
    selectedC: null,
    dataN: [],
    dataNC: [],
    measurements: [],
    redirect: false
  };

  static propTypes = {
    urls: PropTypes.array,
    parameters: PropTypes.object
  };

  componentDidMount() {
    var params = this.getParams();
    const temp = {};
    for (const key of measurements) {
      if (key === "mean") temp[key] = true;
      else temp[key] = false;
    }

    this.setState(
      {
        allN: params[0],
        allC: params[1],
        selectedN: params[0][0],
        selectedC: params[1][0],
        measurements: temp
      },
      this.prepareData
    );
  }

  componentDidUpdate(prevProps) {
    const { parameters } = this.props;
    var params = this.getParams();

    if (prevProps.parameters !== parameters) {
      this.setState({
        allN: params[0],
        allC: params[1]
      });
    }
  }

  getParams = () => {
    const { parameters } = this.props;
    var n = [],
      c = [];
    for (let key in parameters) {
      if (parameters.hasOwnProperty(key)) {
        n.push(key);
        if (c.length === 0) {
          parameters[key].map(value => c.push(value));
          c.sort((a, b) => a - b);
        }
      }
    }
    return [n, c];
  };

  changeParameter = (event, type) => {
    const { parameters } = this.props;
    if (type === "n") {
      var c = [];
      for (let key in parameters) {
        if (parameters.hasOwnProperty(key)) {
          if (key === event.target.value) {
            parameters[key].map(value => c.push(value));
            c.sort((a, b) => a - b);
          }
        }
      }
      this.setState(
        {
          selectedN: event.target.value,
          selectedC: c[0],
          allC: c
        },
        this.prepareData
      );
    } else {
      this.setState(
        {
          selectedC: event.target.value
        },
        this.prepareData
      );
    }
  };

  prepareData = () => {
    const { urls } = this.props;
    const { selectedN, selectedC } = this.state;
    var result,
      newData = [];
    var temp = JSON.parse(JSON.stringify(urls));
    urls.forEach((url, i) => {
      if (url.n === parseInt(selectedN) && url.results.length !== 0) {
        url.results.map((v, i) => {
          let date = new Date(v.creationDateTime);
          if (date instanceof Date && !isNaN(date))
            url.results[i].creationDateTime = date.toLocaleString();
        });
        result = url.results[0];
        result = url.results.reduce(function(a, b) {
          return {
            min: a.min + b.min,
            mean: a.mean + b.mean,
            sd: a.sd + b.sd,
            median: a.median + b.median,
            max: a.max + b.max,
            creationDateTime: a.creationDateTime
          };
        });
        result = {
          min: result.min / url.results.length,
          mean: result.mean / url.results.length,
          sd: result.sd / url.results.length,
          median: result.median / url.results.length,
          max: result.max / url.results.length,
          creationDateTime: result.creationDateTime
        };
        temp[i].results = result;
        newData.push(temp[i]);
        newData.sort(function(a, b) {
          return a.c - b.c;
        });
        url.results.sort(function(a, b) {
          return a.creationDateTime > b.creationDateTime ? 1 : -1;
        });
        if (url.c === parseInt(selectedC)) this.setState({ dataNC: url });
      }
    });
    this.setState({ dataN: newData });
  };

  changeMeasurement = (k, e) => {
    var measurements = this.state.measurements;
    measurements[`${k}`] = e.target.checked;
    this.setState({ measurements });
  };

  back = () => {
    this.setState({ redirect: true });
  };

  render() {
    const {
      allN,
      allC,
      selectedN,
      selectedC,
      dataN,
      dataNC,
      measurements,
      redirect
    } = this.state;
    const { urls } = this.props;
    if (urls.length === 0) return <Redirect to="/" />;
    if (dataN.length === 0 || dataNC.length === 0) this.prepareData();

    if (redirect) return <Redirect to={`/:${urls[0].url}`} />;
    return (
      <div>
        <div className="form-row align-items-center mt-2">
          <div className="form-group col-md-6">
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text">-n</div>
              </div>
              <select
                id="inputState"
                className="form-control"
                onChange={e => this.changeParameter(e, "n")}
                value={selectedN || ""}
              >
                {allN.map((n, i) => (
                  <option key={i} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group col-md-6">
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text">-c</div>
              </div>
              <select
                id="inputState"
                className="form-control"
                onChange={e => this.changeParameter(e, "c")}
                value={selectedC || ""}
              >
                {allC.map((c, i) => (
                  <option key={i} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <label id="urlHelp" className="form-text text-center">
          Graph for the given n and c versus time.
        </label>
        <BarChart width={900} height={300} data={dataNC.results}>
          <XAxis
            dataKey="creationDateTime"
            stroke="#000"
            tick={{ angle: 0, width: 50 }}
            interval={0}
            scaleToFit={true}
          />
          <YAxis
            label={{ value: "time [ms]", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          {Object.entries(measurements).map(([key, value], i) =>
            value ? (
              <Bar
                type="monotone"
                dataKey={key}
                fill={colors[i]}
                barSize={30}
              />
            ) : null
          )}
        </BarChart>

        <label id="urlHelp" className="form-text text-center">
          Graph for the given n versus c.
        </label>
        <BarChart width={900} height={300} data={dataN}>
          <XAxis dataKey="c" stroke="#000" />
          <YAxis
            label={{ value: "time [ms]", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          {Object.entries(measurements).map(([key, value], i) =>
            value ? (
              <Bar
                type="monotone"
                dataKey={`results.${key}`}
                fill={colors[i]}
                barSize={30}
                interval={0}
              />
            ) : null
          )}
        </BarChart>

        <div className="d-flex justify-content-center mb-3">
          {Object.entries(measurements).map(([key, value]) => (
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id={key}
                value={value}
                onChange={e => this.changeMeasurement(key, e)}
                checked={value}
              />
              <label className="form-check-label" htmlFor={key}>
                {key}
              </label>
            </div>
          ))}
        </div>
        <button type="button" className="btn btn-success" onClick={this.back}>
          <MdKeyboardBackspace /> Back
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    urls: state.urls.selectedUrl,
    parameters: state.urls.parameters
  };
};

export default connect(mapStateToProps, {})(DataVisualization);
