import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUrls, getByUrl } from "../actions/urls";
import PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

import "./styles.css";

class ItemsList extends Component {
  state = {
    redirect: false,
    url: ""
  };

  static propTypes = {
    urls: PropTypes.array,
    getUrls: PropTypes.func.isRequired,
    getByUrl: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getUrls();
  }

  prepareData = () => {
    const { urls } = this.props;
    var data = [];
    urls.map(url => {
      var temp = {
        url
      };
      data.push(temp);
    });
    return data;
  };

  selectUrl = url => {
    this.props.getByUrl(url);
    this.setState({
      redirect: true,
      url
    });
  };

  render() {
    const { redirect, url } = this.state;
    if (redirect) return <Redirect to={`${url}`} />;
    const data = this.prepareData();
    //if (redirect) return <Redirect to="/graph" />;
    const options = {
      onRowClick: row => this.selectUrl(row.url)
    };
    return (
      <div>
        <BootstrapTable data={data} striped hover pagination options={options}>
          <TableHeaderColumn
            isKey={true}
            dataSort
            dataField="url"
            filter={{ type: "TextFilter", delay: 100 }}
            headerAlign="center"
          >
            URL
          </TableHeaderColumn>
        </BootstrapTable>
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

export default connect(mapStateToProps, { getUrls, getByUrl })(ItemsList);
