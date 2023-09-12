import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Checkbox,
	FormControlLabel,
	Typography,
} from '@mui/material';
import React from 'react';
import data from '../../data/techmiya_traits.json';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Filter({ name }) {
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
						control={<Checkbox sx={{ color: '#36cacc' }} />}
						key={index}
						label={item}
						sx={{ display: 'block' }}
					/>
				))}
			</AccordionDetails>
		</Accordion>
	);
}

export default Filter;
