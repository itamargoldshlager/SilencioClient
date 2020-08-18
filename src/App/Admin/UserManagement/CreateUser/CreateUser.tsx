import React, {ChangeEvent, FC, useState, Fragment} from "react";
import Dialog from "@material-ui/core/Dialog";
import {makeStyles} from "@material-ui/core/styles";
import {Grid, InputLabel} from "@material-ui/core";
import {userType} from "../../../utils/UserType";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import {sendCreateUser} from "./SendCreateUser";
import Typography from "@material-ui/core/Typography";
import CreateUserSuccessDialog from "./CreateUserSuccessDialog";
import {UserRowProps} from "../UserTable/UserTableRow";

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
    title: {
        textAlign: 'center',
    },
    createUser: {
        margin: 'auto',
        background: '#169BD5',
        width: 150,
        fontSize: 18
    },

});

export interface CreateUserProps {
    open: boolean,
    onClose: () => void;
    onCreate: (user: UserRowProps) => void
}

// sendCreateUser({
//     email: 'itamar@gmail',
//     password: '1',
//     personId: '1234',
//     role: 'MANAGER',
//     username: 'itagold'
// })

const CreateUser : FC<CreateUserProps> = ({open, onClose, onCreate}) => {
    const [userDetails, setUserDetails] = useState<UserRowProps>({
        email: '',
        password: '',
        personId: '',
        role: userType.USER,
        username: ''
    });

    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [personIdError, setPersonIdError] = useState<boolean>(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);

    const classes = useStyles();

    const checkDetailsAndCreate = () => {
        if (userDetails.password === confirmPassword) {
            setPasswordError(false);

            sendCreateUser(
                userDetails,
                () => {
                    onCreate(userDetails);
                    setShowSuccessDialog(true);
                }, () => {
                    console.log("Error");
                    setPersonIdError(true);
                }
            );
        } else {
            setPasswordError(true);
        }
    };

    return(
        <Fragment>
            {
                showSuccessDialog && <CreateUserSuccessDialog show={true} onClose={onClose}/>
            }
            <Dialog
                open={open}
                onClose={onClose}
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

                    <h1 className={classes.title}>
                        User Details
                    </h1>

                    <Grid container>
                        <Grid item xs={6}>
                            <TextField
                                 variant="outlined"
                                 fullWidth
                                 value={userDetails.username}
                                 label="username"
                                 onChange={
                                     (event: ChangeEvent<HTMLInputElement>) => {
                                         const newValue = event.target.value;
                                         setUserDetails(prevUserDetails => {
                                             return {
                                                 ...prevUserDetails,
                                                 username: newValue
                                             }
                                         })
                                     }
                                 }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={userDetails.personId}
                                label="person id"
                                onChange={
                                    (event: ChangeEvent<HTMLInputElement>) => {
                                        const newValue = event.target.value;
                                        setUserDetails(prevUserDetails => {
                                            return {
                                                ...prevUserDetails,
                                                personId: newValue
                                            }
                                        })
                                    }
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={userDetails.password}
                                label="password"
                                type="password"
                                onChange={
                                    (event: ChangeEvent<HTMLInputElement>) => {
                                        const newValue = event.target.value;
                                        setUserDetails(prevUserDetails => {
                                            return {
                                                ...prevUserDetails,
                                                password: newValue
                                            }
                                        })
                                    }
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="password"
                                value={confirmPassword}
                                label="confirm password"
                                onChange={
                                    (event: ChangeEvent<HTMLInputElement>) =>
                                        setConfirmPassword(event.target.value)
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={userDetails.email}
                                label="email"
                                onChange={
                                    (event: ChangeEvent<HTMLInputElement>) => {
                                        const newValue = event.target.value;
                                        setUserDetails(prevUserDetails => {
                                            return {
                                                ...prevUserDetails,
                                                email: newValue
                                            }
                                        })
                                    }
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel>Role</InputLabel>
                            <Select

                                fullWidth
                                onChange={
                                    (event: ChangeEvent<any>) => {
                                        const newValue = event.target.value;
                                        setUserDetails(prevUserDetails => {
                                            return {
                                                ...prevUserDetails,
                                                role: newValue
                                            }
                                        })
                                    }
                                }
                            >
                                {
                                    Object.entries(userType).map((value, index) =>
                                        <MenuItem value={value[0]}>
                                            {value[0]}
                                        </MenuItem>
                                    )
                                }
                            </Select>
                        </Grid>
                        <Grid item xs={12} style={{textAlign:'center'}}>
                            {
                                personIdError &&
                                    <Grid item xs={12}>
                                        <Typography variant="body1" color="error">
                                            person id dont exists
                                        </Typography>
                                    </Grid>
                            }
                            {
                                passwordError &&
                                    <Typography variant="body1" color="error">
                                        the passwords need to be the same
                                    </Typography>
                            }

                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.createUser}
                                onClick={() => {
                                    checkDetailsAndCreate()
                                }}
                            >
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
};

export default CreateUser;