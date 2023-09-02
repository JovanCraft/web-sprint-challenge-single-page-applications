import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from './HomePage'
import PizzaOrderForm from './PizzaOrderForm'

const App = () => {
  return (
    <div>
      <h1>Lambda Eats</h1>
      <p>You can remove this code and create your own header</p>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path='pizza' element={<PizzaOrderForm />}/>
      </Routes>
    </div>
  );
};
export default App;
