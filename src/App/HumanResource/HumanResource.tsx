import React, {FC, Fragment, useState} from 'react';
import AddRequest from "../UserPage/AddRequest/AddRequest";
import RequestList, {requestListType} from "../RequestList/RequestList";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PersonManagement from "./PersonManagement/PersonManagement"

const HumanResource : FC = () => {
    const [managerRequestInfo, setManagerRequestInfo] = useState<{
        personId: string,
        requestId: string,
        show: boolean,
    }>({
        requestId: '0',
        personId: '0',
        show: false
    });

    const [humanResourceSelect, setHumanResourceSelect] = useState<{
        requests: boolean,
        persons: boolean
    }>({
        requests: false,
        persons: false
    });

    const setRequestId = (requestId: string, personId: string) => {
        setManagerRequestInfo({
            requestId,
            personId,
            show: true
        })
    };

    const closeManagerRequestDialog = () => {
        setManagerRequestInfo({
            requestId: '0',
            personId: '0',
            show: false
        })
    };

    return (
        <Fragment>
            {
                managerRequestInfo.show &&
                <AddRequest show={managerRequestInfo.show} onClose={closeManagerRequestDialog} requestType={requestListType.manager} requestId={managerRequestInfo.requestId} personId={managerRequestInfo.personId}/>
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
                    <RequestList listType={requestListType.manager} onClick={setRequestId}/>
            }
            {
                humanResourceSelect.persons &&
                    <PersonManagement/>
            }
        </Fragment>
    );
};

export default HumanResource;