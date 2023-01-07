import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="alert alert-primary d-flex justify-content-between" role="alert">
            Finance Tracker

            <div className='d-flex'>
                <NavLink to='/categories' className=' btn btn-primary me-5'>Category</NavLink>
                <NavLink to='/add' className=' btn btn-primary me-5'>Add</NavLink>
            </div>
        </div>
    );
};

export default Navbar;