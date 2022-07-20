import React from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function New() {
    const navigate = useNavigate()
    const [campgroundData, setCampgroundData] = React.useState({
        title: "",
        location: "",
        image: "",
        description: "",
        price: 0,
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
        <div className="row">
            <h1 className="text-center">Add new campground</h1>
            <div className="col-6 offset-3">
                <div
                    className="mb-3">
                    <label className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        placeholder="Title"
                        className="form-control"
                        name="title"
                        value={campgroundData.title}
                        onChange={handleChange}
                    />
                </div>
                <div
                    className="mb-3">
                    <label
                        className="form-label"
                        htmlFor="location">
                        Location
                    </label>
                    <input
                        type="text"
                        placeholder="Location"
                        className="form-control"
                        name="location"
                        value={campgroundData.location}
                        onChange={handleChange}
                    />
                </div>
                <div
                    className="mb-3">
                    <label
                        className="form-label"
                        htmlFor="image">
                        Image
                    </label>
                    <input
                        type="text"
                        placeholder="Image"
                        className="form-control"
                        name="image"
                        value={campgroundData.image}
                        onChange={handleChange}
                    />
                </div>
                <div
                    className="mb-3">
                    <label
                        className="form-label"
                        htmlFor="price">
                        Price
                    </label>
                    <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input
                            type="number"
                            placeholder="Price"
                            className="form-control"
                            name="price"
                            value={campgroundData.price}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div
                    className="mb-3">
                    <label
                        className="form-label"
                        htmlFor="description">
                        Description
                    </label>
                    <textarea
                        type="textarea"
                        placeholder="Description"
                        className="form-control"
                        name="description"
                        value={campgroundData.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <input className="btn btn-success" type="submit" value="Submit Campground" onClick={handleSubmit} />
                </div>
            </div>
            <Outlet />
        </div>
    );
};