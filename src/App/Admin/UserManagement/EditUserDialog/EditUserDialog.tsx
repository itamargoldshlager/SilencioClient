import React, {FC, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import {userType} from "../../../utils/UserType";

export interface EditUserDialogProps {
    open: boolean,
    onClose: () => void;
    userId: string,
    type: string
}

const EditUserDialog : FC<EditUserDialogProps> = ({open, onClose, type}) => {
    const [editUserType, setEditUserType] = useState<{
        user: boolean,
        hr: boolean,
        manager: boolean,
    }>({
        user: type === userType.USER,
        hr: type === userType.HR,
        manager: type === userType.MANAGER
    });

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <Button>
                Reset password
            </Button>
            <div>
                <h3>User</h3>
                <Switch
                    checked={editUserType.user}
                    onChange={() => {
                    }}
                    color="primary"
                />
            </div>
            <div>
                <h3>Manager</h3>
                <Switch
                    checked={editUserType.manager}
                    onChange={() => {
                    }}
                    color="primary"
                />
            </div>
            <div>
                <h3>Human Resource</h3>
                <Switch
                    checked={editUserType.hr}
                    onChange={() => {
                    }}
                    color="primary"
                />
            </div>
        </Dialog>
    );
};

export default EditUserDialog;