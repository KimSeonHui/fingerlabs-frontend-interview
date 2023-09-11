import { Box, Container, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { techaMiya } from './util/getMetadata';
import NFTItem from './components/NFTItem/NFTItem';
import NFTSkeleton from './components/NFTSkeleton/NFTSkeleton';
import SearchIcon from '@mui/icons-material/Search';

function App() {
	const [tokens, setTokens] = useState([]);
	const [backupTokens, setBackupTokens] = useState([]);
	const [loading, setLoading] = useState(true);

	const getTokens = async () => {
		const resultsTokens = [];

		for (let i = 0; i < 100; i++) {
			const url = await techaMiya.tokenURI(i);
			const res = await axios.get(url);
			resultsTokens.push(res.data);
		}
		setTokens(resultsTokens);
		setBackupTokens(resultsTokens);
		setLoading(false);
	};

	useEffect(() => {
		getTokens();
	}, []);

	const search = (e) => {
		if (e.target.value === '') {
			setTokens(backupTokens);
		} else {
			const searchedTokens = backupTokens.filter((token) => token.name.includes(e.target.value));
			setTokens(searchedTokens);
		}
	};

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
				<Grid
					item
					xs={9}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'flex-end',
					}}
				>
					<TextField
						id="outlined-basic"
						variant="outlined"
						placeholder="토큰 번호를 입력해주세요"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end" sx={{ color: '#fff' }}>
									<SearchIcon />
								</InputAdornment>
							),
						}}
						sx={{
							mb: 2,
							'.css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
								borderColor: '#fff !important',
							},
							'.css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root': {
								color: '#fff !important',
							},
						}}
						onKeyUp={search}
					/>
					<Grid container spacing={2}>
						{!loading
							? tokens.map((token, index) => <NFTItem key={index} token={token} />)
							: Array.from(new Array(12)).map((data, index) => <NFTSkeleton key={index} />)}
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
}

export default App;
