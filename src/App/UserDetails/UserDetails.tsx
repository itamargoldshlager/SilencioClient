import React, {FC, Fragment} from 'react';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {Grid, TextField} from '@material-ui/core';
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {makeStyles} from "@material-ui/core/styles";
import ExitImage from "../utils/exit.png"

const useStyles = makeStyles({
    root: {
        '& .MuiInputBase-input': {
            color: 'black'
        },
    },
    dialogPaper: {
        minHeight: '80vh',
        maxHeight: '80vh',
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
        minHeight: 226,
        float: 'left'
    },
    information: {
        textAlign: 'center',
        '& .MuiGrid-grid-xs-6': {
            padding: 20
        }
    },
});

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface userDetailsProps {
    show: boolean,
    onClose: () => void,
    img: any,
    firstName: string,
    lastName: string,
    company: string,
    phoneNumber: string,
    beginEntrancePermit: Date,
    endEntrancePermit: Date
}

const UserDetails : FC<userDetailsProps> = ({onClose, show, img, firstName, lastName, company, phoneNumber,beginEntrancePermit, endEntrancePermit }) => {
    const classes = useStyles();
    return (
        <Dialog
            TransitionComponent={Transition}
            open={show}
            onClose={onClose}
            // classes={{paper:classes.dialogPaper}}
        >
            <DialogContent
                className={classes.root}
            >
                <img
                    className={classes.exitImage}
                    src={ExitImage}
                />
                <Fragment>
                    <h1 className={classes.title}>Information</h1>
                    <Grid container>
                        <Grid item xs={4}>
                            <img
                                className={classes.img}
                                src={img}
                            />
                        </Grid>
                        <Grid item xs={8} className={classes.information}>
                            <Grid container spacing={3}>
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
                                        value={firstName}
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
                                    format="dd/MM/yyyy mm:HH"
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
                                    format="dd/MM/yyyy mm:HH"
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
                        <Grid item xs></Grid>
                        <Grid xs={6}>
                            <TextField
                                disabled={true}
                                variant="outlined"
                                fullWidth
                                label="Access confirmed by"
                                value={firstName}
                            />
                        </Grid>
                        <Grid item xs></Grid>
                    </Grid>
                </Fragment>
            </DialogContent>
        </Dialog>
    );
};

export default UserDetails;