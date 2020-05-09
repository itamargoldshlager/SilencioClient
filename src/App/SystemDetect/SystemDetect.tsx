import React, {FC} from 'react';
import Filter from "./Filter";
import PersonBox from "./PersonBox";
import Header from "./header";
import Footer from "../Footer/Footer";
import Detects from "./Mock/Persons";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import UserPopUp from './UserPopUp';
import SilencioImage from "../utils/Silencio.png";

const useStyles = makeStyles({
    systemDetect: {
        width: '60%',
        margin: 'auto',
    }
});

const SystemDetect : FC = () => {
    const classes = useStyles();

    return (
        <div>
            <Header/>
            <UserPopUp
                show={true}
                img={SilencioImage}
                beginEntrancePermit={new Date()}
                endEntrancePermit={new Date()}
                company={"Silencio"}
                firstName={"itamar"}
                lastName={"Goldshlager"}
                onClose={() => {}}
                phoneNumber={"052-6533460"}
            />
            <Filter/>
                <Grid container spacing={5} className={classes.systemDetect}>
                    {
                        Detects.map(detect =>
                            <PersonBox {...detect} />
                        )
                    }
                </Grid>
            <Footer/>
        </div>
    );
};

export default SystemDetect;