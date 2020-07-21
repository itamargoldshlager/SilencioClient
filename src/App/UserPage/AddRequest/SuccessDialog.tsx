import React, {FC} from 'react';
import Dialog from '@material-ui/core/Dialog';
import RequestImage from "./Request.png"
import {makeStyles} from "@material-ui/core/styles";
import {requestListType} from "../../RequestList/RequestList";

const useStyles = makeStyles({
    root: {
        textAlign: 'center',
    },
    img: {
        float: 'right'
    }
});

interface SuccessDialogProps {
    show: boolean,
    onClose: () => void,
    requestType: requestListType
}

const SuccessDialog : FC<SuccessDialogProps> = ({show, onClose, requestType}) => {
    const classes = useStyles();

    return (
        <Dialog
            className={classes.root}
            open={show}
            onClose={onClose}
        >
            <div>
                {
                    requestType === requestListType.my ?
                        <h2>
                            Your request is sent. you can see the status in your requsets. <br/>
                            thank you
                        </h2> :
                        <h2>
                            Your response to this request sent.
                        </h2>
                }

                <div>
                    <img
                        src={RequestImage}
                        className={classes.img}
                        alt="Request"
                    />
                </div>
            </div>

        </Dialog>
    );
};

export default SuccessDialog;