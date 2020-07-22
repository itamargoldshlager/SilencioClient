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

const MyRequestListRow : FC<RequestRow> = ({id, personId, firstName, lastName, startAccess, endAccess, state}) => {
    const {Confirmed, Pending, Rejected} = useStyles();

    return (
        <TableRow>
            <TableCell>{id}</TableCell>
            <TableCell>{personId}</TableCell>
            <TableCell>{firstName}</TableCell>
            <TableCell>{lastName}</TableCell>
            <TableCell>{startAccess.toLocaleDateString()}</TableCell>
            <TableCell>{endAccess.toLocaleDateString()}</TableCell>
            <TableCell
                className={clsx({
                    [Confirmed] : state === RequestStatus.APPROVED,
                    [Pending] : state === RequestStatus.OPEN,
                    [Rejected]: state === RequestStatus.DECLINED
                })}
            >
                {state.toString()}
            </TableCell>
            <TableCell></TableCell>
        </TableRow>
    );
};

export default MyRequestListRow;