import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';

import Home from './components/Home';
import NotFound from './components/NotFound';
import EventList from './components/EventList';
import VenueList from './components/VenueList';
import EventDetails from './components/EventDetails';
import VenueDetails from './components/VenueDetails';
import AttractionList from './components/AttractionList';
import AttractionDetails from './components/AttractionDetails';

import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AttractionsIcon from '@mui/icons-material/Attractions';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

import logo from './img/ticketmaster-logo.png';
import './App.css';

const App = () => {
	const buttonCSS = {
		margin: '10px',
		padding: '10px',
		width: '170px',
		height: '50px',
		borderRadius: '30px',
		color: 'white',
		backgroundColor: '#1877C3',
		'&:hover': {
			backgroundColor: '#1e8678',
			boxShadow: '0px 0px 30px #000000;',
		}
	};

	const NavigationButton = ({ to, icon, label }) => {
		return (
			<Button
				variant="outlined"
				sx={buttonCSS}
				startIcon={icon}
				component={NavLink}
				to={to}
				activeStyle={{ backgroundColor: '#1e8678' }}
			>
				{label}
			</Button>
		);
	};

	return (
		<Router>
			<div className='App'>
				<header className='App-header'>
					<img src={logo} className='App-logo' alt='logo' />
					<h1 className='App-title'>Welcome to Ticketmaster!</h1>
					<NavigationButton to='/' icon={<HomeIcon />} label='Home' />
					<NavigationButton to='/events?page=0' icon={<LocalActivityIcon />} label='Events' />
					<NavigationButton to='/attractions?page=0' icon={<AttractionsIcon />} label='Attractions' />
					<NavigationButton to='/venues?page=0' icon={<LocationCityIcon />} label='Venues' />
				</header>

				<div className='App-body'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/events' element={<EventList />} />
						<Route path='/events/:id' element={<EventDetails />} />
						<Route path='/attractions' element={<AttractionList />} />
						<Route path='/attractions/:id' element={<AttractionDetails />} />
						<Route path='/venues' element={<VenueList />} />
						<Route path='/venues/:id' element={<VenueDetails />} />
						<Route path='/venues/:id' element={<VenueDetails />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
};

export default App;
