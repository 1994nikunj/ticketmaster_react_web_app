import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import noImage from '../img/venue-notfound.jpeg';

import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	CardHeader,
	Button
} from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LanguageIcon from '@mui/icons-material/Language';
import '../App.css';


const VenueDetails = (props) => {
	const [venueData, setVenueData] = useState(undefined);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	let { id } = useParams();

	const key = '5T8Sry2eWOJvsJIi66T4bhm3GKFEOKc8';
	const baseURL = 'https://app.ticketmaster.com/discovery/v2';

	useEffect(() => {
		async function fetchData() {
			try {
				let url = `${baseURL}/venues?apikey=${key}&countryCode=US&id=${id}`;
				const { data } = await axios.get(url);
				setVenueData(data._embedded.venues[0]);
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
				>VENUE</Typography>
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
						title={venueData.name}
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
						image={venueData.images && venueData.images.length > 0
							? venueData.images[0].url
							: noImage}

						title={venueData.name}
					/>

					<CardContent>
						{/* Venues City/State/Country */}
						<Typography
							sx={{
								backgroundColor: '#39393957',
								borderRadius: '10px',
								marginTop: '20px',
								padding: '10px',
								boxShadow: '0px 0px 20px #000000'
							}}>
							<Typography>
								<dt className='title'>Geographic:</dt>
								<dd className='content'>
									{venueData.city && venueData.city.name && venueData.state && venueData.country
										? `${venueData.city.name}, ${venueData.state.stateCode}, ${venueData.country.countryCode}`
										: 'N/A'}
								</dd>
							</Typography>
						</Typography>

						{/* Venues Address */}
						<Typography
							sx={{
								backgroundColor: '#39393957',
								borderRadius: '10px',
								marginTop: '20px',
								padding: '10px',
								boxShadow: '0px 0px 20px #000000'
							}}>
							<Typography>
								<dt className='title'>Address:</dt>
								<dd className='content'>
									{venueData.address && venueData.address.line1
										? venueData.address.line1
										: 'N/A'}
									{venueData.address && venueData.address.postalCode
										? ` ${venueData.address.postalCode}`
										: ''}

								</dd>
							</Typography>
						</Typography>

						{/* Venues Phone */}
						<Typography
							sx={{
								backgroundColor: '#39393957',
								borderRadius: '10px',
								marginTop: '20px',
								padding: '10px',
								boxShadow: '0px 0px 20px #000000'
							}}>
							<Typography>
								<dt className='title'>Phone Details:</dt>
								<dd className='content'>
									{venueData.boxOfficeInfo && venueData.boxOfficeInfo.phoneNumberDetail
										? venueData.boxOfficeInfo.phoneNumberDetail
										: 'N/A'}
								</dd>
							</Typography>
						</Typography>

						{/* Venues Open Hours */}
						<Typography
							sx={{
								backgroundColor: '#39393957',
								borderRadius: '10px',
								marginTop: '20px',
								padding: '10px',
								boxShadow: '0px 0px 20px #000000'
							}}>
							<Typography>
								<dt className='title'>Open Hours:</dt>
								<dd className='content'>
									{venueData.boxOfficeInfo && venueData.boxOfficeInfo.openHoursDetail
										? venueData.boxOfficeInfo.openHoursDetail
										: 'N/A'}
								</dd>
							</Typography>
						</Typography>

						{/* Twitter */}
						<Typography
							sx={{
								backgroundColor: '#39393957',
								borderRadius: '10px',
								marginTop: '20px',
								padding: '10px',
								boxShadow: '0px 0px 20px #000000'
							}}>
							<Typography>
								<dt className='title'>Twitter Handle:</dt>
								<dd className='content'>
									{venueData.social && venueData.social.twitter && venueData.social.twitter.handle ?
										venueData.social.twitter.handle : 'N/A'}
								</dd>
							</Typography>
						</Typography>

						{/* Venue Website */}
						<Button
							component={Link}
							to={venueData.url && venueData.url.length > 0 ? venueData.url
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
						>Go to Venue's website</Button>

						{/* BUTTON: Back to Venues page */}
						<Button
							variant='contained'
							onClick={() => { window.location.href = '/venues?page=0' }}
							sx={{
								width: '100%',
								borderRadius: '30px',
								marginTop: '30px',
								color: 'white',
								backgroundColor: '#1877C3',
								'&:hover': {
									backgroundColor: '#1e8678',
									boxShadow: '0px 0px 30px #000000;',
								}
							}}
							startIcon={<FirstPageIcon sx={{ color: 'white' }} />}
						>Back to Venues page</Button>

					</CardContent>
				</Card >
			</>
		);
	}
};

export default VenueDetails;
