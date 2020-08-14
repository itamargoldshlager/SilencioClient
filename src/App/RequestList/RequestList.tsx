import React, {FC, useEffect, useState} from 'react';
import RequestMock from "./Mock/RequestListMock"
import {Table, TablePagination} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import MyRequestListHeader from "./MyRequestList/MyRequestListHeader";
import MyRequestListRow from "./MyRequestList/MyRequestListRow";
import ManagerRequestListHeader from "./ManagerRequestList/ManagerRequestListHeader";
import ManagerRequestListRow from "./ManagerRequestList/ManagerRequestListRow";
import ExitImage from "../utils/exit.png";
import {fetchManagerRequests, fetchMyRequests} from "./FetchReqeusts/FetchReqeusts";
import {RequestRow, RequestStatus} from "./RequestInterface/RequestInterface";

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
    const requestPerPage = 4;
    const [page, setPage] = useState(0);
    const [requests, setRequests] = useState<RequestRow[]>([]);
    // const requestToShow = requests.slice(page * requestPerPage, page * requestPerPage + requestPerPage);

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
    }, [listType]);

    // @ts-ignore
    return (
        <div className={classes.root}>
            {
                onClose &&
                    <img
                        className={classes.exitImage}
                        src={ExitImage}
                        onClick={onClose}
                    />
            }
            <Table>
                {
                    listType === requestListType.my ?
                        <MyRequestListHeader/> :
                        <ManagerRequestListHeader/>
                }
                {
                    requests.map((request: any, index: any) =>
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