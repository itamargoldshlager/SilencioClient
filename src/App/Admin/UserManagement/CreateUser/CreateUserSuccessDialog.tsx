import React, {FC} from 'react';
import Dialog from '@material-ui/core/Dialog';
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

const CreateUserSuccessDialog : FC<SuccessDialogProps> = ({show, onClose}) => {
    const classes = useStyles();

    return (
        <Dialog
            className={classes.root}
            open={show}
            onClose={onClose}
        >
            <div>
                <h2>
                    The user creation success <br/>
                    The user can login now to the system
                </h2>
            </div>
        </Dialog>
    );
};

export default CreateUserSuccessDialog;