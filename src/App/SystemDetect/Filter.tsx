import React, {ChangeEvent, FC, useState} from 'react';
import {Grid, Select, MenuItem, InputLabel, FormControl, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"

const useStyles = makeStyles({
    root: {
        borderWidth: 1,
        borderRadius: 25,
        width: '60%',
        margin: 'auto',
        borderStyle: 'solid'
    },
    row: {
        width: '98%',
        margin: 'auto'
    },
    formControl: {
        width: '100%',
    },
});

export interface SystemDetectDateFilter {
    begin: Date,
    end: Date,
    filter: boolean
}

export interface indication {
    indication: string
}

interface FilterProps {
    dateFilter: SystemDetectDateFilter
    handleChangeDateFilter: (beginOrEnd: boolean, newDate: Date) => void
    indication: string,
    handleChangeIndication: (indication: string) => void
    personId: string,
    handleChangePersonId: (personId: string) => void
}

const Filter : FC<FilterProps> = ({dateFilter, handleChangeDateFilter, indication, handleChangeIndication, personId, handleChangePersonId}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={2} className={classes.row}>
                <Grid item xs={4}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">permission</InputLabel>
                        <Select
                            value={indication}
                            fullWidth
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={
                                (event: any) =>
                                    handleChangeIndication(event.target.value)
                            }
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value='GREEN'>Allow</MenuItem>
                            <MenuItem value='RED'>Deny</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker
                            inputVariant="outlined"
                            format="dd/MM/yyyy mm:HH"
                            label="Start Date"
                            value={dateFilter.begin}
                            onChange={(data: any) => handleChangeDateFilter(true,  data)}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={4}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker
                            inputVariant="outlined"
                            format="dd/MM/yyyy mm:HH"
                            label="End Date"
                            value={dateFilter.end}
                            onChange={(data: any) => handleChangeDateFilter(false,  data)}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
            </Grid>
            <Grid container spacing={2} className={classes.row}>
                {/*New Line*/}
                <Grid item xs={4}/>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Person id"
                        value={personId}
                        onChange={(
                            event: ChangeEvent<HTMLInputElement>) =>
                                handleChangePersonId(event.target.value)
                        }
                    />
                </Grid>
                <Grid item xs={4}/>
            </Grid>
        </div>
    );
};

export default Filter;