import {useState} from "react";
import TicketResult from "./TicketResult.jsx";
import SearchForm from "./SearchForm.jsx";

function Search() {
    const [loading, setLoading] = useState(false);
    const [tickets, setTickets] = useState(null);
    const [error, setError] = useState(null);

    return (
        <div>
            <div className="row mt-4 mx-5">
                <div className="col-sm-12 col-md-4 col-lg-3 mb-4">
                    <SearchForm
                        setTickets={setTickets}
                        setError={setError}
                        setLoading={setLoading}
                        loading={loading}
                    />
                </div>
                <div className="col-sm-12 col-md-8 col-lg-9">
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
                        <TicketResult
                            tickets={tickets}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Search;