import React, {FC} from 'react';
import UserDetails from "../UserDetails/UserDetails";
import AddRequest from "./AddRequest";
import RequestList, {requestListType} from "../RequestList/RequestList";

interface showOption {
    showMyDetails: boolean,
    showAddRequest: boolean,
    showMyRequest: boolean,
    showRequestManager: boolean,
}

export interface optionManagerProps {
    showOption: showOption
    onClose: () => void,
}

const OptionManager : FC<optionManagerProps> = ({showOption, onClose}) => {
    return (
        <div>
            <UserDetails show={showOption.showMyDetails} onClose={onClose}/>
            <AddRequest show={showOption.showAddRequest} onClose={onClose}/>
            {
                showOption.showMyRequest &&
                    <RequestList listType={requestListType.my} onClose={onClose}/>
            }
            {
                showOption.showRequestManager &&
                    <RequestList listType={requestListType.manager} onClose={onClose}/>
            }
        </div>
    );
};

export default OptionManager;