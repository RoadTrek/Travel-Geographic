import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { withRouter } from 'react-router-dom';
import NavbarComp from './components/Navbar/NavbarComp';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home.js';
import Expedition from './Pages/Expedition.js';
import Trek from './Pages/Trek';
import Gallery from './Pages/Gallery.js';
import Login from './Pages/Login.js';
import SignUp from './Pages/SignUp.js';

function App() {
	return (
		<div>
			<Router>
				<div style = {{padding: "60px"}}><NavbarComp /></div>
				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/gallery' component={Gallery} />
					<Route path='/expedition' component={Expedition} />
					<Route path='/trek' component={Trek} />
					<Route path='/login' component={Login} />
					<Route path='/signup' component={SignUp} />
				</Switch>
			</Router>
		</div>

	);
}

export default withRouter(App);
