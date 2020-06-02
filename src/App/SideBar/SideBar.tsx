import React, {FC} from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        backgroundColor: '#0603ff',
        height: '100%'
    },
    sideBarOption: {
        width: '60%',
        margin: 'auto',
    }
});

interface SideBarProps {
    logOut: () => void
}

const SideBar : FC<SideBarProps> = ({logOut}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Button
                onClick={logOut}
            >
                Log Out
            </Button>
        </div>
    );
};

export default SideBar;