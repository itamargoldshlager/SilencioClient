import {makeStyles} from "@material-ui/core/styles";
import React, {FC, Fragment} from "react";
import {TransitionProps} from "@material-ui/core/transitions";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import ExitImage from "../utils/exit.png";
import SendImage from "../utils/send.png"
import Grid from "@material-ui/core/Grid";
import {TextField, Select, MenuItem, InputLabel} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";

const useStyles = makeStyles({
    root: {
        '& .MuiGrid-grid-xs-6': {
            padding: 20
        },
    },
    exitImage: {
        position: 'absolute',
        top: 0,
        left: 5,
    },
    sendImage: {
        padding: 30,
    },
    title: {
        textAlign: 'center',
    },
    personImage: {
        width: 315,
        height: 200,
    },
    information: {
        textAlign: 'center',

    },
});

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface addRequestProps {
    show: boolean,
    onClose: () => void,
}

const AddRequest : FC<addRequestProps> = ({onClose, show }) => {
    const beginEntrancePermit = new Date();
    const endEntrancePermit = new Date()
    const classes = useStyles();
    return (
        <Dialog
            TransitionComponent={Transition}
            open={show}
            onClose={onClose}
        >
            <DialogContent
                className={classes.root}
            >
                <img
                    className={classes.exitImage}
                    src={ExitImage}
                />
                <h1 className={classes.title}>Person requests</h1>
                <Grid container>
                    <Grid item xs={4} className={classes.personImage}>

                    </Grid>
                    <Grid container xs={8}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="First Name"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Last Name"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Company"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Mobile number"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel>Reason</InputLabel>
                            <Select
                                fullWidth
                            >
                                <MenuItem value={10}>Guest</MenuItem>
                                <MenuItem value={10}>Worker</MenuItem>
                                <MenuItem value={10}>Other</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="ID"
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDateTimePicker
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
                    <Grid item xs={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDateTimePicker
                                fullWidth
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
                    <Grid item xs={9}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Request information"
                            multiline
                            rows={4}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <img
                            className={classes.sendImage}
                            src={SendImage}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
};

export default AddRequest;