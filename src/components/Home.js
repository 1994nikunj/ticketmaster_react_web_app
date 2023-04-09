import React from 'react';
import { Typography, Grid, Fade } from '@mui/material';

const Home = () => {
	const [fade, setFade] = React.useState(false);

	React.useEffect(() => {
		setFade(true);
	}, []);

	return (
		<div className='Home'>
			<Fade in={fade} timeout={1000}>
				<Grid container direction="column" alignItems="center">
					<Grid item>
						<Typography
							variant="h4"
							align="center" sx={{
								fontWeight: 'bold',
								color: '#ffffff'
							}}>
							Browse and discover your favorite Events, Venues, and Attractions.
						</Typography>
					</Grid>
				</Grid>
			</Fade>
		</div>
	);
};

export default Home;