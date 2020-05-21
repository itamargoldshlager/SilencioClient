import React, {FC} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import DetailsImage from "./Icons/Details.png"
import AddRequestImage from "./Icons/AddRequest.png"
import RequestListImage from "./Icons/RequestList.png"

import Grid from '@material-ui/core/Grid';
import {Button} from "@material-ui/core";
import Header from "../Header/Header";

const useStyles = makeStyles({
    root: {
        marginTop: '5%',
        width: '60%',
        margin: 'auto'
    },
    header: {
        display: "inline-block",
        width: '100%',
        marginBottom: 100,
    },
    title: {
        verticalAlign: 'middle',
        margin: 'auto',
        marginTop: 10,
        fontSize: 40,
    },
    headerImage: {
        float: "left",
        width: 120,
        height: 99,
    },
    options: {
        marginTop: 40,
    },
    optionImage: {
        width: 215,
        height: 230,
    },
    optionButton: {
        textTransform: 'none',
        width: 178,
        marginTop: 10,
        paddingTop: 10,
        radius: 5,
        backgroundColor: '#169bd5',
        fontSize: 20
    }
});

interface UserPageProps{
    name: string,
}

const UserPage : FC<UserPageProps> = ({name}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Header title={`Hi, ${name}`}/>
            <Grid container spacing={4} className={classes.options}>
                <Grid item xs={4} justify={"center"}>
                    <div>
                        <img
                            className={classes.optionImage}
                            src={DetailsImage}
                        />
                    </div>
                    <Button
                        className={classes.optionButton}
                        color="primary"
                        variant="contained"
                    >
                        My details
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <div>
                        <img
                            className={classes.optionImage}
                            src={AddRequestImage}
                        />
                    </div>
                    <Button
                        className={classes.optionButton}
                        color="primary"
                        variant="contained"
                    >
                        Add request
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <div>
                        <img
                            className={classes.optionImage}
                            src={RequestListImage}
                        />
                    </div>
                    <Button
                        className={classes.optionButton}
                        color="primary"
                        variant="contained"
                    >
                        My requests
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default UserPage;