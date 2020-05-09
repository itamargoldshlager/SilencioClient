import React, {FC} from 'react';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    footer: {
        backgroundColor: "#F8F8F8",
        borderTop: "1px solid #E7E7E7",
        textAlign: "center",
        padding: "20px",
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "60px",
        width: "100%",
    },
});

const Footer : FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.footer}>
            <span>
                @Silencio
            </span>
        </div>
    );
};

export default Footer;