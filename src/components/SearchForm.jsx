import {Input} from "./Input.jsx";
import {FormProvider, useForm} from "react-hook-form";
import {GetAirports, SearchTickets} from "../mock/TicketService.jsx";
import {useState} from "react";

function SearchForm({setTickets, setError, setLoading, loading}){
    const [isRoundTrip, setIsRoundTrip] = useState(true);

    const methods = useForm()

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

    return (
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
                            id="checkbox-roundtrip"
                            type="checkbox"
                            className="form-check-input"
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
    )
}

export default SearchForm;