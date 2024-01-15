import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom";
import Timer from './Components/Timer';
import Login from './Components/Login';

import Signup from './Components/Signup';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>} >
    <Route path='/' element={<Login/>}/>
      <Route path='/Home' index element={<Timer/>}/>
      <Route path='/signup' index element={<Signup/>}/>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);

