import React, {FC} from 'react';
import {TableCell, TableHead, TableRow} from "@material-ui/core";

const UserTableHeader : FC = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    Number
                </TableCell>
                <TableCell>
                    Username
                </TableCell>
                <TableCell>
                    Email
                </TableCell>
                <TableCell>
                    Group
                </TableCell>
                <TableCell>
                    Delete user
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export default UserTableHeader;