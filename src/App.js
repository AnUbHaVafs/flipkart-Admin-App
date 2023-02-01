import React, { useEffect } from "react";
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from "./containers/Home";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory, getInitialData, isUserLoggedIn } from "./actions";
import Products from "./containers/Products";
import Orders from "./containers/Orders";
import { Category } from "./containers/Category";

export default function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    dispatch(getInitialData());
    // dispatch(getAllCategory());

  }, [])
  return (
    <div className="App">



      <PrivateRoute path='/' exact component={Home} />
      <PrivateRoute path='/category' exact component={Category} />
      <PrivateRoute path='/products' exact component={Products} />
      <PrivateRoute path='/orders' component={Orders} />

      <Route path='/signup' component={Signup} />
      <Route path='/signin' component={Signin} />



    </div>
  );
}


