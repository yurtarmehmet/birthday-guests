import {render, screen} from '@testing-library/react';
import GuestTable from './GuestTable';

test('it renders guests table header', () => {
    render(<GuestTable tableHeader={"Partners within 100km from Sofia Office"}/>);
    const headerElement = screen.getByText("Partners within 100km from Sofia Office");
    expect(headerElement).toBeInTheDocument();
});

test('it renders guests table content', () => {
    render(<GuestTable
        guests={[{"latitude": "42.6661417", "partner_id": 12, "name": "Bluebell Robles", "longitude": "23.293435"},
            {"latitude": "42.7034111", "partner_id": 1, "name": "Jamelia Waller", "longitude": "23.4862259"}]}/>);
    const guestCells = screen.queryAllByTestId('guest-cell');
    expect(guestCells.length).toBe(2);
});
