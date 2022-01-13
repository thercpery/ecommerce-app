// React modules
import { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Components
import AppNavbar from "./components/AppNavbar";
// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";
import Shop from "./pages/Shop"
import Error from "./pages/Error";
// UserProvider
import { UserProvider } from "./UserContext";
// CSS
import './App.css';

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

  const unsetUser = () => localStorage.clear();

  useEffect(() => {
    console.log(user);
    console.log(localStorage);
  })

  return (
    <UserProvider value={{user, setUser, unsetUser}}>
      <Router>
        <AppNavbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/shop" component={Shop} />
          <Route component={Error} />
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
