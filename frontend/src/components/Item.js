import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect, Link } from "react-router-dom";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

import "./styles.css";
import DataVisualization from "./DataVisualization";

class Item extends Component {
  static propTypes = {
    urls: PropTypes.array
  };

  prepareData = () => {
    const { urls } = this.props;
    var data = [];
    urls.map(url =>
      url.results.map(result => {
        const date = new Date(result.creationDateTime);
        var temp = {
          n: url.n,
          c: url.c,
          min: result.min,
          mean: result.mean,
          sd: result.sd,
          median: result.median,
          max: result.max,
          status: result.status,
          date: date.toLocaleDateString(),
          time: date.toLocaleTimeString()
        };
        data.push(temp);
      })
    );
    return data;
  };

  render() {
    const { urls } = this.props;
    if (urls.length === 0) return <Redirect to="/" />;
    const title = urls[Object.keys(urls)[0]].url;
    const data = this.prepareData();
    return (
      <div>
        <BootstrapTable exportCSV data={data} striped hover pagination>
          <TableHeaderColumn row="0" colSpan="10" headerAlign="center">
            {title}
          </TableHeaderColumn>
          <TableHeaderColumn
            row="1"
            isKey
            dataField="n"
            headerAlign="center"
            dataAlign="center"
            dataSort={true}
            filter={{ type: "TextFilter", delay: 100 }}
          >
            n
          </TableHeaderColumn>
          <TableHeaderColumn
            row="1"
            dataField="c"
            headerAlign="center"
            dataAlign="center"
            dataSort={true}
            filter={{ type: "TextFilter", delay: 100 }}
          >
            c
          </TableHeaderColumn>
          <TableHeaderColumn
            row="1"
            dataField="min"
            headerAlign="center"
            dataAlign="center"
            dataSort={true}
            filter={{ type: "TextFilter", delay: 100 }}
          >
            min
          </TableHeaderColumn>
          <TableHeaderColumn
            row="1"
            dataField="mean"
            headerAlign="center"
            dataAlign="center"
            dataSort={true}
            filter={{ type: "TextFilter", delay: 100 }}
          >
            mean
          </TableHeaderColumn>
          <TableHeaderColumn
            row="1"
            dataField="sd"
            headerAlign="center"
            dataAlign="center"
            dataSort={true}
            filter={{ type: "TextFilter", delay: 100 }}
          >
            sd
          </TableHeaderColumn>
          <TableHeaderColumn
            row="1"
            dataField="median"
            headerAlign="center"
            dataAlign="center"
            dataSort={true}
            filter={{ type: "TextFilter", delay: 100 }}
          >
            median
          </TableHeaderColumn>
          <TableHeaderColumn
            row="1"
            dataField="max"
            headerAlign="center"
            dataAlign="center"
            dataSort={true}
            filter={{ type: "TextFilter", delay: 100 }}
          >
            max
          </TableHeaderColumn>
          <TableHeaderColumn
            row="1"
            dataField="status"
            headerAlign="center"
            dataAlign="center"
            dataSort={true}
            filter={{ type: "TextFilter", delay: 100 }}
          >
            status
          </TableHeaderColumn>
          <TableHeaderColumn
            row="1"
            dataField="date"
            headerAlign="center"
            dataAlign="center"
            width="120"
            dataSort={true}
            filter={{ type: "TextFilter", delay: 100 }}
          >
            date
          </TableHeaderColumn>
          <TableHeaderColumn
            row="1"
            dataField="time"
            headerAlign="center"
            dataAlign="center"
            dataSort={true}
            filter={{ type: "TextFilter", delay: 100 }}
          >
            time
          </TableHeaderColumn>
        </BootstrapTable>
        <Link to="/graph" className="nav-link">
          Show graphs
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    urls: state.urls.selectedUrl
  };
};

export default connect(mapStateToProps, {})(Item);
