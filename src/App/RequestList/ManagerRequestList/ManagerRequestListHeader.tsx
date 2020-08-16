import React, {FC} from 'react';
import {TableCell, TableHead, TableRow} from "@material-ui/core";

const ManagerRequestListHeader : FC = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>Number</TableCell>
                <TableCell>Request Time</TableCell>
                <TableCell>Sent by</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>id</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
            </TableRow>
        </TableHead>
    );
};

export default ManagerRequestListHeader;