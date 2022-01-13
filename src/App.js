// React modules
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Components
import AppNavbar from "./components/AppNavbar";
import Product from "./components/Product";
// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import Shop from "./pages/Shop";
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

  // useEffect(() => {
  //   if(localStorage.getItem("token") !== null){
  //     fetch("https://ancient-temple-55465.herokuapp.com/api/users/details", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`
  //       }
  //     })
  //     .then(res => res.json())
  //     .then(data => {
  //         setUser({
  //             id: data._id,
  //             isAdmin: data.isAdmin
  //         });
  //     });
  //   }
  // });


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
          <Route exact path="/admin/dashboard" component={AdminDashboard} />
          <Route exact path="/product/:productId" component={Product} />
          <Route component={Error} />
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
