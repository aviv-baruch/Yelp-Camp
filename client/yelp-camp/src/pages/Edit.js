import React from "react";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function New() {
    const navigate = useNavigate()
    const location = useLocation();
    const data = location.state;
    const fixedID = data._id === undefined ? data.id : data._id

    let [editedCampgroundData, setEditedCampgroundData] = React.useState({
        title: data.title,
        location: data.location,
        id: fixedID
    })

    function handleChange(event) {
        const { name, value } = event.target
        setEditedCampgroundData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    function handleSubmit(event) {
        event.preventDefault();
        axios
            .put(`http://localhost:5000/campgrounds/${fixedID}`, editedCampgroundData)
            .then((res) => {
                navigate(`/campgrounds/${editedCampgroundData.id}`, { state: { ...editedCampgroundData } })
            })
            .catch(err => {
                console.error(err);
            });
    }

    return (
        <div>
            <h1>Edit current Campground</h1>
            <div className="form">
                <div>
                    <label for="title">Title</label>
                    <input
                        type="text"
                        placeholder="Title"
                        className="form--input"
                        name="title"
                        value={editedCampgroundData.title}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label for="location">Location</label>
                    <input
                        type="text"
                        placeholder="Location"
                        className="form--input"
                        name="location"
                        value={editedCampgroundData.location}
                        onChange={handleChange}
                    />
                </div>
                <input type="submit" value="Submit Campground" onClick={handleSubmit} />
            </div>
            <Outlet />
        </div>
    );
};