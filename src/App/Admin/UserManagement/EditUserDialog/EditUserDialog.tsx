import React, {FC} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

export interface EditUserDialogProps {
    open: boolean,
    onClose: () => void;
    userId: string,
}

const EditUserDialog : FC<EditUserDialogProps> = ({open, onClose}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <Button>
                Reset password
            </Button>
            <div>
                <h3>Manager</h3>
            </div>
            <div>
                Human resource
            </div>
        </Dialog>
    );
};

export default EditUserDialog;