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
import LanguageIcon from '@mui/icons-material/Language';

import '../App.css';

const AttractionList = () => {
	const [loading, setLoading] = useState(true);
	const [searchData, setSearchData] = useState(undefined);
	const [attractionsData, setAttractionsData] = useState(undefined);
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
			let url = `${baseURL}/attractions?apikey=${key}&countryCode=US&page=${currentPage}`;

			if (searchTerm) {
				url = `${baseURL}/attractions?apikey=${key}&countryCode=US&page=${currentPage}&keyword=${searchTerm}`;
			}

			try {
				const { data } = await axios.get(url);
				console.log(data);

				if (data.error) {
					setLoading(false);
					navigate('/NotFound');
				} else {
					const eventList = data._embedded.attractions;
					setTotalPage(data.page.totalPages);

					if (searchTerm) {
						setSearchData(eventList);
					} else {
						setAttractionsData(eventList);
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
		navigate(`/attractions?page=${nextPage}`);
	};

	const handlePreviousPage = () => {
		const previousPage = currentPage - 1;
		setCurrentPage(previousPage);
		navigate(`/attractions?page=${previousPage}`);
	};

	const searchValue = async (value) => {
		setSearchTerm(value);
	};

	const buildCard = (attraction) => {
		return (
			<Grid item xs={12} sm={7} md={4} lg={3} xl={2} key={attraction.id}>
				<Card
					variant='outlined'
					sx={{
						maxWidth: 250,
						background: '#333333',
						height: 300,
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
						<Link to={`/attractions/${attraction.id}`}>
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
									title={attraction.name}
								>
									{attraction.name}
								</Typography>

								{/* Attraction Type */}
								<Typography
									sx={{
										backgroundColor: '#1876c32c',
										borderRadius: '10px',
										marginTop: '20px',
										padding: '10px',
										boxShadow: '0px 0px 20px #000000'
									}}>
									<Typography>
										<dt className='title'>Segment Name:</dt>
										<dd className='event-content'>
											{attraction.classifications && attraction.classifications[0].segment.name
												? attraction.classifications[0].segment.name
												: 'N/A'}
										</dd>
									</Typography>
									<Typography>
										<dt className='title'>Genre:</dt>
										<dd className='event-content'>
											{attraction.classifications && attraction.classifications[0].genre.name ? attraction.classifications[0].genre.name : 'N/A'}
										</dd>
									</Typography>
									<Typography>
										<dt className='title'>Sub Genre:</dt>
										<dd className='event-content'>
											{attraction.classifications && attraction.classifications[0].subGenre.name ? attraction.classifications[0].subGenre.name : 'N/A'}
										</dd>

									</Typography>
								</Typography>

								{/* Attraction Website */}
								<Button
									component={Link}
									to={attraction.url && attraction.url.length > 0 ? attraction.url
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
		card = searchData && searchData.map((attractions) => {
			let { attraction } = attractions;
			return buildCard(attraction);
		});
	} else {
		card = attractionsData && attractionsData.map((attraction) => {
			return buildCard(attraction);
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

export default AttractionList;
