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
import ChangePassword from "./pages/ChangePassword";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import UserOrders from "./pages/UserOrders";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import Error from "./pages/Error";
// UserProvider
import { UserProvider } from "./UserContext";
// CSS
import './App.css';

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
    email: null
  });

  const unsetUser = () => localStorage.clear();

  useEffect(() => {
    if(localStorage.getItem("token") !== null){
      fetch("https://ancient-temple-55465.herokuapp.com/api/users/details", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => res.json())
      .then(data => {
          setUser({
              id: data._id,
              isAdmin: data.isAdmin,
              email: data.email
          });
      });
    }
  }, []);


  return (
    <UserProvider value={{user, setUser, unsetUser}}>
      <Router>
        <AppNavbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/changepassword" component={ChangePassword} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/myorders" component={UserOrders} />
          <Route exact path="/admin" component={AdminDashboard} />
          <Route exact path="/admin/orders" component={AdminOrders} />
          <Route exact path="/product/:productId" component={Product} />
          <Route component={Error} />
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
