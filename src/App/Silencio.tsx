import React, {FC} from 'react';
import Footer from "./Footer/Footer";
import UserPage from "./UserPage/UserPage";
import SystemDetect from "./SystemDetect/SystemDetect";
import AddRequest from "./UserPage/AddRequest";
import RequestList from "./RequestList/RequestList";
import Router from './Router/Router';

const Silencio : FC = () => {
    return (
        <div>
            <Router/>
            {/*<RequestList/>*/}
            {/*/!*<SystemDetect/>*!/*/}
            {/*/!*<AddRequest show={true} onClose={() => {}}/>*!/*/}
            {/*/!*<UserPage name={"Itamar Goldshlager"}/>*!/*/}
            {/*<Footer/>*/}
        </div>
    );
};

export default Silencio;