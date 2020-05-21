import React, {FC, useEffect, useState} from 'react';
import RequestRow from "./RequestRow";
import RequestMock from "./Mock/RequestListMock"
import {TablePagination} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        width: '70%',
        margin: 'auto'
    }
});

const RequestList : FC = () => {
    const classes = useStyles();
    const requestPerPage = 4;
    const [page, setPage] = useState(0);
    const requestToShow = RequestMock.slice(page * requestPerPage, page * requestPerPage + requestPerPage);
    let emptyRows = requestPerPage - Math.min(requestPerPage, RequestMock.length - page * requestPerPage);

    useEffect(() => {
        emptyRows = requestPerPage - Math.min(requestPerPage, RequestMock.length - page * requestPerPage);
    }, [page]);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };
    return (
        <div className={classes.root}>
            {
                requestToShow.map((request, index) =>
                    <RequestRow {...request}/>
                )
            }

            <TablePagination
                rowsPerPageOptions={[requestPerPage]}
                colSpan={3}
                count={RequestMock.length}
                rowsPerPage={requestPerPage}
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

export default RequestList;