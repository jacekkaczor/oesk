import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { deleteItem } from "../actions/urls";
import "./styles.css";

const selectRowProp = {
  mode: "checkbox",
  columnWidth: '40px'
};

class Repatitions extends Component {
  static propTypes = {
    deleteItem: PropTypes.func.isRequired
  };

  onAfterDeleteRow = rowKeys => {
    const values = Object.values(rowKeys);
    for (const value of values) {
      this.props.deleteItem("recurrents", value);
    }
  };

  render() {
    console.log("hi", this.props.data);
    const options = {
      afterDeleteRow: this.onAfterDeleteRow
    };
    return (
      <BootstrapTable
        data={this.props.data}
        deleteRow={true}
        selectRow={selectRowProp}
        options={options}
        striped
        hover
        pagination
      >
        <TableHeaderColumn row="0" colSpan="4" headerAlign="center">
          Recurrents
        </TableHeaderColumn>
        <TableHeaderColumn
          row="1"
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
          row="1"
          dataField="frequency"
          headerAlign="center"
          dataAlign="center"
          dataSort={true}
          filter={{ type: "TextFilter", delay: 100 }}
        >
          frequency
        </TableHeaderColumn>
        <TableHeaderColumn
          row="1"
          dataField="repetitions"
          headerAlign="center"
          dataAlign="center"
          dataSort={true}
          filter={{ type: "TextFilter", delay: 100 }}
        >
          repetitions
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
    );
  }
}
const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, { deleteItem })(Repatitions);
