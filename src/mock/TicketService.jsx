
const Cities = [
    {
        name: "Ankara",
        airports: [
            {
                name: "Ankara Esenboğa Havalimanı",
                code: "ESB"
            }
        ]
    },
    {
        name: "Istanbul",
        airports: [
            {
                name: "Istanbul Atatürk Havalimanı",
                code: "IST"
            },
            {
                name: "Istanbul Sabiha Gökçen Havalimanı",
                code: "SAW"
            }
        ]
    },
    {
        name: "Izmir",
        airports: [
            {
                name: "İzmir Adnan Menderes Havalimanı",
                code: "ADB"
            }
        ]
    },
    {
        name: "Antalya",
        airports: [
            {
                name: "Antalya Havalimanı",
                code: "AYT"
            }
        ]
    },
    {
        name: "Bursa",
        airports: [
            {
                name: "Bursa Yenişehir Havalimanı",
                code: "YEI"
            }
        ]
    },
    {
        name: "Trabzon",
        airports: [
            {
                name: "Trabzon Havalimanı",
                code: "TZX"
            }
        ]
    },
    {
        name: "Adana",
        airports: [
            {
                name: "Adana Şakirpaşa Havalimanı",
                code: "ADA"
            }
        ]
    },
    {
        name: "Konya",
        airports: [
            {
                name: "Konya Havalimanı",
                code: "KYA"
            }
        ]
    },
    {
        name: "Gaziantep",
        airports: [
            {
                name: "Gaziantep Oğuzeli Havalimanı",
                code: "GZT"
            }
        ]
    },
    {
        name: "Eskişehir",
        airports: [
            {
                name: "Eskişehir Anadolu Havalimanı",
                code: "ESK"
            }
        ]
    },
    {
        name: "Diyarbakır",
        airports: [
            {
                name: "Diyarbakır Havalimanı",
                code: "DIY"
            }
        ]
    },
    {
        name: "Mersin",
        airports: [
            {
                name: "Mersin Tarsus Çukurova Havalimanı",
                code: "LTFM"
            }
        ]
    },
    {
        name: "Erzurum",
        airports: [
            {
                name: "Erzurum Havalimanı",
                code: "ERZ"
            }
        ]
    },
    {
        name: "Samsun",
        airports: [
            {
                name: "Samsun Çarşamba Havalimanı",
                code: "SZF"
            }
        ]
    },
    {
        name: "Kayseri",
        airports: [
            {
                name: "Kayseri Erkilet Havalimanı",
                code: "ASR"
            }
        ]
    },
    {
        name: "Denizli",
        airports: [
            {
                name: "Denizli Çardak Havalimanı",
                code: "DNZ"
            }
        ]
    },
    {
        name: "Hatay",
        airports: [
            {
                name: "Hatay Havalimanı",
                code: "HTY"
            }
        ]
    },
    {
        name: "Kahramanmaraş",
        airports: [
            {
                name: "Kahramanmaraş Havalimanı",
                code: "KCM"
            }
        ]
    },
    {
        name: "Aydın",
        airports: [
            {
                name: "Aydın Çıldır Havalimanı",
                code: "CII"
            }
        ]
    },
    {
        name: "Balıkesir",
        airports: [
            {
                name: "Balıkesir Koca Seyit Havalimanı",
                code: "EDO"
            }
        ]
    },
];

const Airlines= [
    "Turkish Airlines",
    "Pegasus Airlines"
]

export function GetAirports() {
    return Cities.flatMap(city => {
        return city.airports.map(airport => {
            return {label: airport.name, value: airport.code}
        })
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function SearchTickets(originAirport, destinationAirport, departureDate) {
    const origin = Cities.flatMap(city => {
        return city.airports.filter(airport => airport.name === originAirport)
    });
    const destination = Cities.flatMap(city => {
        return city.airports.filter(airport => airport.name === destinationAirport)
    });
    if (origin.length === 0 || destination.length === 0) {
        await sleep(3000);
        throw new Error("Invalid Airport");
    }

    const tickets = [];
    for (let i = 0; i < 10 ; i++) {
        const duration = Math.floor((Math.random() * 10) + 1);
        tickets.push({
            flightNumber: "BIES-" + Math.floor(Math.random() * 1000),
            origin: {...origin[0], city: origin[0].name.split(" ")[0]},
            destination: {...destination[0], city: destination[0].name.split(" ")[0]},
            departureDate: departureDate,
            departureTime: i*2 + ":00",
            duration: duration,
            arrivalTime: (i*2 + duration) + ":00",
            airline: Airlines[Math.floor(Math.random() * Airlines.length)],
            price: Math.floor(Math.random() * 1000),
            availableSeats: Math.floor(Math.random() * 100)
        });
    }
    await sleep(3000);
    return tickets;
}