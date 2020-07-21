import React, {FC,} from 'react';
import UserDetails from "../UserDetails/UserDetails";
import AddRequest from "./AddRequest/AddRequest";
import RequestList, {requestListType} from "../RequestList/RequestList";
import ExitImage from "../utils/exit.png";
import {makeStyles} from "@material-ui/core/styles";
import HumanResource from "../HumanResource/HumanResource";
import AdminPage from "../Admin/AdminPage";

interface showOption {
    showMyDetails: boolean,
    showAddRequest: boolean,
    showMyRequest: boolean,
    showRequestManager: boolean,
    showUserManagement: boolean,
}

export interface optionManagerProps {
    showOption: showOption
    onClose: () => void,
}

const useStyles = makeStyles({
    textAlign: {
        textAlign: 'left'
    },
    exitImage: {
        position: 'relative',
        top: 0,
        left: 5,
    },
});

const OptionManager : FC<optionManagerProps> = ({showOption, onClose}) => {
    const classes = useStyles();

    return (
        <div>
            <UserDetails open={showOption.showMyDetails} onClose={onClose} id={'2'}/>
            {
                showOption.showAddRequest &&
                    <AddRequest show={showOption.showAddRequest} onClose={onClose} requestType={requestListType.my}/>
            }
            {
                showOption.showMyRequest &&
                    <RequestList listType={requestListType.my} onClose={onClose}/>
            }
            {
                (showOption.showRequestManager || showOption.showUserManagement) &&
                    <div
                        className= {classes.textAlign}
                    >
                        <img
                            className={classes.exitImage}
                            src={ExitImage}
                            onClick={onClose}
                            alt="Exit button"
                        />
                    </div>
            }
            {
                showOption.showRequestManager &&
                    <HumanResource/>
            }
            {
                showOption.showUserManagement &&
                    <AdminPage/>
            }
        </div>
    );
};

export default OptionManager;