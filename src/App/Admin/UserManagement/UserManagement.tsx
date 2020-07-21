import React, {FC, useEffect, useState} from 'react';
import Users from "./Mock/UserMock"
import UserTableRow from './UserTable/UserTableRow';
import {Table, TablePagination, TableCell, TableRow, TableContainer, Paper} from '@material-ui/core';
import UserTableHeader from './UserTable/UserTableHeader';
import {makeStyles} from "@material-ui/core/styles";
import RemoveUserDialog, { RemoveUserDialogProps } from "./RemoveUserDialog/RemoveUserDialog";
import UserTableFilter from "./UserTable/UserTableFilter";
import EditUserDialog, { EditUserDialogProps } from "./EditUserDialog/EditUserDialog";

const useStyles = makeStyles({
    root: {
        textAlign: 'initial'
    },
});

const deleteUser = (userId: string) => {

};

const UserManagement : FC = () => {
    const classes = useStyles();

    const [searchBy, setSearchBy] = useState<string>('');

    const [removeDialogInfo, setRemoveDeleteInfo] = useState<RemoveUserDialogProps>({
        onClose: () => {},
        onDelete: () => {},
        userName: "",
        open: false
    });

    useEffect(() => {
        setRemoveDeleteInfo((prevState: RemoveUserDialogProps) => {
            return {
                ...prevState,
                onClose: () => setRemoveDeleteInfo((prevState1: RemoveUserDialogProps) =>
                {
                    return {
                        ...prevState1,
                        open: false
                    }
                }),
            }
        })
    }, []);

    const [editDialogInfo, setEditDialogInfo] = useState<EditUserDialogProps>({
        onClose: () => {},
        open: false,
        userId: '1',
    });

    useEffect(() => {
        setEditDialogInfo((prevState: EditUserDialogProps) => {
            return {
                ...prevState,
                onClose: () => setEditDialogInfo((prevState1:EditUserDialogProps) => {
                    return {
                        ...prevState1,
                        open: false,
                    }
                })
            }
        })
    }, []);

    const userPerPage = 5;
    const [page, setPage] = useState(0);
    const userToShow = Users.slice(page * userPerPage, page * userPerPage + userPerPage);
    const emptyRows = userPerPage - Math.min(userPerPage, Users.length - page * userPerPage);
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    return (
        <div className={classes.root}>
            <RemoveUserDialog {...removeDialogInfo}/>
            <EditUserDialog {...editDialogInfo}/>
            <UserTableFilter
                searchBy={searchBy}
                setSearchBy={
                    (value: string) => setSearchBy(value)
                }
            />
            <TableContainer component={Paper}>
                <Table>
                    <UserTableHeader/>
                    {
                        userToShow.map(user =>
                            <UserTableRow
                                {...user}
                                onDelete={() =>
                                    setRemoveDeleteInfo((prevState: RemoveUserDialogProps) => {
                                        return {
                                            ...prevState,
                                            userName: user.userName,
                                            open: true,
                                            onDelete: () => deleteUser(user.id)
                                        }
                                    })
                                }
                                onEdit={() =>
                                    setEditDialogInfo((prevState: EditUserDialogProps) => {
                                        return {
                                            ...prevState,
                                            userId: user.id,
                                            open: true
                                        }
                                    })
                                }
                            />
                        )
                    }

                    {
                        emptyRows > 0 && (
                            <TableRow style={{ height: 62 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )
                    }
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[userPerPage]}
                colSpan={3}
                count={Users.length}
                rowsPerPage={userPerPage}
                page={page}
                SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                }}
                onChangePage={handleChangePage}
            />
        </div>
    );
};

export default UserManagement;