import React, {FC, useEffect, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import {userType} from "../../../utils/UserType";
import {setUserRole} from "./SendUserUpdate";

export interface EditUserDialogProps {
    open: boolean,
    onClose: () => void;
    userName: string,
    type: string
}
interface options {
    user: boolean,
    hr: boolean,
    manager: boolean,

}
const EditUserDialog : FC<EditUserDialogProps> = ({open, onClose, type, userName}) => {
    const [editUserType, setEditUserType] = useState<options>({
        user: false,
        hr: false,
        manager: false
    });

    useEffect(() => {
        if(open) {
            setEditUserType({
                user: type === userType.USER,
                hr: type === userType.HR,
                manager: type === userType.MANAGER
            })
        }

    }, [open, type]);

    const sendUpdateToServer = (newOption: options) => {
        let role = '';
        if (newOption.user) {
            role = userType.USER;
        } else if (newOption.hr) {
            role = userType.HR
        } else {
            role = userType.MANAGER;
        }

        setUserRole(userName, role);
    };

    const changeUserRole = (newType: userType) => {
        let newOption = {
            ...editUserType
        };

        switch (newType) {
            case userType.HR:
                newOption.user = false;
                newOption.hr = !newOption.hr;
                newOption.manager = false;
            break;
            case userType.MANAGER:
                newOption.user = false;
                newOption.hr = false;
                newOption.manager = !newOption.manager;
            break;
            case userType.USER:
                newOption.user = !newOption.user;
                newOption.hr = false;
                newOption.manager = false;
            break;
        }

        if (!newOption.user && !newOption.manager && !newOption.hr) {
            newOption.user = true;
        }

        sendUpdateToServer(newOption);
        setEditUserType(newOption);
    };

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
                        changeUserRole(userType.USER);
                    }}
                    color="primary"
                />
            </div>
            <div>
                <h3>Manager</h3>
                <Switch
                    checked={editUserType.manager}
                    onChange={() => {
                        changeUserRole(userType.MANAGER);
                    }}
                    color="primary"
                />
            </div>
            <div>
                <h3>Human Resource</h3>
                <Switch
                    checked={editUserType.hr}
                    onChange={() => {
                        changeUserRole(userType.HR);
                    }}
                    color="primary"
                />
            </div>
        </Dialog>
    );
};

export default EditUserDialog;