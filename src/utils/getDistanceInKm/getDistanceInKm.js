import {PI, RADIUS_OF_EARTH} from "./constants";

const DistanceCalculator = (function () {
    const defaults = {
        PI,
        RADIUS_OF_EARTH
    }

    const checkValidityOfCoords = (name, coords) => {
        if (!coords.latitude) {
            throw new Error(`${name} Latitude is missing`);

        }

        if (!coords.longitude) {
            throw new Error(`${name} Longitude is missing`);

        }
        if (!isValidLatitude(coords.latitude)) {
            throw new Error(`${name} Latitude is not valid`);
        }

        if (!isValidLongitude(coords.longitude)) {
            throw new Error(`${name} Longitude is not valid`);
        }
    }

    const isValidLatitude = (latitude) => {
        return isFinite(latitude) && Math.abs(latitude) <= 90;
    };

    const isValidLongitude = (longitude) => {
        return isFinite(longitude) && Math.abs(longitude) <= 180;
    };

    const getRadianFromDegree = (degree) => {
        return degree * PI / 180;
    };

    const getAbsoluteLongDiff = (long1, long2) => {
        if (long1 > long2) {
            return long1 - long2;
        }
        return long2 - long1;
    };

    const getCentralAngle = (location1, location2) => {
        const lat1Rad = getRadianFromDegree(location1.latitude);
        const lat2Rad = getRadianFromDegree(location2.latitude);
        const long1Rad = getRadianFromDegree(location1.longitude);
        const long2Rad = getRadianFromDegree(location2.longitude);
        const absLongDiff = getAbsoluteLongDiff(long1Rad, long2Rad);
        return Math.acos(Math.sin(lat1Rad) * Math.sin(lat2Rad)
            + Math.cos(lat1Rad)
            * Math.cos(lat2Rad)
            * Math.cos(absLongDiff));
    }

    const getDistance = (location1, location2) => {
        return RADIUS_OF_EARTH * getCentralAngle(location1, location2);
    }

    return class {
        constructor(options) {
            if (!options ||
                !options.baseLocationCoords) {
                throw new Error('Missing parameter: baseLocationCoords');
            }

            checkValidityOfCoords("baseLocation", options.baseLocationCoords);

            this._baseLocationCoords = options.baseLocationCoords;
            this._PI = options.PI || defaults.PI;
            this._RADIUS_OF_EARTH = options.RADIUS_OF_EARTH || defaults.RADIUS_OF_EARTH;
        }

        calculateDistance(destinationCoords) {
            if(!destinationCoords){
                throw new Error('Missing destinationCoords');
            }
            checkValidityOfCoords("destination", destinationCoords);
            return getDistance(this._baseLocationCoords, destinationCoords);
        }
    };
})();

export default DistanceCalculator;
