import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';

function NFTItem({ image, name }) {
	return (
		<Grid item xs={4}>
			<Card>
				<CardMedia component="img" image={image} />
				<CardContent>
					<Typography>{name}</Typography>
				</CardContent>
			</Card>
		</Grid>
	);
}

export default NFTItem;
