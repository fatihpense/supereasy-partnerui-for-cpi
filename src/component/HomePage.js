import React, { Fragment } from "react";
import '../App.css';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


import blue from '@material-ui/core/colors/blue';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';



import RootStore from '../store/RootStore';
import PartnersPage from './PartnersPage';
import StringParametersPage from './StringParametersPage';

// import { observable, computed } from "mobx"
import { observer } from "mobx-react"



import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      main: '#ff5252',
    },
  },
});


const rootStore = new RootStore()

const HomePage = observer(
  class App extends React.Component {
    constructor(props) {
      super(props);

      this.handleChange = this.handleChange.bind(this);
      this.state = { value: 0 };

    }

    handleChange(event, newValue) {
      this.setState((state) => {
        // Important: read `state` instead of `this.state` when updating.
        return { value: newValue }
      });
    };

    render() {
      const allTabs = ['/partners', '/string-parameters'];
      //const {store} = this.props
      return (
        <div className="App">
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Router>
                <Route
                  path="/"
                  render={({ location }) => (
                    <Fragment>
                      <AppBar position="static">
                        <Tabs value={location.pathname} centered>
                          <Tab label="Partners" value="/partners" component={Link} to={allTabs[0]} />
                          <Tab label="String Parameters" value="/string-parameters" component={Link} to={allTabs[1]} />

                        </Tabs>
                      </AppBar>
                      <Container style={{ marginTop: 30 }} maxWidth={false}  >
                        <Switch>
                          <Route path={allTabs[0]} render={() =>
                            <PartnersPage store={rootStore.partnersStore}></PartnersPage>} />
                          <Route path={allTabs[1]} render={() =>
                            <StringParametersPage store={rootStore.stringParametersStore}></StringParametersPage>} />
                        </Switch>
                      </Container>
                    </Fragment>

                  )}
                />
              </Router>


            </Grid>
          </ThemeProvider>
        </div>
      );
    }
  })

export default HomePage;
