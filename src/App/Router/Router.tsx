import React, {FC, useState} from 'react';
import LoginPage from "../Login/Login";
import { Grid } from '@material-ui/core';

const Router : FC = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    return (
        <div>
            {
                loggedIn ?
                    <LoginPage setLoggedIn={() => setLoggedIn(true)}/> :
                    <Grid container>
                        <Grid item xs={3}>
                            Side bar
                        </Grid>
                        <Grid item xs={9}>
                            Content
                        </Grid>
                    </Grid>
            }
        </div>
    );
};

export default Router;