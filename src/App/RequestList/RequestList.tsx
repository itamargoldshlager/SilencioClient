import React, {FC, useEffect, useState} from 'react';
import RequestMock from "./Mock/RequestListMock"
import {TablePagination, Table} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import MyRequestListHeader from "./MyRequestList/MyRequestListHeader";
import MyRequestListRow from "./MyRequestList/MyRequestListRow";
import ManagerRequestListHeader from "./ManagerRequestList/ManagerRequestListHeader";
import ManagerRequestListRow from "./ManagerRequestList/ManagerRequestListRow";
import ExitImage from "../utils/exit.png";

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
    onClick?: (requestId: string) => void;
}

const RequestList : FC<requestListProps> = ({listType, onClose, onClick}) => {
    const classes = useStyles();
    const requestPerPage = 4;
    const [page, setPage] = useState(0);
    const requestToShow = RequestMock.slice(page * requestPerPage, page * requestPerPage + requestPerPage);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

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
                    requestToShow.map((request, index) =>
                        listType === requestListType.my ?
                            <MyRequestListRow {...request}/> :
                            <ManagerRequestListRow {...request}
                                onClick={
                                    onClick ?
                                        () => onClick(`${index}`) :
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