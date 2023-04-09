import React from 'react';
import logo from '../img/404.png';
import '../App.css';

const NotFound = () => {
    return (
        <div>
            <h1>404 PAGE NOT FOUND</h1>
            <img src={logo} className='not-found-logo' alt='logo' />
            <h3>The page you are looking for doesn't exist</h3>
        </div>
    );
};

export default NotFound;