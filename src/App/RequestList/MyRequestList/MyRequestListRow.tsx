import React, {FC} from 'react';
import {RequestRow, RequestStatus} from "../RequestInterface/RequestInterface";
import {makeStyles, TableCell, TableRow} from "@material-ui/core";
import clsx from 'clsx';

const useStyles = makeStyles({
    Confirmed: {
        backgroundColor: '#00ff00'
    },
    Pending: {
        backgroundColor: '#ffbe00'
    },
    Rejected: {
        backgroundColor: '#ff0000'
    }
});

const MyRequestListRow : FC<RequestRow> = ({requestId, id, firstName, lastName, startDate, endDate, status}) => {
    const {Confirmed, Pending, Rejected} = useStyles();

    return (
        <TableRow>
            <TableCell>{requestId}</TableCell>
            <TableCell>{id}</TableCell>
            <TableCell>{firstName}</TableCell>
            <TableCell>{lastName}</TableCell>
            <TableCell>{startDate.toLocaleDateString()}</TableCell>
            <TableCell>{endDate.toLocaleDateString()}</TableCell>
            <TableCell
                className={clsx({
                    [Confirmed] : status === RequestStatus.Confirmed,
                    [Pending] : status === RequestStatus.Pending,
                    [Rejected]: status === RequestStatus.Rejected
                })}
            >
                {status.toString()}
            </TableCell>
            <TableCell></TableCell>
        </TableRow>
    );
};

export default MyRequestListRow;