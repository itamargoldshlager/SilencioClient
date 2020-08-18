import React, {FC, useEffect, useState} from 'react';
import PersonTableHeader from "./PersonTable/PersonTableHeader";
import PersonTableRow from "./PersonTable/PersonTableRow";
import Table from '@material-ui/core/Table';
import {makeStyles} from "@material-ui/core/styles";
import {Paper, TableContainer, TablePagination} from "@material-ui/core";
import UserDetails from "../../UserDetails/UserDetails"
import {fetchPersons} from "./FetchPersons";
import {PersonProps} from "./PersonTable/PersonTableRow";
import PersonTableFilter from "./PersonTable/PersonTableFilter";
import {DeletePerson} from "./DeletePerson";

const useStyles = makeStyles({
    root: {
        '& .MuiTableCell-root': {
            textAlign: 'center'
        },
    }
});

const PersonManagement : FC = () => {
    const classes = useStyles();
    const [searchBy, setSearchBy] = useState<string>('');
    const [filteredPersons, setFilteredPersons] = useState<PersonProps[]>([]);

    const [persons, setPersons] = useState<PersonProps[]>([]);

    const [userDetails, setUserDetails] = useState<{
        open: boolean,
        id: string,
    }>({
        open: false,
        id: '0'
    });

    const personPerPage = 4;
    const [page, setPage] = useState(0);
    const personsToShow = filteredPersons.slice(page * personPerPage, page * personPerPage + personPerPage);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    useEffect(() =>
        fetchPersons(value => {
            setPersons(value);
        })
    , []);

    useEffect(() => {
        setFilteredPersons(persons.filter(person => person.personId.indexOf(searchBy) !== -1));
    }, [searchBy, persons]);

    const deletePersonFromList = (personId: string) => {
        setPersons(persons.filter(person => person.personId !== personId))
    };

    return (
        <div>
            <UserDetails
                {...userDetails}
                onClose={() =>
                    setUserDetails({
                        id: '0',
                        open: false,
                    })
                }
                HR={true}
                onDelete = {
                    (onClose: () => void) => {
                        deletePersonFromList(userDetails.id);
                        DeletePerson(userDetails.id, onClose);
                    }
                }
            />

            <PersonTableFilter searchBy={searchBy} setSearchBy={setSearchBy}/>

            <TableContainer component={Paper}>
                <Table className={classes.root}>
                    <PersonTableHeader/>
                    {
                        personsToShow.map(person =>
                            <PersonTableRow
                                {...person}
                                onClick={() =>
                                    setUserDetails({
                                        open: true,
                                        id: person.personId
                                    })
                                }
                            />
                        )
                    }

                </Table>
                <TablePagination
                    rowsPerPageOptions={[personPerPage]}
                    colSpan={3}
                    count={filteredPersons.length}
                    rowsPerPage={personPerPage}
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

export default PersonManagement;