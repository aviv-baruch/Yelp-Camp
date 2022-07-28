import { Link, useLocation } from 'react-router-dom';
import React from 'react';

export default function Error() {
    const location = useLocation();
    const statusCode = location.state ? location.state.resStatus : 404;
    const resData = location.state ? location.state.resData : `Couldn't find pathname ${location.pathname}`;

    return (
        <div className="row">
            <div className='col-6 offset-3'>
                <div class="alert alert-danger center" role="alert">
                    <h4 className="alert-heading">ERROR {statusCode}</h4>
                    <p>{resData}</p>
                    <Link to='/'>back home</Link>
                </div>
            </div>
        </div>
    );
}