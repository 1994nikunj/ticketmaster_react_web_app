import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SearchItem from './SearchItem';
import {
	Button,
	Card,
	CardActionArea,
	CardContent,
	Grid,
	Typography
} from '@mui/material';

import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

import '../App.css';

const EventList = () => {
	const [loading, setLoading] = useState(true);
	const [searchData, setSearchData] = useState(undefined);
	const [eventsData, setEventsData] = useState(undefined);
	const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPages, setTotalPage] = useState(10);

	const navigate = useNavigate();
	const location = useLocation();

	const key = '5T8Sry2eWOJvsJIi66T4bhm3GKFEOKc8';
	const baseURL = 'https://app.ticketmaster.com/discovery/v2';

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const page = parseInt(searchParams.get('page')) || 0;
		setCurrentPage(page);
	}, [location.search]);

	useEffect(() => {
		async function fetchData() {
			let url = `${baseURL}/events?apikey=${key}&countryCode=US&page=${currentPage}`;

			if (searchTerm) {
				console.log(searchTerm);
				url = `${baseURL}/events?apikey=${key}&countryCode=US&page=${currentPage}&keyword=${searchTerm}`;
			}
			console.log('EventList.js: fetchData()');
			console.log(url);

			try {
				const { data } = await axios.get(url);
				console.log(data);

				if (data.error) {
					setLoading(false);
					navigate('/NotFound');
				} else {
					const eventList = data._embedded.events;
					setTotalPage(data.page.totalPages);

					if (searchTerm) {
						setSearchData(eventList);
					} else {
						setEventsData(eventList);
					}
					setLoading(false);
				}
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		}
		fetchData();
	}, [searchTerm, currentPage, navigate]);

	const handleNextPage = () => {
		const nextPage = currentPage + 1;
		setCurrentPage(nextPage);
		navigate(`/events?page=${nextPage}`);
	};

	const handlePreviousPage = () => {
		const previousPage = currentPage - 1;
		setCurrentPage(previousPage);
		navigate(`/events?page=${previousPage}`);
	};

	const searchValue = async (value) => {
		setSearchTerm(value);
	};

	const buildCard = (event) => {
		return (
			<Grid item xs={12} sm={7} md={4} lg={3} xl={2} key={event.id}>
				<Card
					variant='outlined'
					sx={{
						maxWidth: 250,
						background: '#333333',
						height: 460,
						margin: '1rem',
						borderRadius: 5,
						boxShadow: '0px 0px 25px #000000;',
						transition: 'transform 0.2s ease-in-out',
						'&:hover': {
							transform: 'scale(1.05)',
							boxShadow: '0px 0px 50px #1877C3;'
						},
					}}
				>
					<CardActionArea>
						<Link to={`/events/${event.id}`}>
							<CardContent>
								<Typography
									gutterBottom
									sx={{
										fontWeight: 'bold',
										marginBottom: '20px',
										color: '#ffffff',
										fontSize: '1rem',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
										whiteSpace: 'nowrap',
										width: '100%',
										display: 'block',
										textAlign: 'center',
										'&:hover': {
											color: '#1877C3',
											textDecoration: 'none',
										}
									}}
									title={event.name}
								>
									{event.name}
								</Typography>

								<Typography
									sx={{
										backgroundColor: '#1876c32c',
										borderRadius: '10px',
										marginTop: '20px',
										marginBottom: '20px',
										padding: '10px',
										boxShadow: '0px 0px 20px #000000'
									}}>
									<Typography>
										<dt className='event-title'>Segment:</dt>
										<dd className='content'>{event.classifications && event.classifications[0].segment.name ? event.classifications[0].segment.name : 'Segment unavailable'}</dd>
									</Typography>

									<Typography>
										<dt className='event-title'>Event Type:</dt>
										<dd className='content'>{event.classifications && event.classifications[0].genre.name ? event.classifications[0].genre.name : 'Event Type unavailable'}</dd>
									</Typography>

									<Typography>
										<dt className='event-title'>Genre:</dt>
										<dd className='content'>{event.classifications && event.classifications[0].genre ? event.classifications[0].genre.name : "Genre unavailable"}</dd>
									</Typography>
								</Typography>

								<Typography
									sx={{
										backgroundColor: '#1876c32c',
										borderRadius: '10px',
										marginTop: '20px',
										marginBottom: '20px',
										padding: '10px',
										boxShadow: '0px 0px 20px #000000'
									}}>
									<Typography>
										<dt className='title'>Event Date:</dt>
										<dd className='content'>{event.dates && event.dates.start ? event.dates.start.localDate : 'Date unavailable'}</dd>
									</Typography>

									<Typography>
										<dt className='title'>Start Time:</dt>
										<dd className='content'>{event.dates && event.dates.start ? event.dates.start.localTime : 'Start Time unavailable'}</dd>
									</Typography>
									<Typography sx={{
										marginBottom: '10px',
									}}>
										<dt className='title'>Venue:</dt>
										{event._embedded && event._embedded.venues ? (
											<dd className='event-content'>
												{[event._embedded.venues[0].name,
												event._embedded.venues[0].city.name,
												event._embedded.venues[0].state.stateCode,
												event._embedded.venues[0].country.countryCode,
												].filter(Boolean).join(', ')}
											</dd>
										) : (
											<dd className='content'>N/A</dd>
										)}
									</Typography>

								</Typography>

								<Typography
									sx={{
										backgroundColor: '#1e867840',
										borderRadius: '10px',
										padding: '10px',
										boxShadow: '0px 0px 20px #000000'
									}}>
									<dt className='title'>Tickets starts:</dt>
									<dd className='price-content'>{event.priceRanges && event.priceRanges[0].min ? `$${event.priceRanges[0].min}` : 'N/A'}</dd>
								</Typography>

							</CardContent>
						</Link>
					</CardActionArea>
				</Card>
			</Grid>
		);
	};

	let card = '';
	if (searchTerm) {
		card = searchData && searchData.map((event) => {
			return buildCard(event);
		});
	} else {
		card = eventsData && eventsData.map((event) => {
			return buildCard(event);
		});
	}

	if (loading) {
		return (
			<div>
				<h2>Loading....</h2>
			</div>
		);
	} else {
		return (
			<div>
				<SearchItem searchValue={searchValue} />
				<Grid
					container
					spacing={2}
					sx={{
						flexGrow: 1,
						flexDirection: 'row',
						marginTop: '20px',
						display: 'block'
					}}
				>
					<Button
						variant="outlined"
						sx={{
							margin: '10px',
							padding: '5px',
							width: '120px',
							height: '40px',
							borderRadius: '20px',
							color: 'white',
							backgroundColor: '#1e8678',
							'&:hover': {
								backgroundColor: '#1877C3',
								boxShadow: '0px 0px 20px #000000;',
							}
						}}
						startIcon={<SkipPreviousIcon />}
						disabled={currentPage === 0}
						onClick={handlePreviousPage}
					> Previous </Button>

					<Button
						sx={{
							margin: '10px',
							padding: '5px',
							width: '120px',
							height: '40px',
							borderRadius: '20px',
							color: 'white',
							backgroundColor: '#1e8678',
							'&:hover': {
								backgroundColor: '#1877C3',
								boxShadow: '0px 0px 20px #000000;'
							}
						}}
						startIcon={<SkipNextIcon />}
						variant="outlined"
						disabled={currentPage === totalPages}
						onClick={handleNextPage}
					> Next </Button>
				</Grid>

				<Grid
					container
					spacing={2}
					sx={{
						flexGrow: 1,
						flexDirection: 'row'
					}}
				>
					{card}
				</Grid>
			</div >
		);
	}
};

export default EventList;
