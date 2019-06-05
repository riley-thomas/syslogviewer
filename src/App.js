import React, { Component } from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import ErrorPage from './Errors/ErrorPage';
import Head from './Head/Head';
import LogPage from './Logs/LogPage';
import VisitorPage from './Visitors/VisitorPage';
import Footer from './Footer/Footer';
import { addBackToTop } from 'vanilla-back-to-top';

addBackToTop();

class App extends Component {

  renderPage() {
    return (
      <div className="mb-5">
        <Switch>
          <Redirect exact from="/" to="/1" />
          <Route exact path="/:page([1-9]{1}[0-9]{0,5})" render={ (r) =>
            <div> 
              <LogPage route={r} page={r.match.params.page}/>
            </div>
          } />
          <Route exact path="/visitors/:page([1-9]{1}[0-9]{0,5})" render={ (r) =>
            <div> 
              <VisitorPage route={r} page={r.match.params.page}/>
            </div>
          } />
          <Route component={ErrorPage} />
        </Switch>
      </div>
    );
  }


  render() {

    return (
      <div>
        <Head />
        {this.renderPage()}
        <Footer />
      </div>
    );
  }
}

export default App;

