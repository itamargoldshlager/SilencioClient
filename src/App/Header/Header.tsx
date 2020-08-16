import React, {FC, useEffect, useState} from 'react';
import SilencioImage from "../utils/Silencio.png";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        display: "inline-block",
        width:  '100%'
    },
    title: {
        verticalAlign: 'middle',
        margin: 'auto',
        marginTop: 10,
        fontSize: 35,
    },
    img: {
        float: "left",
        width: 120,
        height: 99,
    },
    time: {
        float: "right",
    }
});

interface headerProps {
    title: string
}

const Header : FC<headerProps> = ({title}) => {
    const classes = useStyles();
    const [now, setNow] = useState<Date>(new Date());

    useEffect(() => {
        setInterval(() => {
            setNow(new Date());
        }, 1000)
    }, []);

    return (
        <div className={classes.root}>
            <img src={SilencioImage} alt={"img"} className={classes.img}/>
            <div className={classes.time}>
                <h5>{now.toLocaleDateString()}</h5>
                <h5>{now.toLocaleTimeString()}</h5>
            </div>
            <h2 className={classes.title}>{title}</h2>
        </div>
    );
};

export default Header;