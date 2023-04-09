import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import noImage from '../img/event-notfound.jpeg';

import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	CardHeader,
	Button,
	Slider,
	Grid
} from '@mui/material';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import AttractionsIcon from '@mui/icons-material/Attractions';
import LocationCityIcon from '@mui/icons-material/LocationCity';

import '../App.css';

const EventDetails = (props) => {
	const [eventData, setEventData] = useState(undefined);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	let { id } = useParams();

	const key = '5T8Sry2eWOJvsJIi66T4bhm3GKFEOKc8';
	const baseURL = 'https://app.ticketmaster.com/discovery/v2';

	useEffect(() => {
		async function fetchData() {
			try {
				let url = `${baseURL}/events?apikey=${key}&countryCode=US&id=${id}`;
				const { data } = await axios.get(url);
				const event = data._embedded.events[0];
				console.log(event);

				setEventData(event);
				setLoading(false);
			} catch (e) {
				setLoading(false);
				setError('Unable to fetch venue details');
				console.log(e);
			}
		}
		fetchData();
	}, [id]);

	if (loading) {
		return (
			<div>
				<h2>Loading....</h2>
			</div>
		);
	} else if (error) {
		return (
			<div>
				<h2>{error}</h2>
			</div>
		);
	} else {
		return (
			<>
				<Typography
					sx={{
						fontWeight: 'bold',
						fontSize: '1.5rem',
						color: '#1e8678',
						padding: '10px',
						borderRadius: '20px',
						maxWidth: 740,
						marginLeft: 'auto',
						marginRight: 'auto',
						textAlign: 'center',
						boxShadow: '0px 0px 20px #000000',
					}}
				>EVENT</Typography>
				<Card
					variant='outlined'
					sx={{
						maxWidth: 740,
						height: 'auto',
						marginLeft: 'auto',
						marginRight: 'auto',
						marginBottom: '20px',
						borderRadius: 5,
						boxShadow: '0px 0px 20px #000000;',
						backgroundColor: '#1e1e1e',
						lineHeight: 1.5,
						letterSpacing: '0.00938em',
						textAlign: 'center',
						marginTop: '20px',
						padding: '10px',
					}}
				>
					<CardHeader
						title={eventData.name}
						sx={{
							fontWeight: 'bold',
							fontSize: '1.5rem',
							color: '#1e8678',
							padding: '10px',
							borderRadius: '10px',
							backgroundColor: '#1e1e1e'
						}}
					/>

					<CardMedia
						component='img'
						style={{
							objectFit: 'cover',
							borderRadius: '10px',
							boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);',
						}}
						image={noImage}
						title={eventData.name}
					/>
					<CardContent>

						{/* Event Date/Time */}
						<Typography
							sx={{
								backgroundColor: '#39393957',
								borderRadius: '10px',
								marginTop: '20px',
								padding: '10px',
								boxShadow: '0px 0px 20px #000000'
							}}>
							<Typography>
								<dt className='title'>Date & Time: </dt>
								<dd className='content'>
									{eventData.dates && eventData.dates.start ? (
										<>
											<span>
												{new Date(eventData.dates.start.localDate).toLocaleDateString('en-US', {
													day: 'numeric',
													month: 'long',
													year: 'numeric',
												})}
											</span>
											<span>
												{' ('}
												{new Date(eventData.dates.start.localDate).toLocaleDateString('en-US', {
													weekday: 'long',
												})}
												{') '}
											</span>
											<span>
												{' | '}
												{new Date(`2000-01-01T${eventData.dates.start.localTime}`).toLocaleTimeString([], {
													hour: 'numeric',
													minute: '2-digit',
													hour12: true,
												})}
											</span>
										</>) : ('N/A')}
								</dd>
							</Typography>
							<Typography>
								<dt className='title'>Event Location:</dt>
								{eventData._embedded && eventData._embedded.venues ? (
									<dd className='content'>
										{[eventData._embedded.venues[0].name,
										eventData._embedded.venues[0].city.name,
										eventData._embedded.venues[0].state.stateCode,
										eventData._embedded.venues[0].country.countryCode,
										].filter(Boolean).join(', ')}
									</dd>
								) : (
									<dd className='content'>N/A</dd>
								)}
							</Typography>
						</Typography>

						{/* Event Type */}
						<Typography
							sx={{
								backgroundColor: '#39393957',
								borderRadius: '10px',
								marginTop: '20px',
								padding: '10px',
								boxShadow: '0px 0px 20px #000000'
							}}>
							<Typography>
								<dt className='title'>Event Type:</dt>
								<dd className='content'>
									{eventData.classifications && eventData.classifications[0].segment && eventData.classifications[0].subType
										? `${eventData.classifications[0].subType.name}-${eventData.classifications[0].segment.name}` : "Event Type unavailable"}
								</dd>
							</Typography>
							<Typography>
								<dt className='title'>Genre:</dt>
								<dd className='content'>{eventData.classifications && eventData.classifications[0].genre ? eventData.classifications[0].genre.name : ""}</dd>
							</Typography>
							<Typography>
								<dt className='title'>Sub Genre:</dt>
								<dd className='content'>{eventData.classifications && eventData.classifications[0].subGenre ? eventData.classifications[0].subGenre.name : ""}</dd>
							</Typography>
						</Typography>

						{/* Event Description */}
						<Typography sx={{
							backgroundColor: '#39393957',
							borderRadius: '10px',
							marginTop: '20px',
							padding: '10px',
							boxShadow: '0px 0px 20px #000000'
						}}>
							<dt className='title'>Description:</dt>
							<dd className='content'>{eventData.info ? eventData.info : "Event Description unavailable"}</dd>
						</Typography>

						{/* SLIDER: Price Range */}
						<Typography sx={{
							backgroundColor: '#39393957',
							borderRadius: '10px',
							marginTop: '20px',
							padding: '10px',
							boxShadow: '0px 0px 20px #000000'
						}}>
							<Typography>
								<dt className='title'>Status:</dt>
								<dd className='event-status'>{eventData.dates && eventData.dates.status ? eventData.dates.status.code : "Ticket status unavailable"}</dd>
							</Typography>
							<Typography>
								<dt className='title'>Ticket Limit:</dt>
								<dd className='content'>{eventData.ticketLimit && eventData.ticketLimit.info ? eventData.ticketLimit.info : 'Ticket info unavailable'}</dd>

							</Typography>
						</Typography>
						<Grid
							container
							sx={{
								backgroundColor: '#39393957',
								borderRadius: '10px',
								marginTop: '20px',
								padding: '10px',
								boxShadow: '0px 0px 20px #000000'
							}}
						>
							<Grid item>
								<dt className='title'>Price Range:</dt>
							</Grid>
							<Grid item xs>
								{eventData.priceRanges ? (
									<Slider
										valueLabelDisplay="on"
										sx={{
											width: '400px',
											color: '#1e8678'
										}}
										min={eventData.priceRanges[0].min}
										max={eventData.priceRanges[0].max}
										value={[eventData.priceRanges[0].min, eventData.priceRanges[0].max]}
										marks={[
											{ value: eventData.priceRanges[0].min, label: `$ ${eventData.priceRanges[0].min}.00` },
											{ value: eventData.priceRanges[0].max, label: `$ ${eventData.priceRanges[0].max}.00` }
										]}
									/>
								) : (
									<Typography variant='subtitle1'>N/A</Typography>
								)}
							</Grid>
						</Grid>

						{/* BUTTON: But Tickets */}
						<Button
							component={Link}
							to={eventData.url ? eventData.url : '#'}
							variant='outlined'
							sx={{
								width: '100%',
								borderRadius: '30px',
								color: 'white',
								backgroundColor: '#1898c3a7',
								'&:hover': {
									backgroundColor: '#1877C3',
									boxShadow: '0px 0px 30px #000000;',
								}
							}}
							startIcon={<LocalActivityIcon sx={{ color: 'white' }} />}
						>But Tickets</Button>

						{/* BUTTON: Venue & Attraction */}
						<Grid
							container
							spacing={1}
							sx={{
								borderRadius: '10px',
								marginBottom: '20px',
								marginTop: '20px',
							}}
						>
							<Grid item xs>
								<Button
									component={Link}
									to={eventData._embedded && eventData._embedded.venues ? `/venues/${eventData._embedded.venues[0].id}` : '#'}
									variant='outlined'
									sx={{
										width: '100%',
										borderRadius: '30px',
										marginTop: '10px',
										color: 'white',
										backgroundColor: '#1898c3a7',
										'&:hover': {
											backgroundColor: '#1877C3',
											boxShadow: '0px 0px 30px #000000;',
										}
									}}
									startIcon={<LocationCityIcon sx={{ color: 'white' }} />}
								>Go to event's Venue</Button>
							</Grid>
							<Grid item xs>
								<Button
									component={Link}
									to={eventData._embedded && eventData._embedded.attractions ? `/attractions/${eventData._embedded.attractions[0].id}` : '#'}
									variant='outlined'
									sx={{
										width: '100%',
										borderRadius: '30px',
										marginTop: '10px',
										color: 'white',
										backgroundColor: '#1898c3a7',
										'&:hover': {
											backgroundColor: '#1877C3',
											boxShadow: '0px 0px 30px #000000;',
										}
									}}
									startIcon={<AttractionsIcon sx={{ color: 'white' }} />}
								>Go to event's Attractions</Button>
							</Grid>
						</Grid>

						{/* BUTTON: Back to Events page */}
						<Button
							variant='contained'
							onClick={() => { window.location.href = '/events?page=0' }}
							sx={{
								width: '100%',
								borderRadius: '30px',
								marginTop: '10px',
								color: 'white',
								backgroundColor: '#1877C3',
								'&:hover': {
									backgroundColor: '#1e8678',
									boxShadow: '0px 0px 30px #000000;',
								}
							}}
							startIcon={<FirstPageIcon sx={{ color: 'white' }} />}
						>Back to Events page</Button>

					</CardContent>
				</Card >
			</>
		);
	}
};

export default EventDetails;
