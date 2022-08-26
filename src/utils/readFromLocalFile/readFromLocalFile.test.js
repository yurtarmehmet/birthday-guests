import readFromLocalFile from "./readFromLocalFile";
import {PARTNERS_FILE_LOCATION} from "../../constants";
import {cleanup} from "@testing-library/react";

describe("Distance Calculator Tests", () => {
    beforeEach(() => {
        cleanup();
    });

    test("it reads from a local file", async () => {
        global.fetch = () =>
            Promise.resolve({
                text: () => Promise.resolve('{"latitude": "42.6661417", "partner_id": 12, "name": "Bluebell Robles", "longitude": "23.293435"}\n'),
            })
        const result = await readFromLocalFile(PARTNERS_FILE_LOCATION);
        expect(result.partners.length).toEqual(1);
    })

    test("it throws an exception if promise rejects for some reason.", async () => {
        global.fetch = () =>
            Promise.reject();
        let err = 0;
        try{
            const result = await readFromLocalFile(PARTNERS_FILE_LOCATION);
            err = 0;
        }catch(e){
            err = 1;
        }
        expect(err).toBeTruthy();
    });
})

