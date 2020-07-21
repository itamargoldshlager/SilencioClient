import React, {FC} from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export interface PersonProps {
    id: string,
    firstName: string,
    lastName: string,
    start: Date,
    end: Date,
    onClick?: () => void,
}

const PersonTableRow : FC<PersonProps> = ({id, firstName, lastName, end, start, onClick}) => {
    return (
        <TableRow
            onClick={onClick}
        >
            <TableCell>
                {id}
            </TableCell>
            <TableCell>
                {firstName}
            </TableCell>
            <TableCell>
                {lastName}
            </TableCell>
            <TableCell>
                {start.toLocaleDateString()}
            </TableCell>
            <TableCell>
                {end.toLocaleDateString()}
            </TableCell>
        </TableRow>
    );
};

export default PersonTableRow;