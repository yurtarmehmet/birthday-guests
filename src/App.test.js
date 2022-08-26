import {render, screen, act, waitFor, cleanup} from '@testing-library/react';
import App from "./App";



describe("App Integration Test", () => {
    beforeEach(() => {
        cleanup();
    });

    test('it renders the app', async() => {
        global.fetch = () =>
            Promise.resolve({
                text: () => Promise.resolve('{"latitude": "42.6661417", "partner_id": 12, "name": "Bluebell Robles", "longitude": "23.293435"}\n'),
            })
        act(() => {
            render(<App />);
        });
        await waitFor(() => {
            screen.getByTestId("guests-table-wrapper")
            expect(screen.getByTestId("guests-table-wrapper")).toBeInTheDocument();
        });
    });

    test('it shows parsing error if there is one', async() => {
        global.fetch = () =>
            Promise.resolve({
                text: () => Promise.resolve('invalid response'),
            })
        act(() => {
            render(<App />);
        });
        await waitFor(() => {
            screen.getByTestId("app-error")
            expect(screen.getByTestId("app-error")).toBeInTheDocument();
        });
    });

    test('it shows promise error if it rejects', async() => {
        global.fetch = () =>
            Promise.resolve({
                text: () => Promise.reject(),
            })
        act(() => {
            render(<App />);
        });
        await waitFor(() => {
            screen.getByTestId("app-error")
            expect(screen.getByTestId("app-error")).toBeInTheDocument();
        });
    });


})

