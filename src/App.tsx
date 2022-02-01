import { createTheme, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import './App.css';
import { Navbar } from './components/Navbar';
import { DashboardPage } from './pages/DashboardPage';
import { ShipmentsPage } from './pages/ShipmentsPage';


const theme = createTheme({
  palette: {
    primary: {
      main: '#2AC3AD'
    }
  }
})

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
          <Route path="/dashboard">
            <DashboardPage />
          </Route>
          <Route path="/shipments">
            <ShipmentsPage />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
