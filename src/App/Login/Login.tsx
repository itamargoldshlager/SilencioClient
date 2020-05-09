import React, {FC} from 'react';
import loginImage from '../utils/Silencio.png'
import Grid from '@material-ui/core/Grid';
import {Button, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        marginTop: 100,
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
        marginTop: 5,
    }
});

const LoginPage : FC = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid item xs={3}/>
            <Grid item xs={6}>
                <img src={loginImage}
                     alt="Login image"
                     className={classes.image}
                />
                <div className={classes.loginInput}>
                    <TextField
                        label="user name"
                        variant={"outlined"}
                        fullWidth
                    />
                </div>

                <div className={classes.loginInput}>
                    <TextField
                        label="password"
                        variant={"outlined"}
                        type="password"
                        fullWidth
                    />
                </div>

                <Button
                    variant="contained"
                    color="primary"
                    className={classes.loginButton}
                >
                    Login
                </Button>
            </Grid>
            <Grid item xs={3}/>
        </Grid>
    );
};

export default LoginPage;