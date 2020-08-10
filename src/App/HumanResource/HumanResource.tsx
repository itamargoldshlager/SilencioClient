import React, {FC, Fragment, useState} from 'react';
import AddRequest, {initialState, RequestDialogInformation} from "../UserPage/AddRequest/AddRequest";
import RequestList, {requestListType} from "../RequestList/RequestList";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PersonManagement from "./PersonManagement/PersonManagement"
import {RequestRow} from "../RequestList/RequestInterface/RequestInterface";

const getRequestInfoFromRequestRow = (request: RequestRow): RequestDialogInformation => {
    return {
        ID: request.personId,
        beginEntrancePermit: request.startAccess,
        endEntrancePermit: request.endAccess,
        firstName: request.firstName,
        lastName: request.lastName,
        img: request.additionalInformation?.img || '',
        information: request.additionalInformation?.info || '',
        mobileNumber: request.additionalInformation?.phone || '',
        reason: request.additionalInformation?.reason || ''
    }
};

interface HumanResourceProps {
    userId: string,
}

const HumanResource : FC<HumanResourceProps> = ({userId}) => {
    const [managerRequestInfo, setManagerRequestInfo] = useState<{
        personId: string,
        requestId: string,
        show: boolean,
        requestInfo: RequestDialogInformation
    }>({
        requestId: '0',
        personId: '0',
        show: false,
        requestInfo: initialState
    });

    const [humanResourceSelect, setHumanResourceSelect] = useState<{
        requests: boolean,
        persons: boolean
    }>({
        requests: false,
        persons: false
    });

    const setRequestId = (requestId: string, personId: string, requestInfo: RequestDialogInformation) => {
        setManagerRequestInfo({
            requestId,
            personId,
            show: true,
            requestInfo
        })
    };

    const closeManagerRequestDialog = () => {
        setManagerRequestInfo({
            requestId: '0',
            personId: '0',
            requestInfo: initialState,
            show: false
        })
    };

    return (
        <Fragment>
            {
                managerRequestInfo.show &&
                <AddRequest
                    show={managerRequestInfo.show}
                    onClose={closeManagerRequestDialog}
                    requestType={requestListType.manager}
                    requestId={managerRequestInfo.requestId}
                    personId={managerRequestInfo.personId}
                    requestInfo={managerRequestInfo.requestInfo}
                />
            }
            <Grid container spacing={2}>
                <Grid item xs={4}/>
                <Grid item xs={2}>
                    <Button
                        color="primary"
                        variant="outlined"
                        onClick={() =>
                            setHumanResourceSelect((prevState)  => {
                                return {
                                    persons: false,
                                    requests: !prevState.requests
                                }
                            })
                        }
                    >
                        Request management
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <Button
                        color="primary"
                        variant="outlined"
                        onClick={() =>
                            setHumanResourceSelect((prevState)  => {
                                return {
                                    requests: false,
                                    persons: !prevState.persons
                                }
                            })
                        }
                    >
                        Person management
                    </Button>
                </Grid>
                <Grid item xs={4}/>
            </Grid>
            {
                humanResourceSelect.requests &&
                    <RequestList
                        listType={requestListType.manager}
                        onClick={
                            (requestId: string, personId: string, requestInfo: RequestRow) => {
                                setRequestId(requestId, personId, getRequestInfoFromRequestRow(requestInfo));
                        }}
                        userId={userId}
                    />
            }
            {
                humanResourceSelect.persons &&
                    <PersonManagement/>
            }
        </Fragment>
    );
};

export default HumanResource;