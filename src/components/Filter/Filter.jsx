import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Checkbox,
	FormControlLabel,
	Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import data from '../../data/techmiya_traits.json';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Filter({ name, filter, setFilter }) {
	const [check, setCheck] = useState([]);
	const handleChange = (e) => {
		const value = e.target.value;
		const isChecked = e.target.checked;

		if (isChecked) {
			setCheck((prev) => prev.concat(e.target.value));
			setFilter((prevFilter) => [...prevFilter, { trait_type: name, value: value }]);
		} else {
			setCheck((prev) => prev.filter((item) => item !== value));
			setFilter((prevFilter) => prevFilter.filter((item) => item.value !== value));
		}
	};

	useEffect(() => {
		if (filter.length === 0) setCheck([]);
	}, [filter]);

	return (
		<Accordion sx={{ background: 'transparent', color: '#fff', border: '1px solid #36cacc' }}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon sx={{ color: '#36cacc' }} />}
				aria-controls="panel1a-content"
				id="panel1a-header"
				sx={{ py: 2 }}
			>
				<Typography sx={{ fontWeight: 'bold' }}>{name}</Typography>
			</AccordionSummary>
			<AccordionDetails>
				{data[name].map((item, index) => (
					<FormControlLabel
						control={
							<Checkbox
								sx={{ color: '#36cacc' }}
								onChange={handleChange}
								checked={check.includes(item)}
							/>
						}
						key={index}
						label={item}
						sx={{ display: 'block' }}
						value={item}
					/>
				))}
			</AccordionDetails>
		</Accordion>
	);
}

export default Filter;
