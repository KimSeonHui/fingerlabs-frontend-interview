import { Box, Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { techaMiya } from './util/getMetadata';
import NFTItem from './components/NFTItem/NFTItem';

function App() {
	console.log(techaMiya);
	const [tokens, setTokens] = useState([]);

	const getTokens = async () => {
		const resultsTokens = [];

		for (let i = 0; i < 30; i++) {
			const url = await techaMiya.tokenURI(i);
			const res = await axios.get(url);
			resultsTokens.push(res.data);
		}
		setTokens(resultsTokens);
	};

	useEffect(() => {
		getTokens();
	}, []);

	return (
		<Container
			sx={{
				width: '100%',
				height: '100%',
				py: 4,
				background: `linear-gradient(
					to bottom,
					#0c0931,
					#1d1856,
					#e80074,
					#c200db,
					#00cfe5
				)`,
			}}
		>
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 6 }}>
				<Typography variant="h3" color="#fff">
					TECHA MIYA
				</Typography>
			</Box>
			<Grid container spacing={2} sx={{ width: '100%' }}>
				<Grid item xs={3}></Grid>
				<Grid item xs={9}>
					<Grid container spacing={2}>
						{tokens.map((token, index) => (
							<NFTItem key={index} image={token.image} name={token.name} />
						))}
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
}

export default App;
