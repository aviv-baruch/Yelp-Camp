import React from "react";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios'

export default function Edit() {
    const navigate = useNavigate()
    const location = useLocation();
    const data = location.state;
    const fixedID = data._id === undefined ? data.id : data._id

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
        } else if (values.description.length > 256)
        {
            errors.description = 'Must be 256 characters or less';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            title: data.title,
            location: data.location,
            image: data.image,
            description: data.description,
            price: data.price,
            id: fixedID
        },
        validate,
        onSubmit: values => {
            axios
                .put(`http://localhost:5000/campgrounds/${fixedID}`, values)
                .then((res) => {
                    navigate(`/campgrounds/${values.id}`, { state: { ...values } })
                })
                .catch(err => {
                    console.error(err);
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
                            className={"form-control"}
                            name="title"
                            type="text"
                            placeholder="Title"
                            onChange={formik.handleChange}
                            value={formik.values.title}
                        />

                        {formik.errors.title ? <div>{formik.errors.title}</div> : <div class="valid-feedback">Looks good!</div>}
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
                            value={formik.values.price}
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
            </div >
            <Outlet />
        </div >
    );
};