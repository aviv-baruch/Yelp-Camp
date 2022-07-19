import React from "react";
import { Link } from 'react-router-dom';

export default function Campgrounds() {
    const [backEndData, setBackEndData] = React.useState([{}])
    const [fetchStatus, setFetchStatus] = React.useState(false)
    React.useEffect(() => {
        fetch("/campgrounds").then(
            res => res.json()
        ).then(
            data => {
                setBackEndData(data)
                setFetchStatus(true);
            }
        )
    }, []);
    return (
        <div className="Campgrounds">
            <h1>All campground</h1>
            {(fetchStatus === false) ?
                (<p>Loading...</p>) :
                backEndData.map((campground) => (
                    <ul>
                        <li>
                            <Link
                                to={`/campgrounds/${campground._id}`}
                                state={campground}
                            >
                                {campground.title} - {campground.location}
                            </Link>
                        </li>
                    </ul>
                ))}
        </div>
    )
}