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
	CardMedia,
	Typography
} from '@mui/material';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import LanguageIcon from '@mui/icons-material/Language';

import noImage from '../img/venue-notfound.jpeg';
import '../App.css';

const VenueList = () => {
	const [loading, setLoading] = useState(true);
	const [searchData, setSearchData] = useState(undefined);
	const [venuesData, setVenuesData] = useState(undefined);
	const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPages, setTotalPage] = useState(10);

	let navigate = useNavigate();
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
			let url = `${baseURL}/venues?apikey=${key}&countryCode=US&page=${currentPage}`;

			if (searchTerm) {
				console.log(searchTerm);
				url = `${baseURL}/venues?apikey=${key}&countryCode=US&page=${currentPage}&keyword=${searchTerm}`;
			}
			try {
				const { data } = await axios.get(url);
				console.log(data);

				if (data.error) {
					setLoading(false);
					navigate('/NotFound');
				} else {
					const eventList = data._embedded.venues;
					setTotalPage(data.page.totalPages);

					if (searchTerm) {
						setSearchData(eventList);
					} else {
						setVenuesData(eventList);
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
		navigate(`/venues?page=${nextPage}`);
	};

	const handlePreviousPage = () => {
		const previousPage = currentPage - 1;
		setCurrentPage(previousPage);
		navigate(`/venues?page=${previousPage}`);
	};

	const searchValue = async (value) => {
		setSearchTerm(value);
	};

	const buildCard = (venue) => {
		return (
			<Grid item xs={12} sm={7} md={4} lg={3} xl={2} key={venue.id}>
				<Card
					variant='outlined'
					sx={{
						maxWidth: 250,
						background: '#333333',
						height: 380,
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
						<Link to={`/venues/${venue.id}`}>
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
									title={venue.name}
								>
									{venue.name}
								</Typography>

								<CardMedia
									component='img'
									style={{
										objectFit: 'cover',
										maxHeight: '100px',
										borderRadius: '10px',
										boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);',
									}}
									image={venue.images && venue.images.length > 0
										? venue.images[0].url
										: noImage}

									title={venue.name}
								/>

								<Typography
									sx={{
										backgroundColor: '#1876c32c',
										borderRadius: '10px',
										marginTop: '20px',
										padding: '10px',
										boxShadow: '0px 0px 20px #000000'
									}}>
									<Typography>
										<dt className='title'>Location:</dt>
										<dd className='event-content'>
											{venue.city.name}, {venue.state.stateCode}
										</dd>

										<dt className='title'>Address:</dt>
										<dd className='event-content'>
											{venue.address.line1}
										</dd>
									</Typography>
								</Typography>

								<Button
									component={Link}
									to={venue.url && venue.url.length > 0 ? venue.url
										: 'N/A'}
									variant='outlined'
									sx={{
										width: '100%',
										borderRadius: '30px',
										color: 'white',
										marginTop: '20px',
										backgroundColor: '#1898c3a7',
										'&:hover': {
											backgroundColor: '#1877C3',
											boxShadow: '0px 0px 30px #000000;',
										}
									}}
									startIcon={<LanguageIcon sx={{ color: 'white' }} />}
								>website</Button>

							</CardContent>
						</Link>
					</CardActionArea>
				</Card>
			</Grid>
		);
	};

	let card = '';
	if (searchTerm) {
		card = searchData && searchData.map((venues) => {
			let { venue } = venues;
			return buildCard(venue);
		});
	} else {
		card = venuesData && venuesData.map((venue) => {
			return buildCard(venue);
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
					spacing={2}
					sx={{
						flexGrow: 1,
						flexDirection: 'row'
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

				<br />
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
			</div>
		);
	}
};

export default VenueList;
