import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import {userType} from "../../../utils/UserType";
import {setUserRole, setUserPassword} from "./SendUserUpdate";
import {Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

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
const useStyles = makeStyles({
    password: {
        marginTop: 10
    },
    updatePassButton: {
        margin: 5,
        background: '#169BD5',
        width: 150,
        fontSize: 18
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
});


const EditUserDialog : FC<EditUserDialogProps> = ({open, onClose, type, userName}) => {
    const classes = useStyles();
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showError, setShowError] = useState<boolean>(false);

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

    const updatePassword = () => {
      if (password === confirmPassword) {
          setUserPassword(userName, password);
      } else {
          setShowError(true);
      }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <div className={classes.exitContainer}>
                <button
                    className={classes.exitImage}
                    onClick={onClose}
                >
                    x
                </button>
            </div>
            <Grid container>
                <Grid item xs={6}>
                    <h5>Change user role:</h5>
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
                </Grid>
                <Grid item xs={6}>
                    <h5>
                        update password
                    </h5>
                    <TextField
                        className={classes.password}
                        variant={"outlined"}
                        label="password"
                        type="password"
                        value={password}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setPassword(event.target.value)
                        }}

                    />

                    <TextField
                        className={classes.password}
                        variant={"outlined"}
                        label={"confirm password"}
                        type="password"
                        value={confirmPassword}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setConfirmPassword(event.target.value)
                        }}
                    />

                    {
                        showError &&
                            <Typography variant="body1" color="error">
                                the passwords need to be the same
                            </Typography>
                    }

                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.updatePassButton}
                        onClick={() => {
                            updatePassword();
                        }}
                    >
                        update
                    </Button>
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default EditUserDialog;