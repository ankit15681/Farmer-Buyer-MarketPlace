import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import LoginUser from './components/Auth/LoginUser';
import Details from './components/Details/Details';
import Unauthorized from './components/Unauthorized/Unauthorized';
import RegisterUser from './components/Auth/RegisterUser';
import AddFarmer from './components/AddFarmer/AddFarmer';
import EditFarmer from './components/EditFarmer/EditFarmer';

const theme = createTheme({
  typography: {
    "fontFamily": `"Open Sans", sans-serif`,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 700
  }
});

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
          <Navbar />
          <Switch>
            <Route path="/" exact component={() => <Redirect to="/farmers" />} />
            <Route path="/farmers" exact component={Home} />
            <Route path="/farmers/search" exact component={Home} />
            <Route path="/farmers/:id" exact component={Details} />
            <Route path="/loginUser" exact component={LoginUser} />
            <Route path="/register" exact component={RegisterUser} />
            <Route path="/addFarmer" exact component={AddFarmer} />
            <Route path="/editFarmer/:id" exact component={EditFarmer} />
            <Route path="/unauthorized" exact component={Unauthorized} />
          </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
