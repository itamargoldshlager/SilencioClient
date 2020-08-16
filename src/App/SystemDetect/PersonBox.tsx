import React, {FC, Fragment} from 'react';
import { Grid } from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import clsx from 'clsx';
import {detectionEvent, s3Bucket} from "./interfaces/interface";

const useStyles = makeStyles({
    img: {
        width: 145,
        height: 160,
        borderStyle: 'solid',
        borderWidth: 5,
    },
    green: {
        borderColor: 'green'
    },
    red :{
        borderColor: 'red'
    }
});

export interface PersonProps extends detectionEvent{
    onClick?: () => void
    onClose?: () => void;
}


const PersonBox : FC<PersonProps> = ({personId, timestamp, imageUrl, indication ,onClick, onClose}) => {
    const classes = useStyles();
    return (
        <Grid item xs={3} onClick={onClick}>
            <img
                src={`${s3Bucket}${imageUrl}`}
                 className={
                     clsx(classes.img,{
                         [classes.green]: indication === 'GREEN',
                         [classes.red]: indication === 'RED'
                    })
                 }
                alt="Person"
             />
            <div> {new Date(timestamp).toLocaleString()} </div>
            {
                indication === 'GREEN' &&
                    <Fragment>
                        <div>{personId}</div>
                    </Fragment>
            }
        </Grid>
    );
};

export default PersonBox;