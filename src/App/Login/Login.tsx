import React, {ChangeEvent, FC, useState} from 'react';
import loginImage from '../utils/Login.png'
import Grid from '@material-ui/core/Grid';
import {Button, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {sendLoginRequest, loginResponse} from "./SendLoginRequest"
import {userType} from "../utils/UserType";

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
    setLoggedIn: (fullName: string, userId: string) => void
    setLoggedInType: (type: userType) => void
}

const LoginPage : FC<LoginPageProps> = ({setLoggedIn, setLoggedInType}) => {
    const classes = useStyles();
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLoginRequestResult = (result: loginResponse) => {
        console.log(result);
        if (result.role === 'UNAUTHORIZED') {
            window.alert("no!!!");
            setPassword('');
        } else {
            setLoggedInType(result.role as userType);
            setLoggedIn(userName, result.personId);
        }
    };

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