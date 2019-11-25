import React from 'react'; 
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField'; 
import Typography from '@material-ui/core/Typography'; 
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import logo from '../logo.png';


import blue from '@material-ui/core/colors/blue';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';


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



const Login = observer(class Login extends React.Component {
    constructor(props) {
        super(props); 
  
        this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
        this.state = { tenantUrl: '', username:'',password:'' ,errorMessage:''};
  
        let self = this;
        let loginStore = this.props.store;
        loginStore.tryLogin(this.state.tenantUrl,this.state.username,this.state.password).then(function(value) {
            if(self.props.store.isLoggedin){
              //  this.props.history.push('/');
              console.log("hello")
            }
          })
      }

      handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }
   
     handleSubmit(e) {
         let self = this;
        e.preventDefault();
        let loginStore = this.props.store;
        loginStore.tryLogin(this.state.tenantUrl,this.state.username,this.state.password).then(function(value) {
            if(self.props.store.isLoggedin){
              //  this.props.history.push('/');
              console.log("hello")
            }
          }).catch(function(error) {
            console.error(error.message);
            self.setState({
                ['errorMessage']: error.message
              });
          });



      }

      render() {

        if (this.props.store.isLoggedIn === true) {
            return <Redirect to='/partners' />
          }        

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container maxWidth="md">
                    <Paper style={{ margin: 20, padding: 50 }} >

                        <img src={logo} alt="Logo" style={{ maxWidth: '610px' ,width: '100%' , height: 'auto'}} />;
        
                    <form noValidate>

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="tenantUrl"
                                label="CPI Tenant URL (e.g. https://abc123-tmn.ssl.eu1.hana.ondemand.com/path)"
                                name="tenantUrl"

                                value={this.state.tenantUrl}
                                onChange={this.handleInputChange} 
                                
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="S-user or P-user"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleInputChange} 
                                
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={this.state.password}
                                onChange={this.handleInputChange} 
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={this.handleSubmit}
                            >Show Partner UI</Button>

                        </form>
                       
                        <Typography variant="subtitle1"  style={{color:'#ff5252'}}>
                            {this.state.errorMessage}
                        </Typography>
                    </Paper>
                </Container>
            </ThemeProvider>
        </div>
    );
      }

}

)


export default Login