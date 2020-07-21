import React, {FC} from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const PersonTableHeader : FC = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    Id
                </TableCell>
                <TableCell>
                    first name
                </TableCell>
                <TableCell>
                    last name
                </TableCell>
                <TableCell>
                    begin permit date
                </TableCell>
                <TableCell>
                    end permit date
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export default PersonTableHeader;