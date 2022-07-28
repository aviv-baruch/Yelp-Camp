import React from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios'
import Error from '././Error'

export default function New() {
    const navigate = useNavigate()

    const validate = values => {
        const errors = {};

        if (!values.title)
        {
            errors.title = 'Required';
        } else if (values.title.length > 32)
        {
            errors.title = 'Must be 15 characters or less';
        }

        if (!values.location)
        {
            errors.location = 'Required';
        } else if (values.location.length > 32)
        {
            errors.title = 'Must be 15 characters or less';
        }

        if (!values.image)
        {
            errors.image = 'Required';
        }

        if (values.price <= 0)
        {
            errors.price = 'Price most be above 0$';
        }

        if (!values.description)
        {
            errors.description = 'Required';
        } else if (values.description.length > 128)
        {
            errors.description = 'Must be 15 characters or less';
        }

        return errors;
    };


    const formik = useFormik({
        initialValues: {
            title: "",
            location: "",
            image: "",
            description: "",
            price: 0,
        },
        validate,
        onSubmit: values => {
            axios
                .post('http://localhost:5000/campgrounds', values)
                .then((res) => {
                    navigate(`/campgrounds/${res.data}`, { state: { ...values, id: res.data } })
                })
                .catch(err => {
                    navigate('./Error', { state: { resData: err.response.data, resStatus: err.response.status } })
                });
        },
    });
    return (
        <div className="row">
            <div className="col-6 offset-3">
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            id="title"
                            className="form-control"
                            name="title"
                            type="text"
                            placeholder="Title"
                            onChange={formik.handleChange}
                            value={formik.values.title}
                        />
                        {formik.errors.title ? <div>{formik.errors.title}</div> : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location" className="form-label">Location</label>
                        <input
                            id="location"
                            className="form-control"
                            name="location"
                            type="text"
                            placeholder="Location"
                            onChange={formik.handleChange}
                            value={formik.values.location}
                        />
                        {formik.errors.location ? <div>{formik.errors.location}</div> : null}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Image URL</label>
                        <input
                            id="image"
                            className="form-control"
                            name="image"
                            type="text"
                            placeholder="Image URL"
                            onChange={formik.handleChange}
                            value={formik.values.image}
                        />
                        {formik.errors.image ? <div>{formik.errors.image}</div> : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input
                            id="price"
                            className="form-control"
                            name="price"
                            type="number"
                            placeholder="Price"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        {formik.errors.price ? <div>{formik.errors.price}</div> : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            id="description"
                            className="form-control"
                            name="description"
                            type="textarea"
                            placeholder="Description"
                            onChange={formik.handleChange}
                            value={formik.values.description}
                        />
                        {formik.errors.description ? <div>{formik.errors.description}</div> : null}
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-success center">Submit Campground</button>
                    </div>
                </form>
            </div>
            <Outlet />
        </div>

    );
};