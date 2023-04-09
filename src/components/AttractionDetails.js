import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import noImage from '../img/attractions-notfound.jpeg';

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

const AttractionDetails = (props) => {
	const [attractionData, setAttractionData] = useState(undefined);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	let { id } = useParams();

	const key = '5T8Sry2eWOJvsJIi66T4bhm3GKFEOKc8';
	const baseURL = 'https://app.ticketmaster.com/discovery/v2';

	useEffect(() => {
		async function fetchData() {
			try {
				let url = `${baseURL}/attractions?apikey=${key}&countryCode=US&id=${id}`;
				const { data } = await axios.get(url);
				const attraction = data._embedded.attractions[0];

				setAttractionData(attraction);
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
				>ATTRACTION</Typography>
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
						title={attractionData.name}
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
						image={
							attractionData.images && attractionData.images[0].url
								? attractionData.images[0].url
								: noImage
						}
						title={attractionData.name}
					/>
					<CardContent>
						{/* Attraction Type */}
						<Typography
							sx={{
								backgroundColor: '#39393957',
								borderRadius: '10px',
								marginTop: '20px',
								padding: '10px',
								boxShadow: '0px 0px 20px #000000'
							}}>
							<Typography>
								<dt className='title'>Attraction Type:</dt>
								<dd className='content'>
									{attractionData.classifications && attractionData.classifications[0].segment.name
										? attractionData.classifications[0].segment.name
										: 'N/A'}
									{attractionData.classifications && attractionData.classifications[0].genre.name && attractionData.classifications[0].subGenre.name
										? ` (${attractionData.classifications[0].genre.name}/${attractionData.classifications[0].subGenre.name})`
										: ''}
								</dd>
							</Typography>
						</Typography>

						{/* Attraction Address */}
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
									{attractionData._embedded && attractionData._embedded.venues[0].address.line1

										? attractionData._embedded.venues[0].address.line1
										: 'N/A'}
									{attractionData._embedded && attractionData._embedded.venues[0].address.line2
										? `, ${attractionData._embedded.venues[0].address.line2}`

										: ''}
									{attractionData._embedded && attractionData._embedded.venues[0].city.name
										? `, ${attractionData._embedded.venues[0].city.name}`
										: ''}
									{attractionData._embedded && attractionData._embedded.venues[0].state.stateCode
										? `, ${attractionData._embedded.venues[0].state.stateCode}`
										: ''}
									{attractionData._embedded && attractionData._embedded.venues[0].postalCode
										? `, ${attractionData._embedded.venues[0].postalCode}`
										: ''}
								</dd>
							</Typography>
						</Typography>

						{/* Attraction Phone */}
						<Typography
							sx={{
								backgroundColor: '#39393957',
								borderRadius: '10px',
								marginTop: '20px',
								padding: '10px',
								boxShadow: '0px 0px 20px #000000'
							}}>
							<Typography>
								<dt className='title'>Phone:</dt>
								<dd className='content'>
									{attractionData._embedded && attractionData._embedded.venues[0].boxOfficeInfo.phoneNumberDetail
										? attractionData._embedded.venues[0].boxOfficeInfo.phoneNumberDetail
										: 'N/A'}
								</dd>
							</Typography>
						</Typography>

						{/* Attraction Website */}
						<Button
							component={Link}
							to={attractionData.url && attractionData.url.length > 0 ? attractionData.url
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
						>Go to Attraction's website</Button>

						{/* BUTTON: Back to Events page */}
						<Button
							variant='contained'
							onClick={() => { window.location.href = '/attractions?page=0' }}
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
						>Back to Attractions page</Button>

					</CardContent>
				</Card >
			</>
		);
	}
};

export default AttractionDetails;
