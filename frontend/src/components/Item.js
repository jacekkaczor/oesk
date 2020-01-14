import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { deleteItem } from "../actions/urls";
import "./styles.css";
import Repatitions from "./Repatitions";
import { GoGraph } from "react-icons/go";

const selectRowProp = {
  mode: "checkbox"
};

class Item extends Component {
  state = {
    redirect: false
  };

  static propTypes = {
    urls: PropTypes.array
  };

  static propTypes = {
    deleteItem: PropTypes.func.isRequired
  };

  prepareData = () => {
    const { urls } = this.props;
    var dataUrl = [],
      dataRecurrents = [];
    urls.map(url => {
      url.results.map(result => {
        const date = new Date(result.creationDateTime);
        var temp = {
          id: result.id,
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
        dataUrl.push(temp);
      });
      url.recurrents.map(item => {
        const date = new Date(item.start);
        var temp = {
          id: item.id,
          frequency: item.id,
          repetitions: item.repetitions,
          date: date.toLocaleDateString(),
          time: date.toLocaleTimeString()
        };
        dataRecurrents.push(temp);
      });
    });
    return [dataUrl, dataRecurrents];
  };

  onAfterDeleteRow = rowKeys => {
    const values = Object.values(rowKeys);
    for (const value of values) {
      this.props.deleteItem("results", value);
    }
  };

  showGraphs = () => {
    this.setState({ redirect: true });
  };

  render() {
    const { urls } = this.props;
    const { redirect } = this.state;
    if (urls.length === 0) return <Redirect to="/" />;
    if (redirect) return <Redirect to="/graph" />;
    const title = urls[Object.keys(urls)[0]].url;
    const data = this.prepareData();
    const options = {
      afterDeleteRow: this.onAfterDeleteRow
    };
    return (
      <div>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-success"
            onClick={this.showGraphs}
          >
            <GoGraph /> Data Visualization
          </button>
        </div>

        <h4 className="text-center font-italic mt-3"> {title} </h4>
        <BootstrapTable
          exportCSV
          data={data[0]}
          striped
          hover
          pagination
          deleteRow={true}
          selectRow={selectRowProp}
          options={options}
          id="0"
        >
          <TableHeaderColumn
            isKey
            dataField="id"
            headerAlign="center"
            dataAlign="center"
            dataSort={true}
            filter={{ type: "TextFilter", delay: 100 }}
            hidden
          >
            id
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="n"
            headerAlign="center"
            dataAlign="center"
            dataSort={true}
            filter={{ type: "TextFilter", delay: 100 }}
          >
            n
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="c"
            headerAlign="center"
            dataAlign="center"
            dataSort={true}
            filter={{ type: "TextFilter", delay: 100 }}
          >
            c
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="min"
            headerAlign="center"
            dataAlign="center"
            dataSort={true}
            filter={{ type: "TextFilter", delay: 100 }}
          >
            min
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="mean"
            headerAlign="center"
            dataAlign="center"
            dataSort={true}
            filter={{ type: "TextFilter", delay: 100 }}
          >
            mean
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="sd"
            headerAlign="center"
            dataAlign="center"
            dataSort={true}
            filter={{ type: "TextFilter", delay: 100 }}
          >
            sd
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="median"
            headerAlign="center"
            dataAlign="center"
            dataSort={true}
            filter={{ type: "TextFilter", delay: 100 }}
          >
            median
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="max"
            headerAlign="center"
            dataAlign="center"
            dataSort={true}
            filter={{ type: "TextFilter", delay: 100 }}
          >
            max
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="status"
            headerAlign="center"
            dataAlign="center"
            dataSort={true}
            filter={{ type: "TextFilter", delay: 100 }}
          >
            status
          </TableHeaderColumn>
          <TableHeaderColumn
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
            dataField="time"
            headerAlign="center"
            dataAlign="center"
            dataSort={true}
            filter={{ type: "TextFilter", delay: 100 }}
          >
            time
          </TableHeaderColumn>
        </BootstrapTable>

        {data[1].length > 0 ? <Repatitions data={data[1]} /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    urls: state.urls.selectedUrl
  };
};

export default connect(mapStateToProps, { deleteItem })(Item);
