import React, {FC, useEffect, useState} from 'react';
import Users from "./Mock/UserMock"
import UserTableRow, {UserRowProps} from './UserTable/UserTableRow';
import {Paper, Table, TableCell, TableContainer, TablePagination, TableRow} from '@material-ui/core';
import UserTableHeader from './UserTable/UserTableHeader';
import {makeStyles} from "@material-ui/core/styles";
import RemoveUserDialog, {RemoveUserDialogProps} from "./RemoveUserDialog/RemoveUserDialog";
import UserTableFilter from "./UserTable/UserTableFilter";
import EditUserDialog, {EditUserDialogProps} from "./EditUserDialog/EditUserDialog";
import {fetchUsers} from "./FetchUsers/FetchUsers";
import {deleteUser} from "./DeleteUser/DeleteUser";
import {userType} from "../../utils/UserType";

const useStyles = makeStyles({
    root: {
        textAlign: 'initial'
    },
});

const UserManagement : FC = () => {
    const [users, setUsers] = useState<UserRowProps[]>([]);

    const removeUserFormList = (username: string): void => {
      setUsers(users.filter(user => user.username !== username));
    };

    useEffect(() => {
        fetchUsers((data) => setUsers(data));
        // createUser({
        //     email: 'itamar@gmail',
        //     password: '1',
        //     personId: '1234',
        //     role: 'MANAGER',
        //     username: 'itagold'
        // })
    }, []);
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
        type: userType.USER,
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
            {
                removeDialogInfo.open && <RemoveUserDialog {...removeDialogInfo}/>
            }
            {
                editDialogInfo.open && <EditUserDialog {...editDialogInfo}/>
            }
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
                        users.map(user =>
                            <UserTableRow
                                {...user}
                                onDelete={() =>
                                    setRemoveDeleteInfo((prevState: RemoveUserDialogProps) => {
                                        return {
                                            ...prevState,
                                            userName: user.username,
                                            open: true,
                                            onDelete: () => deleteUser(user.username , () => removeUserFormList(user.username))
                                        }
                                    })
                                }
                                onEdit={() =>
                                    setEditDialogInfo((prevState: EditUserDialogProps) => {
                                        return {
                                            ...prevState,
                                            userId: user.id ? user.id : '0',
                                            type: user.role,
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