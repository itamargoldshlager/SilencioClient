import React, {ChangeEvent, FC, useState} from 'react';
import loginImage from '../utils/Silencio.png'
import Grid from '@material-ui/core/Grid';
import {Button, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        marginTop: 100,
        textAlign: 'center',
    },
    image: {
        width: 355,
        height: 314,
        margin: 5
    },
    loginButton: {
        margin: 5,
    },
    loginInput: {
        margin: 'auto',
        width: 300,
        marginTop: 20,
    }
});


interface LoginPageProps {
    setLoggedIn: (fullName: string) => void
}

const LoginPage : FC<LoginPageProps> = ({setLoggedIn}) => {
    const classes = useStyles();
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const sendLoginRequest = () => {
        setPassword('');
        setLoggedIn('itamar goldshlager');
    };

    return (
        <Grid container className={classes.root}>
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
                    onClick={sendLoginRequest}
                >
                    Login
                </Button>
            </Grid>
            <Grid item xs={3}/>
        </Grid>
    );
};

export default LoginPage;