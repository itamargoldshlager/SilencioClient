import React, {FC} from 'react';
import {TableHead, TableRow, TableCell} from "@material-ui/core";

const MyRequestListHeader : FC = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>Number</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Begin access Date</TableCell>
                <TableCell>End access Date</TableCell>
                <TableCell>status</TableCell>
                <TableCell>Extension of entry permit</TableCell>
            </TableRow>
        </TableHead>
    );
};

export default MyRequestListHeader;