import React, {FC} from 'react';
import {Request, RequestStatus} from "../RequestInterface/RequestInterface";
import {TableCell, TableRow} from "@material-ui/core";

const ManagerRequestListRow : FC<Request> = ({requestId, id, firstName, lastName, startDate, endDate, additionalInformation}) => {
    return (
        <TableRow>
            <TableCell>{requestId}</TableCell>
            <TableCell>
                <div>{additionalInformation?.requestTime.toLocaleTimeString()}</div>
                <div>{additionalInformation?.requestTime.toLocaleDateString()}</div>
            </TableCell>
            <TableCell>{additionalInformation?.requestBy}</TableCell>
            <TableCell>{additionalInformation?.company}</TableCell>
            <TableCell>{id}</TableCell>
            <TableCell>{firstName}</TableCell>
            <TableCell>{lastName}</TableCell>
            <TableCell>{startDate.toLocaleDateString()}</TableCell>
            <TableCell>{endDate.toLocaleDateString()}</TableCell>
        </TableRow>
    );
};

export default ManagerRequestListRow;