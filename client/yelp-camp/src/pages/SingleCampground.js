import { Outlet, useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function SingleCampground() {
    const navigate = useNavigate()
    const data = useLocation().state
    let travelTo = data._id === undefined ? data.id : data._id
    console.log(data)
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
        <div>
            <h1>{data.title}</h1>
            <h2>{data.location}</h2>
            <img height={"400"} src={data.image} alt={data.title} />
            <p>{data.description}</p>
            <p>Price: {data.price}</p>
            <Link
                to={`/campgrounds/${travelTo}/edit`}
                key={data.id}
                state={data}
            >
                Edit
            </Link >
            <br />
            <input type="submit" value="DELETE" onClick={deleteItem} />
            <Outlet />
        </div >
    );
};