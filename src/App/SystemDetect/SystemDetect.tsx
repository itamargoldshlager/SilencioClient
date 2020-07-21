import React, {FC, useState, useEffect} from 'react';
import Filter from "./Filter";
import PersonBox from "./PersonBox";
import Footer from "../Footer/Footer";
import Detects from "./Mock/Persons";
import {Grid, TablePagination} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import UserDetails, {userDetailsProps} from '../UserDetails/UserDetails';

const useStyles = makeStyles({
    systemDetect: {
        width: '60%',
        margin: 'auto',
    }
});

const SystemDetect : FC = () => {
    const classes = useStyles();
    const [userDetailsInfo, setUserDetailsInfo] = useState<userDetailsProps>({
        open: false,
        onClose: () => {},
        id: '0',
    });

    useEffect(() => {
        setUserDetailsInfo({
            open: false,
            id: '0',
            onClose: () => setUserDetailsInfo((prevState: userDetailsProps) => {
                return {
                    ...prevState,
                    open: false,
                }
            })
        })
    }, []);

    const personPerPage = 8;
    const [page, setPage] = useState(0);
    const detectsToShow = Detects.slice(page * personPerPage, page * personPerPage + personPerPage);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };
    return (
        <div>
            <UserDetails {...userDetailsInfo}/>
            <Filter/>
                <div className={classes.systemDetect}>
                    <Grid container spacing={5} >
                        {
                            detectsToShow.map((detect, index) =>
                                <PersonBox
                                    key={index}
                                    {...detect}
                                    onClick={() => {
                                        setUserDetailsInfo(prevState => {
                                            return {
                                                ...prevState,
                                                open: true,
                                                id: detect.id ? detect.id: '0'
                                            }
                                        });
                                    }}
                                    onClose={() => {
                                        setUserDetailsInfo(prevState => {
                                            return {
                                                ...prevState,
                                                open: false,
                                            }
                                        });
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