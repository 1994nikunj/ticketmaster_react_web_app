import React, { useState } from 'react';

const SearchItem = (props) => {
	const [searchTerm, setSearchTerm] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		props.searchValue(searchTerm);
	};

	const handleChange = (e) => {
		setSearchTerm(e.target.value);
	};

	return (
		<form
			onSubmit={handleSubmit}
			method='POST'
			name='formName'
			className='center'
		>
			<div className='search-container'>
				<input
					autoComplete='off'
					type='text'
					name='searchTerm'
					value={searchTerm}
					onChange={handleChange}
					placeholder='Search here...'
					className='search-input'
				/>
				<button
					type='submit'
					className='search-button'
				>Search
				</button>
			</div>
		</form>
	);
};

export default SearchItem;