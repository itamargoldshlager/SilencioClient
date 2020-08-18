import React, {FC, Fragment, useEffect, useState} from 'react';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {Grid, TextField, Button} from '@material-ui/core';
import DateFnsUtils from "@date-io/date-fns";
import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {makeStyles} from "@material-ui/core/styles";
import {FetchUserDetails} from "./FetchUserDetails";

const useStyles = makeStyles({
    root: {
        '& .MuiInputBase-input': {
            color: 'black'
        },
    },
    exitContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    exitImage: {
        width: 42,
        height: 40
    },
    title: {
        textAlign: 'center',
    },
    img: {
        maxWidth: 183,
        height: 270,
    },
    information: {
        textAlign: 'center',
        '& .MuiGrid-grid-xs-6': {
            padding: 20
        }
    },
    actionButton: {
        width: '100%',
        height: '100%'
    },
});

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export interface userDetails {
    img: any,
    firstName: string,
    lastName: string,
    company: string,
    phoneNumber: string,
    beginEntrancePermit: Date,
    endEntrancePermit: Date
    acceptedBy: string,
}

export interface userDetailsProps {
    open: boolean,
    onClose: () => void,
    id: string,
    HR?: boolean,
    onDelete?: ( onClose: () => void) => void
}

const initialUserDetails: userDetails = {
    img: '',
    beginEntrancePermit: new Date(2020,1,1),
    endEntrancePermit: new Date(2021, 1,1),
    company: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    acceptedBy: ''
};

const getUserDetails = (userId: string, callback: (data: userDetails) => void): void => {
    FetchUserDetails(userId, callback);
};

const UserDetails : FC<userDetailsProps> = ({onClose, open, id, HR = false, onDelete }) => {
    const classes = useStyles();

    const [details, setDetails] = useState<userDetails>(initialUserDetails);

    useEffect(() => {
        if (open)
            getUserDetails(id, setDetails);
    }, [open, id]);

    let {img, firstName, lastName, company, phoneNumber,beginEntrancePermit, endEntrancePermit, acceptedBy} = details;

    return (
        <Dialog
            TransitionComponent={Transition}
            open={open}
            onClose={onClose}
        >
            <DialogContent
                className={classes.root}
            >
                <div className={classes.exitContainer}>
                    <button
                        className={classes.exitImage}
                        onClick={onClose}
                    >
                        x
                    </button>
                </div>
                <h1 className={classes.title}>Information</h1>

                <Grid container>
                    <Grid item xs={4}>
                        <img
                            className={classes.img}
                            src={img}
                            alt="PersonImage"
                        />
                    </Grid>
                    <Grid item xs={8} className={classes.information}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    disabled={true}
                                    variant="outlined"
                                    label="first name"
                                    value={firstName}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    disabled={true}
                                    variant="outlined"
                                    label="last name"
                                    value={lastName}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    disabled={true}
                                    variant="outlined"
                                    fullWidth
                                    label="company"
                                    value={company}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    disabled={true}
                                    variant="outlined"
                                    fullWidth
                                    label="phone number"
                                    value={phoneNumber}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    disabled={true}
                                    variant="outlined"
                                    fullWidth
                                    label="ID"
                                    value={id}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6} className={classes.information}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DateTimePicker
                                fullWidth
                                disabled={true}
                                inputVariant="outlined"
                                format="dd/MM/yyyy mm:HH"
                                label="begin access date"
                                value={beginEntrancePermit}
                                onChange={() => {}}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DateTimePicker
                                fullWidth
                                disabled={true}
                                inputVariant="outlined"
                                format="dd/MM/yyyy mm:HH"
                                label="end access date"
                                value={endEntrancePermit}
                                onChange={() => {}}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            disabled={true}
                            variant="outlined"
                            fullWidth
                            label="Access confirmed by"
                            value={acceptedBy}
                        />
                    </Grid>
                    {
                        HR &&
                        <Fragment>
                            <Grid xs={3}>
                            </Grid>
                            <Grid xs={3}>
                                <Button
                                    className={classes.actionButton}
                                    color="secondary"
                                    variant="contained"
                                    onClick={
                                        () =>
                                            onDelete ? onDelete(onClose) : {}
                                    }
                                >
                                    Delete
                                </Button>
                            </Grid>
                        </Fragment>
                    }
                    </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default UserDetails;