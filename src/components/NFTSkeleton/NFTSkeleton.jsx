import { Card, CardContent, CardMedia, Grid, Skeleton, Typography } from '@mui/material';
import React from 'react';

function NFTSkeleton() {
	return (
		<Grid item xs={4}>
			<Card>
				<Skeleton sx={{ height: 245.98 }} animation="wave" variant="rectangular" />

				<CardContent>
					<Skeleton animation="wave" height={10} width="80%" />
				</CardContent>
			</Card>
		</Grid>
	);
}

export default NFTSkeleton;
