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
        image: data.image,
        description: data.description,
        price: data.price,
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
            <div className="row">
                <h1 className="text-center">Edit current Campground</h1>
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
                            value={editedCampgroundData.title}
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
                            value={editedCampgroundData.location}
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
                            value={editedCampgroundData.image}
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
                                value={editedCampgroundData.price}
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
                            value={editedCampgroundData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <input className="btn btn-success" type="submit" value="Submit Campground" onClick={handleSubmit} />
                    </div>
                </div>
                <Outlet />
            </div>
        </div>

    );
};