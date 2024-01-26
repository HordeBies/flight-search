function TicketCard({ticket}) {
    const { flightNumber, origin, destination, departureTime, arrivalTime, airline, price, availableSeats, duration} = ticket;

    return (
        <div className="card ticket-card my-4">
            <div className="card-header bg-secondary">
                <div className="row">
                    <div className="col-4">
                        <h6>From</h6>
                        <h5>{origin.city}</h5>
                        <h6>{origin.name}</h6>
                        <h6>{origin.code}</h6>
                    </div>
                    <div className="col-4">
                        <h6 style={{"visibility":"hidden"}}>Via</h6>
                        <h5>{airline}</h5>
                        <h6>{flightNumber}</h6>
                        <h6>{duration} Hours</h6>
                    </div>
                    <div className="col-4">
                        <h6>To</h6>
                        <h5>{destination.city}</h5>
                        <h6>{destination.name}</h6>
                        <h6>{destination.code}</h6>
                    </div>
                </div>
            </div>
            <div className="card-body bg-gradient">
                <div className="row">
                    <div className="col-4">
                        <h6>Departure</h6>
                        <h5>{departureTime}</h5>
                        <h6>{origin.city}</h6>
                    </div>
                    <div className="col-4">
                        <h6>Arrival</h6>
                        <h5>{arrivalTime}</h5>
                        <h6>{destination.city}</h6>
                    </div>
                    <div className="col-4">
                        <h6>Price</h6>
                        <h5>{price} TRY</h5>
                        <h6>{availableSeats} Seats</h6>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TicketCard;