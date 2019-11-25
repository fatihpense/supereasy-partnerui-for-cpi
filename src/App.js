import React from 'react';
import './App.css';



import blue from '@material-ui/core/colors/blue';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';



import RootStore from './store/RootStore';

// import { observable, computed } from "mobx"
import { observer } from "mobx-react"

import HomePage from './component/HomePage';
import LoginPage from './component/LoginPage';


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


//const partnersStore = new PartnersStore()
const rootStore = new RootStore()



function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        rootStore.loginStore.isLoggedIn ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}


const App = observer(
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
      console.log(rootStore.loginStore.isLoggedIn)
      return (


        <Router>
          <div>

            <Switch>

              <Route path="/login">
                <LoginPage store={rootStore.loginStore} />
              </Route>
              <PrivateRoute path="/">
                <HomePage store={rootStore} />
              </PrivateRoute>
            </Switch>
          </div>
        </Router>

      );
    }
  })

export default App;
