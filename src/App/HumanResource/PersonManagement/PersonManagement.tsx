import React, {FC, useEffect, useState} from 'react';
import PersonTableHeader from "./PersonTable/PersonTableHeader";
import PersonTableRow from "./PersonTable/PersonTableRow";
import Table from '@material-ui/core/Table';
import {makeStyles} from "@material-ui/core/styles";
import {TablePagination} from "@material-ui/core";
import UserDetails from "../../UserDetails/UserDetails"
import {fetchPersons} from "./FetchPersons";
import {PersonProps} from "./PersonTable/PersonTableRow";

const useStyles = makeStyles({
    root: {
        '& .MuiTableCell-root': {
            textAlign: 'center'
        },
    }
});

const PersonManagement : FC = () => {
    const classes = useStyles();
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
    const requestToShow = persons.slice(page * personPerPage, page * personPerPage + personPerPage);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    useEffect(() =>
        fetchPersons(value => {
            setPersons(value);
        })
    , []);

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
            />
            <Table className={classes.root}>
                <PersonTableHeader/>
                {
                    requestToShow.map(person =>
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
                count={persons.length}
                rowsPerPage={personPerPage}
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

export default PersonManagement;