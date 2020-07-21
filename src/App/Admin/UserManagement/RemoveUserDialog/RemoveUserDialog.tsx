import React, {FC} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

export interface RemoveUserDialogProps {
    open: boolean;
    onClose:() => void;
    onDelete:() => void;
    userName: string;
}

const RemoveUserDialog : FC<RemoveUserDialogProps> = ({open, onClose, onDelete, userName}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogContent>
                Are you sure you want to delete {userName}?
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                        onDelete();
                        onClose();
                    }}
                >
                    Delete
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                        onClose();
                    }}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RemoveUserDialog;