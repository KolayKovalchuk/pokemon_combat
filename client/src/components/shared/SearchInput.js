import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchInput({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <TextField
            variant="outlined"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
                style: {
                    height: '45px',
                    minWidth: '300px'
                }
            }}
            fullWidth
        />
    );
}

export default SearchInput;
