import "bootstrap/dist/css/bootstrap.css";
import "bootswatch/dist/flatly/bootstrap.min.css";
import React, { Component, Fragment } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import { Header } from "./components/Header";
import InputForm from "./components/InputForm";
import ItemsList from "./components/ItemsList";
import Item from "./components/Item";
import DataVisualization from "./components/DataVisualization";
import Alert from "./components/Alerts";

const alertOptions = {
  timeout: 3000,
  position: "bottom center"
};

class App extends Component {
  render() {
    return (
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Router>
          <Header />
          <Alert />
          <Fragment>
            <div className="d-flex justify-content-center p-3">
              <div className="w-50">
                <Switch>
                  <Route exact path="/" component={ItemsList} />
                  <Route exact path="/add" component={InputForm} />
                  <Route exact path="/graph" component={DataVisualization} />
                  <Route exact path="/:url" component={Item} />
                </Switch>
              </div>
            </div>
          </Fragment>
        </Router>
      </AlertProvider>
    );
  }
}

export default App;
