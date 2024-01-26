import {useState} from "react";
import {Input} from "./Input";
import {FormProvider, useForm} from "react-hook-form";
import {GetAirports, SearchTickets} from "../mock/TicketService.jsx";
import Result from "./Result.jsx";

function Search() {
    const [isRoundTrip, setIsRoundTrip] = useState(true);
    const [loading, setLoading] = useState(false);
    const [tickets, setTickets] = useState(null);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState("departureTime");

    const methods = useForm()

    const validateTickets = (tickets) => {
        if (tickets.departure.length === 0) {
            throw new Error("No Departure Flights Found");
        }
        if (tickets.return && tickets.return.length === 0) {
            throw new Error("No Return Flights Found");
        }
    }

    const onSubmit = methods.handleSubmit(async (data) => {
        setTickets(null);
        setError(null);
        setLoading(true);
        try {
            const all = {
                departure: await SearchTickets(data.origin, data.destination, data.departureDate),
                departureDate: data.departureDate,
                return: isRoundTrip && await SearchTickets(data.destination, data.origin, data.returnDate),
                returnDate: data.returnDate
            }
            validateTickets(all);
            setTickets(all);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    })

    const Require = {
        value: isRoundTrip,
        message: "Required"
    }

    const NotPast = (value) => {
        const today = new Date().toISOString().split('T')[0];
        return value >= today || "Date must be in the future";
    }

    const NotBeforeDeparture = (value) => {
        const departureDate = methods.watch('departureDate');
        return value > departureDate || "Return date must be after departure date";
    }

    const ValidAirport = (value) => {
        return autoComplete.some(item => item.label === value) || "Invalid Airport";
    }

    const autoComplete = GetAirports();

    const sortingFields = [
        {value: "departureTime", label: "Departure Time"},
        {value: "arrivalTime", label: "Arrival Time"},
        {value: "duration", label: "Flight Duration"},
        {value: "price", label: "Price"},
    ]

    return (
        <div>
            <div className="row mt-4 mx-5">
                <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
                    <FormProvider {...methods}>
                        <form
                            className="card"
                            onSubmit={e => e.preventDefault()}
                            noValidate
                        >
                            <div className="card-header mt-2 text-center">
                                <h4>Book a Flight</h4>
                            </div>
                            <div className="card-body">
                                <Input
                                    id="origin"
                                    label="Origin"
                                    type="text"
                                    placeholder="Origin City"
                                    validation={{
                                        required: Require,
                                        validate: {
                                            validAirport: value => ValidAirport(value)
                                        }
                                    }}
                                    data={autoComplete}
                                />
                                <Input
                                    id="destination"
                                    label="Destination"
                                    type="text"
                                    placeholder="Destination City"
                                    validation={{
                                        required: Require,
                                        validate: {
                                            notSame: value => value !== methods.watch('origin') || "Destination can't be Origin",
                                            validAirport: value => ValidAirport(value)
                                        }
                                    }}
                                    data={autoComplete}
                                />
                                <Input
                                    id="departureDate"
                                    label="Departure Date"
                                    type="date"
                                    placeholder="Departure Date"
                                    validation={{
                                        required: Require,
                                        validate: {
                                            notPast: value => NotPast(value)
                                        }
                                    }}
                                />
                                <Input
                                    id="returnDate"
                                    label="Return Date"
                                    type="date"
                                    placeholder="Return Date"
                                    validation={{
                                        required: Require,
                                        validate: isRoundTrip && {
                                            notPast: value => NotPast(value),
                                            notBeforeDeparture: value => NotBeforeDeparture(value)
                                        }
                                    }}
                                    disabled={!isRoundTrip}
                                />
                                <div className="form-check mt-2">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="checkbox-roundtrip"
                                        checked={isRoundTrip}
                                        onChange={(e) => setIsRoundTrip(e.target.checked)}
                                    />
                                    <label className="form-check-label text-white" htmlFor="checkbox-roundtrip">Round
                                        Trip</label>
                                </div>
                                <div className="text-center mt-4">
                                    <button
                                        onClick={onSubmit}
                                        disabled={loading}
                                        className="btn btn-primary btn-lg"
                                    >
                                        Search Flights
                                    </button>
                                </div>
                            </div>
                        </form>
                    </FormProvider>
                </div>
                <div className="col-sm-6 col-md-8 col-lg-9">
                    {loading && (
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )}
                    {error && (
                        <div className="alert alert-danger mt-2" role="alert">
                            {error}
                        </div>
                    )}
                    {tickets && (
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
                                    <div className="col">
                                        <Result
                                            label="Departing Flights"
                                            data={tickets.departure}
                                            date={tickets.departureDate}
                                            sortBy={sortBy}
                                        />
                                    </div>
                                )}
                                {tickets?.return && (
                                    <div className="col">
                                        <Result
                                            label="Return Flights"
                                            data={tickets.return}
                                            date={tickets.returnDate}
                                            sortBy={sortBy}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Search;