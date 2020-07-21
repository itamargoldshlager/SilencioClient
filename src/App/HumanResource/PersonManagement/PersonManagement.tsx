import React, {FC, useState} from 'react';
import Persons from "./PersonTable/Mock/Mock"
import PersonTableHeader from "./PersonTable/PersonTableHeader";
import PersonTableRow from "./PersonTable/PersonTableRow";
import Table from '@material-ui/core/Table';
import {makeStyles} from "@material-ui/core/styles";
import {TablePagination} from "@material-ui/core";
import UserDetails from "../../UserDetails/UserDetails"

const useStyles = makeStyles({
    root: {
        '& .MuiTableCell-root': {
            textAlign: 'center'
        },
    }
});

const PersonManagement : FC = () => {
    const classes = useStyles();

    const [userDetails, setUserDetails] = useState<{
        open: boolean,
        id: string,
    }>({
        open: false,
        id: '0'
    });

    const personPerPage = 4;
    const [page, setPage] = useState(0);
    const requestToShow = Persons.slice(page * personPerPage, page * personPerPage + personPerPage);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
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
                                    id: person.id
                                })
                            }
                        />
                    )
                }

            </Table>

            <TablePagination
                rowsPerPageOptions={[personPerPage]}
                colSpan={3}
                count={Persons.length}
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