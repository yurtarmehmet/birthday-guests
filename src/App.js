import {useEffect, useState} from "react";
import {MAX_DISTANCE_FROM_SOFIA_OFFICE, PARTNERS_FILE_LOCATION, SOFIA_OFFICE_COORDS} from "./constants";
import {readFromLocalFile, DistanceCalculator} from "./utils";
import GuestTable from "./components/GuestsTable/GuestTable";


function App() {
    const [guests, setGuests] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const DistanceFromSofiaCalculator = new DistanceCalculator({
            baseLocationCoords: SOFIA_OFFICE_COORDS
        });
        readFromLocalFile(PARTNERS_FILE_LOCATION).then((result) => {
            if(result.error){
                setError(result.errorMessage);
            }else{
                const partnersWithDistance = result.partners.map((partner) => {
                    const parsedLatitude = parseFloat(partner.latitude);
                    const parsedLongitude = parseFloat(partner.longitude);
                    const distanceFromSofia = DistanceFromSofiaCalculator.calculateDistance({
                        latitude: parsedLatitude,
                        longitude: parsedLongitude
                    })
                    return {...partner, latitude: parsedLongitude, longitude: parsedLongitude, distanceFromSofia}
                })
                const partnersWithinMaxDistance = partnersWithDistance.filter(guest => guest.distanceFromSofia < MAX_DISTANCE_FROM_SOFIA_OFFICE);
                const partnersWithinMaxDistanceSortedAsc = partnersWithinMaxDistance.sort(function (partner1, partner2) {  return partner1["partner_id"] - partner2["partner_id"];  })
                setGuests(partnersWithinMaxDistanceSortedAsc);
                setError(null);
            }
        }).catch((err) => {
            setError(err.errorMessage);
        })
    }, [])
    if(error){
        return <div data-testid="app-error">{error}</div>
    }
    return (
        <div className="App" data-testid="app">
                {guests.length === 0 && <div>No Partners Found within {MAX_DISTANCE_FROM_SOFIA_OFFICE}km</div>}
                {guests.length > 0 && <div data-testid="guests-table-wrapper">
                    <GuestTable tableHeader={`Partners within ${MAX_DISTANCE_FROM_SOFIA_OFFICE}km from Sofia Office` } guests={guests} />
                </div>}
        </div>
    );
}

export default App;
