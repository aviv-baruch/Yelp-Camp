import React from "react";

import CampgroundItem from "../components/CampgroundItem";

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

    const campgroundsItems = backEndData.map((campground) => < CampgroundItem
        key={campground._id}
        _id={campground._id}
        title={campground.title}
        location={campground.location}
        image={campground.image}
        description={campground.description}
        price={campground.price}

    />)

    return (
        <div className="Campgrounds">
            <h1 className="text-center">All campground</h1>
            {
                (fetchStatus === false) ?
                    (<p>Loading...</p>) :
                    <ul>
                        {campgroundsItems}
                    </ul>
            }
        </div>
    )
}