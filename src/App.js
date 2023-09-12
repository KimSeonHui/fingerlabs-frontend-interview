import { Box, Container, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import axios from 'axios';
import { techaMiya } from './util/getMetadata';
import NFTItem from './components/NFTItem/NFTItem';
import NFTSkeleton from './components/NFTSkeleton/NFTSkeleton';
import SearchIcon from '@mui/icons-material/Search';

const MAX_PAGE = 1000;
const PAGE_SIZE = 30;

function App() {
	const [tokens, setTokens] = useState([]);
	const [backupTokens, setBackupTokens] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [loading, setLoading] = useState(true);
	const [start, setStart] = useState(0);

	const getTokens = async (start) => {
		const resultsTokens = [];
		let end = start + PAGE_SIZE;

		if (MAX_PAGE <= start) {
			return;
		} else if (MAX_PAGE <= start + PAGE_SIZE) end = MAX_PAGE;

		for (let i = start; i < end; i++) {
			const url = await techaMiya.tokenURI(i);
			const res = await axios.get(url);
			resultsTokens.push(res.data);
		}
		setTokens((prev) => prev.concat(resultsTokens));
		setBackupTokens((prev) => prev.concat(resultsTokens));
		setLoading(false);
	};

	useEffect(() => {
		observer.observe(target.current);
	}, []);

	useEffect(() => {
		getTokens(start);
	}, [start]);

	const handleChange = (e) => {
		const value = e.target.value.replaceAll(/\D/g, '');
		setInputValue(value);
	};

	const search = (e) => {
		if (inputValue === '') {
			setTokens(backupTokens);
		} else {
			const searchedTokens = backupTokens.filter((token) => token.name.includes(e.target.value));
			setTokens(searchedTokens);
		}
	};

	// 무한 스크롤
	const target = useRef(null);

	const callback = (entries) => {
		const entry = entries[0];
		if (entry.isIntersecting) {
			setStart((prev) => prev + PAGE_SIZE);
		}
	};
	const options = {
		threshold: 1.0,
	};
	const observer = new IntersectionObserver(callback, options);

	return (
		<Container
			sx={{
				width: '100%',
				height: '100%',
				py: 4,
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
						value={inputValue}
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
						onChange={handleChange}
						onKeyUp={search}
					/>
					<Grid container spacing={2}>
						{!loading
							? tokens.map((token, index) => <NFTItem key={index} token={token} />)
							: Array.from(new Array(30)).map((data, index) => <NFTSkeleton key={index} />)}
						<Box ref={target} sx={{ visibility: 'hidden' }}></Box>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
}

export default App;
