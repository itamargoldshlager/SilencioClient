import React, {FC, Fragment, useState} from 'react';
import LoginPage from './Login/Login';
import {Grid} from '@material-ui/core';
import Header from "./Header/Header";
import {makeStyles} from "@material-ui/core/styles";
import UserPage from "./UserPage/UserPage";
import {userType} from "./utils/UserType"
import SystemDetect from "./SystemDetect/SystemDetect";

const useStyles = makeStyles({
    root: {
        height: '100%',
        padding: '0 0 0 0',
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

export interface userInfoProps {
    loggedIn: boolean,
    userId: string,
    userType: userType,
    userName: string,
}

const Silencio : FC = () => {
    const [userInfo, setUserInfo] = useState<userInfoProps>({
        userId: '',
        loggedIn: false,
        userType: userType.USER,
        userName: ''
    });

    const {root, header, body} = useStyles();
    return (
        <Grid className={root}>
            <div className={header}/>
            <Grid item className={body}>
            {
                userInfo.loggedIn ?
                    <Fragment>
                        <Header title={`Welcome, ${userInfo.userName}`}/>
                        {
                            userInfo.userType === userType.SECURITY ?
                                <SystemDetect/> :
                                <UserPage
                                    loggedInUserType={userInfo.userType}
                                    userId={userInfo.userId}
                                />
                        }
                        {/*<Footer/>*/}
                    </Fragment> :
                    <LoginPage
                        setLoggedIn={(args: userInfoProps) => {
                            setUserInfo(args);
                        }}
                    />
            }
            </Grid>
        </Grid>
    );
};

export default Silencio;