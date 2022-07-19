import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        // <nav className='navbar'>
        //     
        // </nav>

        <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">YelpCamp</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                        <a class="nav-link" href="#">Features</a>
                        <a class="nav-link" href="#">Pricing</a>
                        <a class="nav-link disabled">Disabled</a>
                        <Link className={"nav-link active"} to='/'>Home </Link>
                        <Link className={"nav-link"} to='/campgrounds'>Campgrounds</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;