import React, {FC, useEffect, useState} from 'react';
import {Paper, Table, TableContainer, TablePagination} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import MyRequestListHeader from "./MyRequestList/MyRequestListHeader";
import MyRequestListRow from "./MyRequestList/MyRequestListRow";
import ManagerRequestListHeader from "./ManagerRequestList/ManagerRequestListHeader";
import ManagerRequestListRow from "./ManagerRequestList/ManagerRequestListRow";
import ExitImage from "../utils/exit.png";
import {fetchManagerRequests, fetchMyRequests} from "./FetchReqeusts/FetchReqeusts";
import {RequestRow} from "./RequestInterface/RequestInterface";
import RequestListFilter from "./Filter/RequestListFilter";

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
    onClose?:() => void
    onClick?: (requestId: string, personId: string, requestInfo: RequestRow) => void;
    userId: string
}

const RequestList : FC<requestListProps> = ({listType, onClose, onClick, userId}) => {
    const classes = useStyles();

    const [searchBy, setSearchBy] = useState<string>('');
    const [filteredRequests, setFilteredRequests] = useState<RequestRow[]>([]);

    const requestPerPage = 4;
    const [page, setPage] = useState(0);
    const [requests, setRequests] = useState<RequestRow[]>([]);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    useEffect(() => {
        const callback = (request: RequestRow) => {
            setRequests((prevState: RequestRow[]) => {
                return [...prevState, request]
            })
        };

        if (listType === requestListType.my)
            fetchMyRequests(
                userId,
                callback
            );
        else
            fetchManagerRequests(callback)
    }, [listType, userId]);

    useEffect(() => {
        const filtered = requests.filter(request => request.id.indexOf(searchBy) !== -1);
        filtered.sort((a: RequestRow,b: RequestRow) => b.timestamp.getTime() - a.timestamp.getTime());
        setFilteredRequests(filtered);
    }, [searchBy, requests]);

    const requestToShow = filteredRequests.slice(page * requestPerPage, page * requestPerPage + requestPerPage);

    // @ts-ignore
    return (
        <div className={classes.root}>
            {
                onClose &&
                    <img
                        className={classes.exitImage}
                        src={ExitImage}
                        onClick={onClose}
                        alt="ExitImage"
                    />
            }

            <RequestListFilter searchBy={searchBy} setSearchBy={setSearchBy}/>

            <TableContainer component={Paper}>
                <Table>
                    {
                        listType === requestListType.my ?
                            <MyRequestListHeader/> :
                            <ManagerRequestListHeader/>
                    }
                    {
                        requestToShow.map((request: any, index: any) =>
                            listType === requestListType.my ?
                                <MyRequestListRow {...request}/> :
                                <ManagerRequestListRow {...request}
                                    onClick={
                                        onClick ?
                                            () => onClick(`${request.id}`, request.personId, request) :
                                            () => {}
                                    }
                                />
                        )
                    }
                </Table>

                <TablePagination
                    rowsPerPageOptions={[requestPerPage]}
                    colSpan={3}
                    count={filteredRequests.length}
                    rowsPerPage={requestPerPage}
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

export default RequestList;