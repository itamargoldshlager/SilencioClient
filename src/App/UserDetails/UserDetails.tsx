import React, {FC, Fragment, useEffect} from 'react';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {Grid, TextField, Button} from '@material-ui/core';
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {makeStyles} from "@material-ui/core/styles";
import ExitImage from "../utils/exit.png"
import MyImage from "./MyImage.jpg"

const useStyles = makeStyles({
    root: {
        '& .MuiInputBase-input': {
            color: 'black'
        },
    },
    exitImage: {
        position: 'absolute',
        top: 0,
        left: 5,
    },
    title: {
        textAlign: 'center',
    },
    img: {
        maxWidth: 183,
        height: 270,
        float: 'left'
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

interface userDetails {
    img: any,
    firstName: string,
    lastName: string,
    company: string,
    phoneNumber: string,
    beginEntrancePermit: Date,
    endEntrancePermit: Date
}

export interface userDetailsProps {
    open: boolean,
    onClose: () => void,
    id: string,
    HR?: boolean
}

const initialUserDetails: userDetails = {
    img: MyImage,
    beginEntrancePermit: new Date(2020,1,1),
    endEntrancePermit: new Date(2021, 1,1),
    company: "Silencio",
    firstName: "Itamar",
    lastName: "Goldshlager",
    phoneNumber: "052-6533460"
};

const getUserDetails = (): userDetails => {
    return initialUserDetails
};

const UserDetails : FC<userDetailsProps> = ({onClose, open, id, HR = false }) => {
    const classes = useStyles();

    let {img, firstName, lastName, company, phoneNumber,beginEntrancePermit, endEntrancePermit} = initialUserDetails;

    useEffect(() => {
        ({img, firstName, lastName, company, phoneNumber,beginEntrancePermit, endEntrancePermit} = getUserDetails());
    }, [id]);

    return (
        <Dialog
            TransitionComponent={Transition}
            open={open}
            onClose={onClose}
        >
            <DialogContent
                className={classes.root}
            >
                <img
                    className={classes.exitImage}
                    src={ExitImage}
                    onClick={onClose}
                />
                    <h1 className={classes.title}>Information</h1>
                    <Grid container>
                        <Grid item xs={4}>
                            <img
                                className={classes.img}
                                src={img}
                            />
                        </Grid>
                        <Grid item xs={8} className={classes.information}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        disabled={true && !HR}
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
                        <Grid xs={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDateTimePicker
                                    disabled={true}
                                    fullWidth
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy HH:mm"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="begin access date"
                                    value={beginEntrancePermit}
                                    onChange={()=> {}}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid xs={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDateTimePicker
                                    fullWidth
                                    disabled={true}
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy HH:mm"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="end access date"
                                    value={endEntrancePermit}
                                    onChange={()=> {}}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid xs={6}>
                            <TextField
                                disabled={true}
                                variant="outlined"
                                fullWidth
                                label="Access confirmed by"
                                value={firstName}
                            />
                        </Grid>
                        {
                            HR &&
                            <Fragment>
                                <Grid xs={3}>
                                    <Button
                                        className={classes.actionButton}
                                        color="primary"
                                        variant="contained"
                                    >
                                        Update
                                    </Button>
                                </Grid>
                                <Grid xs={3}>
                                    <Button
                                    className={classes.actionButton}
                                    color="secondary"
                                    variant="contained"
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