import React, {FC} from 'react';
import {RequestRow} from "../RequestInterface/RequestInterface";
import {TableCell, TableRow} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    row: {
        cursor: 'pointer'
    }
});

const ManagerRequestListRow : FC<RequestRow> = ({id, personId, firstName, lastName, timestamp, company, additionalInformation, onClick = () => {}}) => {
    const classes = useStyles();

    return (
        <TableRow
            onClick={onClick}
            className={classes.row}
        >
            <TableCell>{id}</TableCell>
            <TableCell>
                <div>{timestamp.toLocaleTimeString()}</div>
                <div>{timestamp.toLocaleDateString()}</div>
            </TableCell>
            <TableCell>{additionalInformation?.requestBy}</TableCell>
            <TableCell>{company}</TableCell>
            <TableCell>{personId}</TableCell>
            <TableCell>{firstName}</TableCell>
            <TableCell>{lastName}</TableCell>
        </TableRow>
    );
};

export default ManagerRequestListRow;