import React, {FC, useState} from 'react';
import {Grid, Select, MenuItem, InputLabel, FormControl, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {KeyboardDateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
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

const Filter : FC = () => {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date: any) => {
        setSelectedDate(date);
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={2} className={classes.row}>
                <Grid item xs={4}>
                    <TextField
                        label=""
                        variant={"outlined"}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">permission</InputLabel>
                        <Select
                            fullWidth
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Allow</MenuItem>
                            <MenuItem value={20}>Deny</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Company</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={2} className={classes.row}>
                {/*New Line*/}
                <Grid item xs={3}/>
                <Grid item xs={3}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDateTimePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy mm:HH"
                            margin="normal"
                            id="date-picker-inline"
                            label="EndDate"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={3}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDateTimePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy mm:HH"
                            margin="normal"
                            id="date-picker-inline"
                            label="Start Date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
            </Grid>
        </div>
    );
};

export default Filter;