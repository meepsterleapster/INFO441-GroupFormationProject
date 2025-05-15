import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './component/App';
import { initializeApp } from "firebase/app";

import { BrowserRouter } from 'react-router-dom';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7dZOjGheEoZh8CerCcZ2VIJrvjZbKcHc",
  authDomain: "groupin-1fb78.firebaseapp.com",
  databaseURL: "https://groupin-1fb78-default-rtdb.firebaseio.com",
  projectId: "groupin-1fb78",
  storageBucket: "groupin-1fb78.firebasestorage.app",
  messagingSenderId: "501429499163",
  appId: "1:501429499163:web:b3bbb551faefaf9bf7cfbe",
  measurementId: "G-VJHPYJM7XR"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
