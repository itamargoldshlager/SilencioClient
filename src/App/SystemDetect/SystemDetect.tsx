import React, {FC, useState, Fragment, useEffect} from 'react';
import Filter from "./Filter";
import PersonBox from "./PersonBox";
import Header from "../Header/Header"
import Footer from "../Footer/Footer";
import Detects from "./Mock/Persons";
import {Grid, TablePagination} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import UserPopUp from '../UserDetails/UserDetails';
import SilencioImage from "../utils/Silencio.png";

const useStyles = makeStyles({
    systemDetect: {
        width: '60%',
        margin: 'auto',
    }
});

const SystemDetect : FC = () => {
    const classes = useStyles();
    const [openUserPopUp, setOpenUserPopUp] = useState<boolean>(false);
    const personPerPage = 8;
    const [page, setPage] = useState(0);
    const detectsToShow = Detects.slice(page * personPerPage, page * personPerPage + personPerPage);
    let emptyRows = personPerPage - Math.min(personPerPage, Detects.length - page * personPerPage);
    useEffect(() => {
        emptyRows = personPerPage - Math.min(personPerPage, Detects.length - page * personPerPage);
    }, [page]);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };
    return (
        <div>
            <UserPopUp show={openUserPopUp} onClose={() => setOpenUserPopUp(false)}/>
            <Filter/>
                <div className={classes.systemDetect}>
                    <Grid container spacing={5} >
                        {
                            detectsToShow.map((detect, index) =>
                                <PersonBox
                                    key={index}
                                    {...detect}
                                    onClick={() => {
                                        setOpenUserPopUp(true);
                                    }}
                                    onClose={() => {
                                        setOpenUserPopUp(false);
                                    }}
                                />
                            )
                        }
                    </Grid>
                    <TablePagination
                        rowsPerPageOptions={[8]}
                        colSpan={3}
                        count={Detects.length}
                        rowsPerPage={8}
                        page={page}
                        SelectProps={{
                            inputProps: { 'aria-label': 'rows per page' },
                            native: true,
                        }}
                        onChangePage={handleChangePage}
                    />
                </div>
            <Footer/>
        </div>
    );
};

export default SystemDetect;