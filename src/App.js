import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavbarComp from './components/Navbar/NavbarComp';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home.js';
// import About from './pages/about';
// import Events from './pages/events';
// import AnnualReport from './pages/annual';
// import Teams from './pages/team';
// import Blogs from './pages/blogs';
// import SignUp from './pages/signup';

function App() {
	return (
		<div>
			<Router>
				<NavbarComp />
				<Switch>
					<Route path='/' exact component={Home} />
					{/* <Route path='/about' component={About} />
					<Route path='/events' component={Events} />
					<Route path='/annual' component={AnnualReport} />
					<Route path='/team' component={Teams} />
					<Route path='/blogs' component={Blogs} />
					<Route path='/sign-up' component={SignUp} /> */}
				</Switch>
			</Router>
		</div>

	);
}

export default App;
