
import { Outlet, useLocation, } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import '../index.css';
import React from 'react';



export default function SingleCampground() {
    const navigate = useNavigate()
    const data = useLocation().state
    let travelTo = data._id === undefined ? data.id : data._id

    function deleteItem(event) {
        axios
            .delete(`http://localhost:5000/campgrounds/${travelTo}`, { travelTo })
            .then((res) => {
                navigate(`/campgrounds`)
            })
            .catch(err => {
                console.error(err);
            });
    }

    return (
        <div id="campground--card">
            < div className="card w-50">
                <img className="img-thumbnail" src={data.image} alt={data.title} />
                <div className="card-body">
                    <h5 className="card-title">{data.title}</h5>
                    <p className="card-text">{data.description}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item text-muted">{data.location}</li>
                    <li className="list-group-item">{data.price}$ / night</li>
                </ul>
                <div className="card-body ">
                    <Link
                        className={"card-link btn btn-info"}
                        to={`/campgrounds/${travelTo}/edit`}
                        key={data.id}
                        state={data}
                    >
                        Edit
                    </Link >
                    <input className="btn btn-danger ms-2" type="submit" value="DELETE" onClick={deleteItem} />
                </div>
            </div >
            < Outlet />
        </div >
    );

};
