// React modules
import { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Components
import AppNavbar from "./components/AppNavbar";
// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Shop from "./pages/Shop"
// CSS
import './App.css';

function App() {
  return (
    <Router>
      <AppNavbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/shop" component={Shop} />
      </Switch>
    </Router>
  );
}

export default App;
