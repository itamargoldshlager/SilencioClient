import React, {FC} from 'react';
import Footer from "./Footer/Footer";
import UserPage from "./UserPage/UserPage";
import SystemDetect from "./SystemDetect/SystemDetect";
import AddRequest from "./UserPage/AddRequest";
const Silencio : FC = () => {
    return (
        <div className="App">
            {/*<SystemDetect/>*/}
            <AddRequest show={true} onClose={() => {}}/>
            {/*<UserPage name={"Itamar Goldshlager"}/>*/}
            {/*<Footer/>*/}
        </div>
    );
};

export default Silencio;