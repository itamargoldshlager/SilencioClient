import React, {FC} from 'react';
import Dialog from '@material-ui/core/Dialog';
import RequestImage from "./Request.png"
import {makeStyles} from "@material-ui/core/styles";

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
}

const SuccessDialog : FC<SuccessDialogProps> = ({show, onClose}) => {
    const classes = useStyles();

    return (
        <Dialog
            className={classes.root}
            open={show}
            onClose={onClose}
        >
            <div>
                <h2>
                    Your request is sent . you can see the status in your requsets. <br/>
                    thank you
                </h2>
                <div>
                    <img
                        src={RequestImage}
                        className={classes.img}/>
                </div>
            </div>

        </Dialog>
    );
};

export default SuccessDialog;