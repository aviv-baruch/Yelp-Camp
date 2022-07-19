import { Outlet, useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function SingleCampground() {
    const navigate = useNavigate()
    const data = useLocation().state
    let travelTo = data._id === undefined ? data.id : data._id

    function deleteItem(event) {
        axios
            .delete(`http://localhost:5000/campgrounds/${travelTo}`, { travelTo })
            .then((res) => {
                console.log(res.data)
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