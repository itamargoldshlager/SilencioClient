import React, {FC} from 'react';
import {RequestRow} from "../RequestInterface/RequestInterface";
import {TableCell, TableRow} from "@material-ui/core";

const ManagerRequestListRow : FC<RequestRow> = ({id, personId, firstName, lastName, startAccess, endAccess, additionalInformation, onClick = () => {}}) => {
    return (
        <TableRow
            onClick={() => {
                onClick()
                console.log("clicked")
            }}
        >
            <TableCell>{id}</TableCell>
            <TableCell>
                <div>{additionalInformation?.timestamp.toLocaleTimeString()}</div>
                <div>{additionalInformation?.timestamp.toLocaleDateString()}</div>
            </TableCell>
            <TableCell>{additionalInformation?.requestBy}</TableCell>
            <TableCell>{additionalInformation?.company}</TableCell>
            <TableCell>{personId}</TableCell>
            <TableCell>{firstName}</TableCell>
            <TableCell>{lastName}</TableCell>
            <TableCell>{startAccess.toLocaleDateString()}</TableCell>
            <TableCell>{endAccess.toLocaleDateString()}</TableCell>
        </TableRow>
    );
};

export default ManagerRequestListRow;