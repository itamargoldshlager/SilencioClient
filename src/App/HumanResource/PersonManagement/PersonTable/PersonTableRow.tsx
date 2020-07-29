import React, {FC} from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

interface Permit {
    id: string,
    personId: string,
    issuerId: string,
    startAccess: number,
    endAccess: number,
    reason: string,
    info: string,
    timestamp: number,
    state: string
}

export interface PersonProps {
    personId: string,
    firstName: string,
    lastName: string,
    companyId: string,
    phone: string,
    permits: Permit[]
    onClick?: () => void,
}

const PersonTableRow : FC<PersonProps> = ({personId, firstName, lastName, permits, onClick}) => {
    return (
        <TableRow
            onClick={onClick}
        >
            <TableCell>
                {personId}
            </TableCell>
            <TableCell>
                {firstName}
            </TableCell>
            <TableCell>
                {lastName}
            </TableCell>
            <TableCell>
                {
                    new Date(permits[permits.length - 1].startAccess).toLocaleDateString()
                }
            </TableCell>
            <TableCell>
                {
                    new Date(permits[permits.length - 1].endAccess).toLocaleDateString()
                }
            </TableCell>
        </TableRow>
    );
};

export default PersonTableRow;