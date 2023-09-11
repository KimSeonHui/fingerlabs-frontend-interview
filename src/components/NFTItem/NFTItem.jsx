import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';

function NFTItem({ token }) {
	return (
		<Grid item xs={4}>
			<Card>
				<CardMedia component="img" image={token.image} />
				<CardContent>
					<Typography>{token.name}</Typography>
				</CardContent>
			</Card>
		</Grid>
	);
}

export default NFTItem;
