import React from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function New() {
    const navigate = useNavigate()
    const [campgroundData, setCampgroundData] = React.useState({
        title: "",
        location: "",
        id: ""
    })

    function handleChange(event) {
        const { name, value } = event.target
        setCampgroundData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    function handleSubmit(event) {
        event.preventDefault();
        axios
            .post('http://localhost:5000/campgrounds', campgroundData)
            .then((res) => {
                navigate(`/campgrounds/${res.data}`, { state: { ...campgroundData, id: res.data } })
            })
            .catch(err => {
                console.error(err);
            });

    }
    return (
        <div>
            <h1>Add new campground</h1>
            <div className="form">
                <div>
                    <label for="title">Title</label>
                    <input
                        type="text"
                        placeholder="Title"
                        className="form--input"
                        name="title"
                        value={campgroundData.title}
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
                        value={campgroundData.location}
                        onChange={handleChange}
                    />
                </div>
                <input type="submit" value="Submit Campground" onClick={handleSubmit} />
            </div>
            <Outlet />
        </div>
    );
};