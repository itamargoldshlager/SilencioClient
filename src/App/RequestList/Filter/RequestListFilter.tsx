import React, {ChangeEvent, FC} from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        width: '100%'
    },

    textField: {
        width: '50%',
        margin: 'auto',
        marginTop: 10
    }
});

interface RequestListFilterProps {
    searchBy: string,
    setSearchBy: (arg: string) => void;
}

const RequestListFilter : FC<RequestListFilterProps> = ({searchBy, setSearchBy}) => {
    const classes = useStyles();

    return (
        <div
            className={classes.root}
        >
            <div className={classes.textField}>
                <TextField
                    variant="outlined"
                    label="Search by request id"
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

export default RequestListFilter;