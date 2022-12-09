import React from "react";
import './App.css';
import Main from './Main';

import {
  BrowserRouter as Router,
  Route, Routes, Navigate
} from "react-router-dom";
const App = ({location}) => (
	<Router>
		<Routes location={location} >
            <Route path="/" element={ <Navigate replace to="/1" />} />
            <Route path="/1" element={<Main/>} />
        </Routes>
	</Router>
	)

export default App;
