import React, {FC, Fragment, useState} from 'react';
import LoginPage from './Login/Login';
import {Grid} from '@material-ui/core';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import {makeStyles} from "@material-ui/core/styles";
import UserPage from "./UserPage/UserPage";
import {userType} from "./utils/UserType"
import SystemDetect from "./SystemDetect/SystemDetect";

const useStyles = makeStyles({
    root: {
        height: '100%'
    },
    header: {
        height: '10%'
    },
    body: {
        width: '80%',
        margin: 'auto',
        border: '1px black solid',
        borderRadius: 5,
        backgroundColor: '#F2F2F2',
        height: '80%',
        textAlign: 'center'
    },
});

const Silencio : FC = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [userFullName, setUserFullName] = useState<string>('');
    const [headerContent, setHeaderContent] = useState<string>('Welcome, Itamar');
    const [loggedInUserType, setUserType] = useState<userType>(userType.manager);

    const {root, header, body} = useStyles();
    return (
        <Grid className={root}>
            <div className={header}/>
            <Grid item className={body}>
            {
                loggedIn ?
                    <Fragment>
                        <Header title={headerContent}/>
                        {
                            loggedInUserType === userType.security ?
                                <SystemDetect/> :
                                <UserPage loggedInUserType={loggedInUserType}/>
                        }
                        <Footer/>
                    </Fragment> :
                    <LoginPage setLoggedIn={(fullName: string) => {
                        setLoggedIn(true);
                        setUserFullName(fullName);
                    }}/>
            }
            </Grid>
        </Grid>
    );
};

export default Silencio;