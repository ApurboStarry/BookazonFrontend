import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import auth from "./services/authService";

import NavBarTop from "./components/navbar/navbarTop";
import NavBarBottom from "./components/navbar/navbarBottom";
import ProtectedRoute from "./components/common/protectedRoute";
import Authors from "./components/authors";
import Genres from "./components/genres";
import Publishers from "./components/publishers";
import Home from "./components/home";
import Profile from "./components/profile";
import LoginForm from "./components/common/loginForm";
import Logout from "./components/common/logout";
import RegisterForm from "./components/common/registerForm";
import SellBook from "./components/sellBook";
import Cart from "./components/cart";
import Book from "./components/book";
import SearchByGenre from "./components/searchByGenre";
import SearchByAuthor from "./components/searchByAuthor";
import SubGenres from "./components/subGenres";
import SearchByTitle from "./components/searchByTitle";
import AdvancedSearchForm from "./components/advancedSearchForm";
import PaymentGateway from "./components/paymentMethod";
class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <div className="App">
        <div className="content">
          <Route path="/" component={NavBarTop} />
          <Route path="/" render={(props) => <NavBarBottom user={user} {...props} />} />
          <Route path="/" component={ToastContainer} />

          <Switch>
            {/* <ProtectedRoute path="/passwords" component={AllPasswords} /> */}

            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/profile" component={Profile} />
            <Route path="/genres" component={Genres} />
            <Route path="/subGenres" component={SubGenres} />
            <Route path="/authors" component={Authors} />
            <Route path="/publishers" component={Publishers} />
            <Route path="/sellbook" component={SellBook} />
            <Route path="/cart" component={Cart} />
            <Route path="/book" component={Book} />
            <Route path="/paymentMethod" component={PaymentGateway} />
            <Route path="/advancedSearch" component={AdvancedSearchForm} />
            <Route path="/search/byGenre" component={SearchByGenre} />
            <Route path="/search/byAuthor" component={SearchByAuthor} />
            <Route path="/search/byTitle" component={SearchByTitle} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
