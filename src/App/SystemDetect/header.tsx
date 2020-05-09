import React, {FC, Fragment} from 'react';
import SilencioImage from "../utils/Silencio.png";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        display: "inline-block",
        width: '60%'
    },
    title: {
        width: '30%',
        margin: 'auto',
        marginTop: 10,
    },
    img: {
        float: "left",
        width: 120,
        height: 99,
    },
});

const Header : FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <img src={SilencioImage} alt={"img"} className={classes.img}/>
            <h2 className={classes.title}>System detect</h2>
        </div>
    );
};

export default Header;