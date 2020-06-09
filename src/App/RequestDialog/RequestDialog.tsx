import {makeStyles} from "@material-ui/core/styles";
import React, {ChangeEvent, FC, Fragment, useEffect, useState} from "react";
import {TransitionProps} from "@material-ui/core/transitions";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import ExitImage from "../../utils/exit.png";
import SendImage from "../../utils/send.png"
import Grid from "@material-ui/core/Grid";
import {InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import SuccessDialog from "./SuccessDialog";
import {requestListType} from "../RequestList/RequestList";

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
    addImageButton: {
        textTransform: 'none',
        width: 178,
        marginTop: 10,
        paddingTop: 10,
        radius: 5,
        backgroundColor: '#169bd5',
        fontSize: 20,
        cursor: 'pointer',
        border: '1px solid #ccc',
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

interface request {
    img: any,
    firstName: string,
    lastName: string,
    mobileNumber: string,
    reason: string,
    ID: string,
    beginEntrancePermit: Date,
    endEntrancePermit: Date,
    information: string,
}


interface RequestDialogProps {
    show: boolean,
    onClose: () => void,
    requestType: requestListType
    requestId?: string,
}

const getRequestById = (requestId: string): request => {
    return {
        img: '',
        firstName: '',
        lastName: '',
        mobileNumber: '',
        reason: '',
        ID: '',
        beginEntrancePermit: new Date(),
        endEntrancePermit: new Date(),
        information: ''
    }
};

const RequestDialog : FC<RequestDialogProps> = ({onClose, show , requestType, requestId}) => {
    const classes = useStyles();

    const [requestDetails, setRequestDetails] = useState<request> (
        {
            img: '',
            firstName: '',
            lastName: '',
            mobileNumber: '',
            reason: '',
            ID: '',
            beginEntrancePermit: new Date(),
            endEntrancePermit: new Date(),
            information: ''
        }
    );

    useEffect(() => {
        if (requestType === requestListType.manager) {
            requestId && getRequestById(requestId);
        }
    }, [requestType, requestId]);
    
    const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);

    const sendRequest = () => {
        setShowSuccessDialog(true);
    };

    return (
        <Fragment>
            <SuccessDialog
                show={showSuccessDialog}
                onClose={() => {
                    setShowSuccessDialog(false);
                    onClose();
                }}
            />
            <Dialog
                onClose={onClose}
                TransitionComponent={Transition}
                open={show}
            >
                <DialogContent
                    className={classes.root}
                >
                    <img
                        className={classes.exitImage}
                        src={ExitImage}
                        onClick={onClose}
                    />
                    <h1 className={classes.title}>Person requests</h1>
                    <Grid container>
                        <Grid item xs={4} className={classes.personImage}>
                            <label className={classes.addImageButton}>
                                <input
                                    style={{display:"none"}}
                                    type="file"
                                    accept="image/*"
                                    onChange={(event: ChangeEvent<any>)=> {
                                        const newValue = event.target.files[0];
                                        newValue !== undefined && setRequestDetails(prevNewRequest => {
                                            return {
                                                ...prevNewRequest,
                                                img: newValue
                                            }
                                        })}
                                    }
                                />
                                Choose Image
                            </label>
                            {
                                requestDetails.img !== '' &&
                                <img
                                    src={URL.createObjectURL(requestDetails.img)}
                                    alt="product"
                                    style={{
                                        width: '100%',
                                        height: '100%'
                                    }}
                                />
                            }
                        </Grid>
                        <Grid container xs={8}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="First Name"
                                    value={requestDetails.firstName}
                                    onChange={
                                        (event: ChangeEvent<HTMLInputElement>) => {
                                            const newValue = event.target.value;
                                            setRequestDetails(prevNewRequest => {
                                                return {
                                                    ...prevNewRequest,
                                                    firstName: newValue
                                                }
                                            })}
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Last Name"
                                    value={requestDetails.lastName}
                                    onChange={
                                        (event: ChangeEvent<HTMLInputElement>) => {
                                            const newValue = event.target.value;
                                            setRequestDetails(prevNewRequest => {
                                                return {
                                                    ...prevNewRequest,
                                                    lastName: newValue
                                                }
                                            })}
                                    }
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
                                    value={requestDetails.mobileNumber}
                                    onChange={
                                        (event: ChangeEvent<HTMLInputElement>) => {
                                            const newValue = event.target.value;
                                            setRequestDetails(prevNewRequest => {
                                                return {
                                                    ...prevNewRequest,
                                                    mobileNumber: newValue
                                                }
                                            })}
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel>Reason</InputLabel>
                                <Select
                                    fullWidth
                                    value={requestDetails.reason}
                                    onChange={
                                        (event: ChangeEvent<any>) => {
                                            const newValue = event.target.value;
                                            setRequestDetails(prevNewRequest => {
                                                return {
                                                    ...prevNewRequest,
                                                    reason: newValue
                                                }
                                            })}
                                    }
                                >
                                    <MenuItem value="Guest">Guest</MenuItem>
                                    <MenuItem value="Worker">Worker</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="ID"
                                    value={requestDetails.ID}
                                    onChange={
                                        (event: ChangeEvent<HTMLInputElement>) => {
                                            const newValue = event.target.value;
                                            setRequestDetails(prevNewRequest => {
                                                return {
                                                    ...prevNewRequest,
                                                    ID: newValue
                                                }
                                            })}
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDateTimePicker
                                    fullWidth
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy HH:mm"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="begin access date"
                                    value={requestDetails.beginEntrancePermit}
                                    onChange={
                                        (date: MaterialUiPickersDate) => {
                                            const newValue = date;
                                            newValue != null && setRequestDetails(prevNewRequest => {
                                                return {
                                                    ...prevNewRequest,
                                                    beginEntrancePermit: newValue
                                                }
                                            })}
                                    }
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
                                    format="dd/MM/yyyy HH:mm"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="end access date"
                                    value={requestDetails.endEntrancePermit}
                                    onChange={
                                        (date: MaterialUiPickersDate) => {
                                            const newValue = date;
                                            newValue != null && setRequestDetails(prevNewRequest => {
                                                return {
                                                    ...prevNewRequest,
                                                    endEntrancePermit: newValue
                                                }
                                            })}
                                    }
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
                                value={requestDetails.information}
                                onChange={
                                    (event: ChangeEvent<HTMLInputElement>) => {
                                        const newValue = event.target.value;
                                        setRequestDetails(prevNewRequest => {
                                            return {
                                                ...prevNewRequest,
                                                information: newValue
                                            }
                                        })}
                                }
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <img
                                onClick={sendRequest}
                                className={classes.sendImage}
                                src={SendImage}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
};

export default RequestDialog;