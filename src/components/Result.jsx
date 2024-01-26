import TicketCard from "./TicketCard.jsx";

function Result({label, date, data, sortBy}) {

    const compareAsTime = (a, b) => {
        const aTime = a.split(":");
        const bTime = b.split(":");
        if (aTime[0] !== bTime[0]) {
            return parseInt(aTime[0]) - parseInt(bTime[0]);
        } else {
            return parseInt(aTime[1]) - parseInt(bTime[1]);
        }
    }

    switch (sortBy) {
        case "departureTime":
            data.sort((a, b) => {
                return compareAsTime(a.departureTime, b.departureTime);
            });
            break;
        case "arrivalTime":
            data.sort((a, b) => {
                return compareAsTime(a.arrivalTime, b.arrivalTime)
            });
            break;
        case "price":
            data.sort((a, b) => {
                return a.price - b.price;
            });
            break;
        case "duration":
            data.sort((a, b) => {
                return parseInt(a.duration) - parseInt(b.duration);
            });
            break;
        default:
            break;
    }

    return (
        <div>
            <h5>{label}</h5>
            <h6>Date: {date}</h6>
            {data.map((ticket, index) => (
                <div key={index}>
                    <TicketCard
                        ticket={ticket}
                    />
                </div>
            ))}

        </div>
    )
}

export default Result;