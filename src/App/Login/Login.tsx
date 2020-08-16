import React, {ChangeEvent, FC, useState} from 'react';
import loginImage from '../utils/Login.png'
import Grid from '@material-ui/core/Grid';
import {Button, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {sendLoginRequest, loginResponse} from "./SendLoginRequest"
import {userType} from "../utils/UserType";
import Typography from "@material-ui/core/Typography";
import {userInfoProps} from "../Silencio";

const useStyles = makeStyles({
    root: {
        marginTop: 80,
        textAlign: 'center',
    },
    image: {
        width: 355,
        height: 314,
        margin: 5
    },
    loginButton: {
        margin: 5,
        background: '#169BD5',
        width: 150,
        fontSize: 28
    },
    loginInput: {
        margin: 'auto',
        width: 300,
        marginTop: 20,
    },
    title: {
        backgroundColor: '#3f5365',
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: 'solid'
    }
});


interface LoginPageProps {
    setLoggedIn: (args: userInfoProps) => void
}

const LoginPage : FC<LoginPageProps> = ({setLoggedIn}) => {
    const classes = useStyles();
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showError, setShowError] = useState<boolean>(false);
    const handleLoginRequestResult = (result: loginResponse) => {

        console.log(result);
        if (result.role === 'UNAUTHORIZED') {
            setPassword('');
            setShowError(true);
        } else {
            setLoggedIn({
                userId: result.personId,
                userType: result.role as userType,
                loggedIn: true,
                userName
            });
        }
    };

    // @ts-ignore
    return (
        <Grid container className={classes.root} spacing={5}>
            <Grid item xs={3}/>
            <Grid item xs={6} className={classes.title}>
                <h1> Welcome To Silencio </h1>
            </Grid>
            <Grid item xs={3}/>
            <Grid item xs={3}/>
            <Grid item xs={6}>
                <img src={loginImage}
                     alt="Login"
                     className={classes.image}
                />

                <div className={classes.loginInput}>
                    <TextField
                        label="user name"
                        variant={"outlined"}
                        fullWidth
                        value={userName}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setUserName(event.target.value);
                        }}
                    />
                </div>

                <div className={classes.loginInput}>
                    <TextField
                        label="password"
                        variant={"outlined"}
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setPassword(event.target.value);
                        }}
                    />
                </div>

                {
                    showError &&
                    <Typography variant="body1" color="error">
                        username or password are incorrect
                    </Typography>
                }

                <Button
                    variant="contained"
                    color="primary"
                    className={classes.loginButton}
                    onClick={() =>
                        sendLoginRequest(userName, password, handleLoginRequestResult)
                    }
                >
                    Login
                </Button>
            </Grid>
            <Grid item xs={3}/>
        </Grid>
    );
};

export default LoginPage;