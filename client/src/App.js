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
import IndExp from './Pages/IndExp.js';
import AdminApproval from './Pages/AdminApproval.js';
import ChatBot from "./components/ChatBot/ChatBot";



function App() {
	return (
		<div>
			<ChatBot style = {{zIndex: "300000", position: "relative"}} />
			<Router>
				<div style = {{paddingBottom: "80px"}}><NavbarComp /></div>
				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/gallery' component={Gallery} />
					<Route exact path='/expedition' component={Expedition} />
					<Route path='/trek' component={Trek} />
					<Route path='/login' component={Login} />
					<Route path='/signup' component={SignUp} />
					<Route path ="/chatbot" component = {ChatBot} />
					<Route path = '/expedition/pendingRequests' component={AdminApproval} />
					<Route path = '/expedition/:id' component={IndExp} />
				</Switch>
			</Router>
		</div>

	);
}

export default withRouter(App);
