import {cleanup} from '@testing-library/react';
import DistanceCalculator from "./getDistanceInKm";
import {SOFIA_OFFICE_COORDS} from "../../constants";

describe("Distance Calculator Tests", () => {
    afterEach(cleanup);
    test('it throws en error if baseLocation parameter is missing', () => {
        expect(() => {
            const DistanceCalculatorFromSofia = new DistanceCalculator();
        }).toThrow("Missing parameter: baseLocationCoords");
    });

    test('it throws en error if baseLocation longitude parameter is missing', () => {
        expect(() => {
            const DistanceCalculatorFromSofia = new DistanceCalculator({
                baseLocationCoords: {
                    latitude: SOFIA_OFFICE_COORDS.latitude,
                }
            });
        }).toThrow("baseLocation Longitude is missing");
    });

    test('it throws en error if baseLocation latitude parameter is missing', () => {
        expect(() => {
            const DistanceCalculatorFromSofia = new DistanceCalculator({
                baseLocationCoords: {
                    longitude: SOFIA_OFFICE_COORDS.longitude,
                }
            });
        }).toThrow("baseLocation Latitude is missing");
    });

    test('it throws en error if baseLocation longitude parameter is not valid', () => {
        expect(() => {
            const DistanceCalculatorFromSofia = new DistanceCalculator({
                baseLocationCoords: {
                    latitude: SOFIA_OFFICE_COORDS.latitude,
                    longitude: 299999
                }
            });
        }).toThrow("baseLocation Longitude is not valid");
    });

    test('it throws en error if baseLocation latitude parameter is not valid', () => {
        expect(() => {
            const DistanceCalculatorFromSofia = new DistanceCalculator({
                baseLocationCoords: {
                    longitude: SOFIA_OFFICE_COORDS.longitude,
                    latitude: 299999
                }
            });
        }).toThrow("baseLocation Latitude is not valid");
    });

    test('it throws en error if destination coors are missing', () => {
        expect(() => {
            const DistanceCalculatorFromSofia = new DistanceCalculator({
                baseLocationCoords: SOFIA_OFFICE_COORDS
            });
            DistanceCalculatorFromSofia.calculateDistance()
        }).toThrow("Missing destinationCoords");
    });

    test('it throws en error if destination longitude parameter is missing', () => {
        expect(() => {
            const DistanceCalculatorFromSofia = new DistanceCalculator({
                baseLocationCoords: SOFIA_OFFICE_COORDS
            });
            DistanceCalculatorFromSofia.calculateDistance({
                latitude: SOFIA_OFFICE_COORDS.latitude
            })
        }).toThrow("destination Longitude is missing");
    });

    test('it throws en error if destination latitude parameter is missing', () => {
        expect(() => {
            const DistanceCalculatorFromSofia = new DistanceCalculator({
                baseLocationCoords: SOFIA_OFFICE_COORDS
            });
            DistanceCalculatorFromSofia.calculateDistance({
                longitude: SOFIA_OFFICE_COORDS.longitude
            })
        }).toThrow("destination Latitude is missing");
    });

    test('it throws en error if destination longitude parameter is not valid', () => {
        expect(() => {
            const DistanceCalculatorFromSofia = new DistanceCalculator({
                baseLocationCoords: SOFIA_OFFICE_COORDS
            });
            DistanceCalculatorFromSofia.calculateDistance({
                latitude: SOFIA_OFFICE_COORDS.latitude,
                longitude: 299999
            })
        }).toThrow("destination Longitude is not valid");
    });

    test('it throws en error if destination latitude parameter is not valid', () => {
        expect(() => {
            const DistanceCalculatorFromSofia = new DistanceCalculator({
                baseLocationCoords: SOFIA_OFFICE_COORDS
            });
            DistanceCalculatorFromSofia.calculateDistance({
                longitude: SOFIA_OFFICE_COORDS.longitude,
                latitude: 299999
            })
        }).toThrow("destination Latitude is not valid");
    });

    test("it correctly calculates distance between two points", () => {
        const DistanceCalculatorFromSofia = new DistanceCalculator({
            baseLocationCoords: SOFIA_OFFICE_COORDS
        });
        const unaBeachToSofiaOffice = DistanceCalculatorFromSofia.calculateDistance({
            longitude: 23.4147793,
            latitude: 42.6612057
        })
        expect(unaBeachToSofiaOffice).toBe(5.190550245406926);
    });
})
