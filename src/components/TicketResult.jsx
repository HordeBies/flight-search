import TicketTable from "./TicketTable.jsx";
import {useState} from "react";

function TicketResult({tickets}){
    const sortingFields = [
        {value: "departureTime", label: "Departure Time"},
        {value: "arrivalTime", label: "Arrival Time"},
        {value: "duration", label: "Flight Duration"},
        {value: "price", label: "Price"},
    ]

    const [sortBy, setSortBy] = useState("departureTime")

    return (
        <div className="card">
            <div className="card-header mt-2">
                <h4>Available Flights</h4>
                <ul className="nav">
                    <li className="nav-item">
                        <a className="nav-link disabled text-white">Sort By:</a>
                    </li>
                    {sortingFields.map((field, index) => (
                        <li key={index} className="nav-item">
                            <a
                                className={`nav-link ${sortBy === field.value ? "disabled" : ""}`}
                                onClick={() => setSortBy(field.value)}
                                href="#"
                            >
                                {field.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="card-body row">
                {tickets?.departure && (
                    <div className="col-sm-12 col-md-12 col-lg-6">
                        <TicketTable
                            label="Departing Flights"
                            data={tickets.departure}
                            date={tickets.departureDate}
                            sortBy={sortBy}
                        />
                    </div>
                )}
                {tickets?.return && (
                    <div className="col-sm-12 col-md-12 col-lg-6">
                        <TicketTable
                            label="Return Flights"
                            data={tickets.return}
                            date={tickets.returnDate}
                            sortBy={sortBy}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default TicketResult;