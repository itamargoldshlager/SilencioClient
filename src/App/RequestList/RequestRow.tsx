import React, {FC} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    img: {
        width: 145,
        height: 160,
        borderStyle: 'solid',
        borderWidth: 5,
    }
});

export interface RequestRowProps {
    requestId: string,
    firstName: string,
    lastName: string,
    startDate: Date,
    endDate: Date,
    img: any,
}

const RequestRow : FC<RequestRowProps> = ({requestId, firstName, lastName, startDate, img, endDate}) => {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={3}>
                <img src={img} className={classes.img}/>
            </Grid>
            <Grid item xs={3}>
                <h4>First name: {firstName}</h4>
                <h4>Last name: {lastName}</h4>
            </Grid>
            <Grid item xs={3}>
                <h4>Start date: {startDate.toLocaleString()}</h4>
                <h4>End date: {endDate.toLocaleString()}</h4>
            </Grid>
            <Grid item xs={3}>
                <Button
                    color="primary"
                    variant="outlined"
                >
                    Full information
                </Button>
            </Grid>
        </Grid>
    );
};

export default RequestRow;