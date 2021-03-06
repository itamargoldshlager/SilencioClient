import React, {ChangeEvent, FC} from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        width: '100%'
    },

    textField: {
        margin: 'auto',
        marginTop: 10
    }
});

interface UserTableFilterProps {
    searchBy: string,
    setSearchBy: (arg: string) => void;
}

const UserTableFilter : FC<UserTableFilterProps> = ({searchBy, setSearchBy}) => {
    const classes = useStyles();

    return (
        <div
            className={classes.root}
        >
            <div className={classes.textField}>
                <TextField
                    variant="outlined"
                    label="Search by user name"
                    fullWidth
                    value={searchBy}
                    onChange={
                        (event: ChangeEvent<HTMLInputElement>) =>
                            setSearchBy(event.target.value)
                    }
                />
            </div>
        </div>
    );
};

export default UserTableFilter;