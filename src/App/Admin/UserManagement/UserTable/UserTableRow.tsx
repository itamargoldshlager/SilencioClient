import React, {FC} from 'react';
import Delete from "@material-ui/icons/Delete"
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {makeStyles} from "@material-ui/core/styles";
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles({
    deleteButton: {
        cursor: 'pointer'
    }
});

export interface UserRowProps {
    id: string,
    userName: string,
    email: string,
    groups: string[]
    onDelete?: () => void;
    onEdit?: () => void;
}

const UserTableRow : FC<UserRowProps> = ({id, userName, email, groups, onDelete, onEdit}) => {
    const classes = useStyles();

    return (
        <TableRow style={{height: 62}}>
            <TableCell>
                {
                    id
                }
            </TableCell>
            <TableCell>
                {
                    userName
                }
            </TableCell>
            <TableCell>
                {
                    email
                }
            </TableCell>
            <TableCell>
                {
                    groups.join(',').toString()
                }
            </TableCell>
            <TableCell>
                <Delete
                    className={classes.deleteButton}
                    onClick={onDelete}
                />
                <SettingsIcon
                    className={classes.deleteButton}
                    onClick={onEdit}
                />
            </TableCell>
        </TableRow>
    );
};

export default UserTableRow;