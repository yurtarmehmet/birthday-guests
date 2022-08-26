import React from 'react';
import PropTypes from 'prop-types';

const GuestTable = ({tableHeader, guests}) => {
    return (
        <>
            <h3>{tableHeader}</h3>
            <table>
                <thead>
                <tr>
                    <th>Parner Name</th>
                    <th>Partner Id</th>
                </tr>
                </thead>
                <tbody>
                {
                    guests?.map((guest) => {
                        return <tr key={guest.partner_id} data-testid="guest-cell">
                            <td>{guest.name}</td>
                            <td>{guest.partner_id}</td>
                        </tr>
                    })
                }
                </tbody>
            </table>
        </>
    );
};

GuestTable.propTypes = {
    tableHeader: PropTypes.string,
    guests: PropTypes.array
}

export default GuestTable;
