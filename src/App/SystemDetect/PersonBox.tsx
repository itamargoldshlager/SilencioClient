import React, {FC, Fragment} from 'react';
import { Grid } from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import clsx from 'clsx';

const useStyles = makeStyles({
    img: {
        width: 145,
        height: 160,
        borderStyle: 'solid',
        borderWidth: 5,
    },
    green: {
        borderColor: 'green'
    },
    red :{
        borderColor: 'red'
    }
});

export interface PersonProps {
    name?: string,
    img: any,
    detectDate: Date,
    company?: string,
    approve: boolean,
}

const PersonBox : FC<PersonProps> = ({name, img, detectDate, company, approve}) => {
    const classes = useStyles();
    return (
        <Grid item xs={3}>
            <img src={img}
                 className={
                     clsx(classes.img,{
                         [classes.green]: approve,
                         [classes.red]: !approve
                    })
                 }
             />
            <div> {detectDate.toLocaleDateString()} </div>
            {
                approve &&
                    <Fragment>
                        <div>{name}</div>
                        <div>company: {company}</div>
                    </Fragment>
            }
        </Grid>
    );
};

export default PersonBox;