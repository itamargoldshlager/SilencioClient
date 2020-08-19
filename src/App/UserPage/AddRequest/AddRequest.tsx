import {makeStyles} from "@material-ui/core/styles";
import React, {ChangeEvent, FC, Fragment, useEffect, useState} from "react";
import {TransitionProps} from "@material-ui/core/transitions";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import SendImage from "../../utils/send.png"
import Grid from "@material-ui/core/Grid";
import {InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import SuccessDialog from "./SuccessDialog";
import {requestListType} from "../../RequestList/RequestList";
import {SendPersonInfo, SendRequestInfo} from "./SendRequestData"
import Confirm from "./Confirm.png"
import Reject from "./Reject.png"
import {updateRequestState} from "./UpdateRequestState"
import {RequestStatus} from "../../RequestList/RequestInterface/RequestInterface";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    root: {
        '& .MuiGrid-grid-xs-6': {
            padding: 20
        },
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

    confirmReject: {
        textAlign: 'unset',
        width: '100%',
        height: '50%',
        '& img': {
            width: 50,
            height: 40
        },
        '& div': {
            display: 'inline-block',
            width: '50%',
            verticalAlign: 'top'
        }
    }
});

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export interface RequestDialogInformation {
    img: any,
    firstName: string,
    lastName: string,
    mobileNumber: string,
    reason: string,
    ID: string,
    beginEntrancePermit: Date,
    endEntrancePermit: Date,
    information: string,
    company: string,
    state?: RequestStatus
}

export const initialState: RequestDialogInformation = {
    img: '',
    firstName: '',
    lastName: '',
    mobileNumber: '',
    reason: '',
    ID: '',
    beginEntrancePermit: new Date(),
    endEntrancePermit: new Date(),
    information: '',
    company: ''
};

interface addRequestProps {
    show: boolean,
    onClose: () => void,
    requestType: requestListType
    requestId?: string
    state?: RequestStatus
    personId?: string
    requestInfo?: RequestDialogInformation
    issuerId?: string
}

const AddRequest: FC<addRequestProps> = ({onClose, show, requestId, requestType, personId, requestInfo , issuerId}) => {
    const classes = useStyles();

    const [showError, setShowError] = useState<boolean>(false);

    const [newRequest, setNewRequest] = useState<RequestDialogInformation>(initialState);

    const [disabled, setDisabled] = useState<boolean>(false);

    useEffect(() => {
        if (requestInfo) {
            setNewRequest(requestInfo);
            setDisabled(true);
        }
    }, [requestInfo]);

    const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);

    const validateInput = (request: RequestDialogInformation) : boolean => {
        return request.endEntrancePermit.getTime() > request.beginEntrancePermit.getTime();
    };

    const sendRequest = () => {
        if (validateInput(newRequest)) {
            SendPersonInfo(
                {
                    firstName: newRequest.firstName,
                    lastName: newRequest.lastName,
                    ID: newRequest.ID,
                    img: newRequest.img,
                    mobileNumber: newRequest.mobileNumber,
                    company: newRequest.company
                },
                () => {
                    SendRequestInfo({
                        issuerId: issuerId || '',
                        startAccess: newRequest.beginEntrancePermit.getTime(),
                        endAccess: newRequest.endEntrancePermit.getTime(),
                        personId: newRequest.ID,
                        reason: newRequest.reason,
                        info: newRequest.information,
                    }, () => setShowSuccessDialog(true));
                });
        } else {
            setShowError(true);
        }
    };

    const confirmRejectRequest = (confirmReject: boolean) => {
        if (requestId && personId) {
            updateRequestState(issuerId || '', personId, confirmReject, requestId);
            setShowSuccessDialog(true);
        }
    };

    return (
        <Fragment>
            <SuccessDialog
                show={showSuccessDialog}
                onClose={() => {
                    setShowSuccessDialog(false);
                    onClose();
                }}
                requestType={requestType}
            />
            <Dialog
                onClose={onClose}
                TransitionComponent={Transition}
                open={show}
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
                    <h1 className={classes.title}>Person requests</h1>
                    <Grid container>
                        <Grid item xs={4} className={classes.personImage}>
                            {
                                !disabled &&
                                <label className={classes.addImageButton}>
                                    <input
                                        style={{display: "none"}}
                                        type="file"
                                        accept="image/*"
                                        onChange={
                                            (event: ChangeEvent<any>) => {
                                                const newValue = event.target.files[0];
                                                    newValue !== undefined && setNewRequest(prevNewRequest => {
                                                        return {
                                                            ...prevNewRequest,
                                                            img: newValue
                                                        }
                                                    }
                                                )
                                            }
                                        }
                                    />
                                    Choose Image
                                </label>
                            }
                            {
                                newRequest.img !== '' &&
                                    <img
                                        src={requestId ? newRequest.img : URL.createObjectURL(newRequest.img)}
                                        alt="personImage"
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
                                    disabled={disabled}
                                    variant="outlined"
                                    label="First Name"
                                    value={newRequest.firstName}
                                    onChange={
                                        (event: ChangeEvent<HTMLInputElement>) => {
                                            const newValue = event.target.value;
                                            setNewRequest(prevNewRequest => {
                                                return {
                                                    ...prevNewRequest,
                                                    firstName: newValue
                                                }
                                            })
                                        }
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    disabled={disabled}
                                    variant="outlined"
                                    label="Last Name"
                                    value={newRequest.lastName}
                                    onChange={
                                        (event: ChangeEvent<HTMLInputElement>) => {
                                            const newValue = event.target.value;
                                            setNewRequest(prevNewRequest => {
                                                return {
                                                    ...prevNewRequest,
                                                    lastName: newValue
                                                }
                                            })
                                        }
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    value={newRequest.company}
                                    fullWidth
                                    disabled={disabled}
                                    variant="outlined"
                                    label="Company"
                                    onChange={
                                        (event: ChangeEvent<HTMLInputElement>) => {
                                            const newValue = event.target.value;
                                            setNewRequest(prevNewRequest => {
                                                return {
                                                    ...prevNewRequest,
                                                    company: newValue
                                                }
                                            })
                                        }
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    disabled={disabled}
                                    variant="outlined"
                                    label="Mobile number"
                                    value={newRequest.mobileNumber}
                                    onChange={
                                        (event: ChangeEvent<HTMLInputElement>) => {
                                            const newValue = event.target.value;
                                            setNewRequest(prevNewRequest => {
                                                return {
                                                    ...prevNewRequest,
                                                    mobileNumber: newValue
                                                }
                                            })
                                        }
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel>Reason</InputLabel>
                                <Select
                                    fullWidth
                                    disabled={disabled}
                                    value={newRequest.reason}
                                    onChange={
                                        (event: ChangeEvent<any>) => {
                                            const newValue = event.target.value;
                                            setNewRequest(prevNewRequest => {
                                                return {
                                                    ...prevNewRequest,
                                                    reason: newValue
                                                }
                                            })
                                        }
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
                                    disabled={disabled}
                                    variant="outlined"
                                    label="ID"
                                    value={newRequest.ID}
                                    onChange={
                                        (event: ChangeEvent<HTMLInputElement>) => {
                                            const newValue = event.target.value;
                                            setNewRequest(prevNewRequest => {
                                                return {
                                                    ...prevNewRequest,
                                                    ID: newValue
                                                }
                                            })
                                        }
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DateTimePicker
                                    fullWidth
                                    disabled={disabled}
                                    inputVariant="outlined"
                                    format="dd/MM/yyyy HH:mm"
                                    label="begin access date"
                                    value={newRequest.beginEntrancePermit}
                                    onChange={
                                        (date: MaterialUiPickersDate) => {
                                            const newValue = date;
                                            newValue != null && setNewRequest(prevNewRequest => {
                                                return {
                                                    ...prevNewRequest,
                                                    beginEntrancePermit: newValue
                                                }
                                            })
                                        }
                                    }
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DateTimePicker
                                    fullWidth
                                    disabled={disabled}
                                    inputVariant="outlined"
                                    format="dd/MM/yyyy HH:mm"
                                    label="end access date"
                                    value={newRequest.endEntrancePermit}
                                    onChange={
                                        (date: MaterialUiPickersDate) => {
                                            const newValue = date;
                                            newValue != null && setNewRequest(prevNewRequest => {
                                                return {
                                                    ...prevNewRequest,
                                                    endEntrancePermit: newValue
                                                }
                                            })
                                        }
                                    }
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        {
                            showError &&
                                <Grid item xs={12}>
                                    <Typography variant="body1" color="error">
                                        end date need to be after start date
                                    </Typography>
                                </Grid>
                        }
                        <Grid item xs={9}>
                            <TextField
                                fullWidth
                                disabled={disabled}
                                variant="outlined"
                                label="Request information"
                                multiline
                                rows={4}
                                value={newRequest.information}
                                onChange={
                                    (event: ChangeEvent<HTMLInputElement>) => {
                                        const newValue = event.target.value;
                                        setNewRequest(prevNewRequest => {
                                            return {
                                                ...prevNewRequest,
                                                information: newValue
                                            }
                                        })
                                    }
                                }
                            />
                        </Grid>
                        <Grid item xs={3}>
                            {
                                requestType === requestListType.my ?
                                    <img
                                        onClick={sendRequest}
                                        className={classes.sendImage}
                                        src={SendImage}
                                        alt="sendRequest"
                                    /> :
                                    <Fragment>
                                        {
                                            requestInfo && requestInfo.state === RequestStatus.OPEN &&
                                                <button
                                                    className={classes.confirmReject}
                                                    onClick={
                                                        () => confirmRejectRequest(true)
                                                    }
                                                >
                                                    <div>
                                                        Confirm
                                                    </div>
                                                    <div>
                                                        <img
                                                            src={Confirm}
                                                            alt="Confirm"
                                                        />
                                                    </div>
                                                </button>
                                        }
                                        {
                                            requestInfo && requestInfo.state === RequestStatus.OPEN &&
                                                <button
                                                    className={classes.confirmReject}
                                                    onClick={
                                                        () => confirmRejectRequest(false)
                                                    }
                                                >
                                                    <div>
                                                        Reject
                                                    </div>
                                                    <div>
                                                        <img
                                                            src={Reject}
                                                            alt="Reject"
                                                        />
                                                    </div>
                                                </button>
                                        }
                                    </Fragment>
                            }
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
};

export default AddRequest;