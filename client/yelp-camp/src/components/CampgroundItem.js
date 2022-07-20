import React from "react";
import { Link } from 'react-router-dom';

export default function CampgroundItem(props) {
    return (
        <div
            className="card mb-3">
            <div className="row">
                <div className="col-md-4">
                    <img className={"img-fluid"} alt="" src={props.image} />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{props.title}</h5>
                        <p className="card-text">{props.description}</p>
                        <small className="text-muted">{props.location}</small>
                        <br />
                        <Link className="btn btn-primary mt-2"
                            to={`/campgrounds/${props._id}`}
                            state={props}
                        >
                            View {props.title}
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    )
}