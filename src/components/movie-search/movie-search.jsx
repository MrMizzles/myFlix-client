import React, { useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';

export const MovieSearch = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);

        if (newSearchTerm === '') {
            onSearch('');
        } else {
            onSearch(newSearchTerm);
        }
    };

    return (
        <Form className="col-4 mt-3 mb-3">
            <FormControl
                className="mr-sm-2"
                id="search-bar"
                type="text"
                placeholder="Search movies by title..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
        </Form>
    );
};