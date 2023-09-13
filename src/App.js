import {
	Box,
	Container,
	Grid,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import { techaMiya } from './util/getMetadata';
import NFTItem from './components/NFTItem/NFTItem';
import NFTSkeleton from './components/NFTSkeleton/NFTSkeleton';
import SearchIcon from '@mui/icons-material/Search';

import Filter from './components/Filter/Filter';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';

const MAX_PAGE = 1000;
const PAGE_SIZE = 30;
const names = [
	'Background',
	'Body',
	'Dress',
	'Earring',
	'Eyes',
	'Face',
	'Gloves',
	'Hair',
	'Hand',
	'Head',
	'Mask',
	'Weapon',
	'Wing',
];

function App() {
	const [tokens, setTokens] = useState([]);
	const [filteredTokens, setFilteredTokens] = useState([]);
	const [filterBackupTokens, setFilterBackupTokens] = useState([]);
	const [filter, setFilter] = useState([]);
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
		setLoading(false);
	};

	useEffect(() => {
		getTokens(start);
	}, [start]);

	// 검색
	const handleChange = (e) => {
		const value = e.target.value.replaceAll(/\D/g, '');
		setInputValue(value);
	};

	const search = (e) => {
		const searchValue = e.target.value;
		let updatedTokens = filterBackupTokens;

		if (searchValue === '') {
			setFilteredTokens(updatedTokens);
		} else {
			updatedTokens = updatedTokens.filter((item) => item.name.includes(searchValue));
		}
		applyFilter(updatedTokens);
	};

	// 무한 스크롤
	const target = useRef(null);

	useEffect(() => {
		observer.observe(target.current);
	}, []);

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

	// 필터
	const applyFilter = (tokensToFilter) => {
		if (filter.length === 0) {
			setFilteredTokens(tokensToFilter);
			setFilterBackupTokens(tokensToFilter);
		} else {
			const newFilteredTokens = tokensToFilter.filter((token) => {
				for (let f of filter) {
					const matchedAtt = token.attributes.find((att) => {
						return f.trait_type === att.trait_type && f.value === att.value;
					});

					if (!matchedAtt) return false;
				}
				return true;
			});

			setFilteredTokens(newFilteredTokens);
		}
	};

	useEffect(() => {
		applyFilter(tokens);
	}, [filter, tokens]);

	const resetFilter = () => {
		setFilter([]);
	};

	// top버튼
	const toTop = () => {
		if (window.scrollY !== 0) {
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		}
	};

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
			<Grid container spacing={2} sx={{ width: '100%' }} alignItems="start">
				<Grid item xs={4}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							color: '#fff',
							py: 2,
						}}
					>
						<Typography variant="h6">Filter</Typography>
						<IconButton sx={{ color: '#fff' }} onClick={resetFilter}>
							<ReplayRoundedIcon />
						</IconButton>
					</Box>
					{names.map((name, index) => (
						<Filter key={index} name={name} filter={filter} setFilter={setFilter} />
					))}
				</Grid>
				<Grid
					item
					xs={8}
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
						{loading && Array.from(new Array(30)).map((data, index) => <NFTSkeleton key={index} />)}
						{!loading &&
							filteredTokens.map((token, index) => <NFTItem key={index} token={token} />)}
						<Box ref={target} sx={{ visibility: 'hidden' }}></Box>
					</Grid>
				</Grid>
			</Grid>
			<IconButton
				sx={{
					color: '#232323',
					background: '#efefef',
					position: 'fixed',
					bottom: '20px',
					right: '30px',
					border: '1px solid #fff',
					borderRadius: '50%',
					':hover': {
						color: '#fff',
					},
				}}
				onClick={toTop}
			>
				<ArrowUpwardIcon />
			</IconButton>
		</Container>
	);
}

export default App;
