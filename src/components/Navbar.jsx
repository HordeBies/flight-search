import ticket from "../assets/airplane-ticket.png";
function Navbar() {
    return (
            <nav className="navbar bg-primary">
                <a href="#" className="navbar-brand ms-3 text-white" style={{fontWeight: 'bold', fontSize: '40px'}}>
                    <img src={ticket} width="50" height="50" className="d-inline-block align-top mr-2 ml-5" alt="plane"/>
                    <span className="ms-2">Bies Flight Booking</span>
                </a>
            </nav>
    )
}

export default Navbar;