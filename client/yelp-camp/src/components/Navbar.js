import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <nav
            className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark mb-2">
            <div
                className="container-fluid">
                <h1
                    className={"navbar-brand"}>YelpCamp</h1>
                <button
                    className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span
                        className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div
                        className="navbar-nav">
                        <Link
                            className={"nav-link"}
                            to='/'>Home </Link>
                        <Link
                            className={"nav-link"}
                            to='/campgrounds'>Campgrounds</Link>
                        <Link
                            className={"nav-link"}
                            to='/campgrounds/new'>Add Campground</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;