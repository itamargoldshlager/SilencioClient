import React, {FC} from 'react';
import LoginPage from './Login/Login'
import Footer from "./Footer/Footer";
import SystemDetect from "./SystemDetect/SystemDetect";
const Silencio : FC = () => {
    return (
        <div className="App">
            <SystemDetect/>
            <Footer/>
        </div>
    );
};

export default Silencio;