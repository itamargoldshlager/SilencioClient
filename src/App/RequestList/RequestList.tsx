import React, {FC, useEffect, useState} from 'react';
import RequestMock from "./Mock/RequestListMock"
import {TablePagination, Table} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import MyRequestListHeader from "./MyRequestList/MyRequestListHeader";
import MyRequestListRow from "./MyRequestList/MyRequestListRow";
import ManagerRequestListHeader from "./ManagerRequestList/ManagerRequestListHeader";
import ManagerRequestListRow from "./ManagerRequestList/ManagerRequestListRow";
import ExitImage from "../utils/exit.png";
import AddRequest, {request, initialState} from "../UserPage/AddRequest/AddRequest"

const useStyles = makeStyles({
    root: {
        '& .MuiTableCell-root': {
            textAlign: 'center'
        },
        textAlign: 'initial'
    },
    exitImage: {
        position: 'relative',
        top: 0,
        left: 5,
    },
});

export enum requestListType {
    manager,
    my
}

interface requestListProps {
    listType: requestListType
    onClose:() => void
}

const RequestList : FC<requestListProps> = ({listType, onClose}) => {
    const classes = useStyles();
    const [showRequestDialog, setShowRequestDialog] = useState<boolean>(false);
    const [requestIdToShowInDialog, setRequestIdToShowInDialog] = useState<string>('');
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
            <AddRequest
                show = {showRequestDialog}
                onClose = {() => setShowRequestDialog(false)}
                requestType = {requestListType.manager}
                requestId = {requestIdToShowInDialog}
            />
            <img
                className={classes.exitImage}
                src={ExitImage}
                onClick={onClose}
            />
            <Table>
                {
                    listType === requestListType.my ?
                        <MyRequestListHeader/> :
                        <ManagerRequestListHeader/>
                }
                {
                    requestToShow.map((request, index) =>
                        listType === requestListType.my ?
                            <MyRequestListRow {...request}/> :
                            <ManagerRequestListRow {...request}
                                onClick={() => {
                                    setRequestIdToShowInDialog(request.requestId);
                                    setShowRequestDialog(true);
                                }}
                            />
                    )
                }
            </Table>

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