import React, {FC, useEffect, useState} from 'react';
import UserTableRow, {UserRowProps} from './UserTable/UserTableRow';
import {Paper, Table, TableContainer, TablePagination} from '@material-ui/core';
import UserTableHeader from './UserTable/UserTableHeader';
import {makeStyles} from "@material-ui/core/styles";
import RemoveUserDialog, {RemoveUserDialogProps} from "./RemoveUserDialog/RemoveUserDialog";
import UserTableFilter from "./UserTable/UserTableFilter";
import EditUserDialog, {EditUserDialogProps} from "./EditUserDialog/EditUserDialog";
import {fetchUsers} from "./FetchUsers/FetchUsers";
import {deleteUser} from "./DeleteUser/DeleteUser";
import {userType} from "../../utils/UserType";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CreateUser, {CreateUserProps} from "./CreateUser/CreateUser";

const useStyles = makeStyles({
    root: {
        textAlign: 'initial'
    },
    createUserButton: {
        margin: 5,
        background: '#169BD5',
        width: 150,
        fontSize: 18
    },
});

const UserManagement : FC = () => {
    const [filteredUsers, setFilteredUsers] = useState<UserRowProps[]>([]);
    const [users, setUsers] = useState<UserRowProps[]>([]);

    const removeUserFormList = (username: string): void => {
        setUsers(users.filter(user => user.username !== username));
    };

    const addUserToList = (user: UserRowProps) => {
        //[...users, user]
        setUsers(prevState => {
            return [...prevState, user]
        })
    };

    useEffect(() => {
        fetchUsers((data) => setUsers(data));
    }, []);
    const classes = useStyles();

    const [searchBy, setSearchBy] = useState<string>('');

    useEffect(() => {
        setFilteredUsers(users.filter(user => user.username.indexOf(searchBy) !== -1));
    }, [searchBy, users]);

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
        userName: '1',
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


    const [createDialogInfo, setCreateDialogInfo] = useState<CreateUserProps>({
        onClose: () => {},
        open: false,
        onCreate: addUserToList
    });

    useEffect(() => {
        setCreateDialogInfo((prevState: CreateUserProps) => {
            return {
                ...prevState,
                onClose: () => setCreateDialogInfo((prevState1:CreateUserProps) => {
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
    const userToShow = filteredUsers.slice(page * userPerPage, page * userPerPage + userPerPage);

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
            {
                createDialogInfo.open && <CreateUser {...createDialogInfo}/>
            }

            <Grid container>
                <Grid item xs={3}/>
                <Grid item xs={6}>
                    <UserTableFilter
                        searchBy={searchBy}
                        setSearchBy={
                            (value: string) => setSearchBy(value)
                        }
                    />
                </Grid>

                <Grid item xs={3} style={{textAlign: 'center'}}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.createUserButton}
                        onClick={() => {
                            setCreateDialogInfo(prevState => {
                                return {
                                    ...prevState,
                                    open: true,
                                }
                            })
                        }}
                    >
                        Create
                    </Button>
                </Grid>

            </Grid>
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
                                            userName: user.username,
                                            type: user.role,
                                            open: true
                                        }
                                    })
                                }
                            />
                        )
                    }
                </Table>

                <TablePagination
                    rowsPerPageOptions={[userPerPage]}
                    colSpan={3}
                    count={filteredUsers.length}
                    rowsPerPage={userPerPage}
                    page={page}
                    SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                    }}
                    onChangePage={handleChangePage}
                />
            </TableContainer>
        </div>
    );
};

export default UserManagement;