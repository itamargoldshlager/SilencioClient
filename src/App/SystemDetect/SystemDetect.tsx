import React, {FC, useState, useEffect} from 'react';
import Filter from "./Filter";
import PersonBox from "./PersonBox";
import Footer from "../Footer/Footer";
import {Grid, TablePagination} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import UserDetails, {userDetailsProps} from '../UserDetails/UserDetails';
import {detectionEvent} from "./interfaces/interface";
import {fetchInitialState} from "./ServerConnection/FetchInitialState";
import {address} from "../utils/ServerConf";
import {serverSendEventHandler} from "./ServerConnection/ServerSentEvent";

const useStyles = makeStyles({
    systemDetect: {
        width: '60%',
        margin: 'auto',
    }
});


const useEventSource = (url: string) => {
    const [data, updateData] = useState(null);

    useEffect(() => {
        const source = new EventSource(url);

        // source.onmessage = function logEvents(event) {
        //     console.log(event.data);
        //     updateData(JSON.parse(event.data));
        // }

        source.addEventListener("Detection", ((evt:any) => {
            console.log(JSON.parse(evt.data));
        }))
    }, []);

    return data;
};

const SystemDetect : FC = () => {
    const classes = useStyles();
    // const data = useEventSource(address + "gate/updates");
    const [detects, setDetects] = useState<detectionEvent[]>([]);
    const detectByOrder = detects.sort((a, b) => b.timestamp - a.timestamp);
    useEffect(() => {
        fetchInitialState(setDetects);
        serverSendEventHandler((event: detectionEvent) => {
            setDetects((prevState: detectionEvent[]) => {
                return [event, ...prevState]
            })
        })
    }, []);
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
    const detectsToShow = detectByOrder.slice(page * personPerPage, page * personPerPage + personPerPage);

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
                                                id: detect.personId ? detect.personId : '0'
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
                        count={detects.length}
                        rowsPerPage={8}
                        page={page}
                        SelectProps={{
                            inputProps: { 'aria-label': 'rows per page' },
                            native: true,
                        }}
                        onChangePage={handleChangePage}
                    />
                </div>
            {/*<Footer/>*/}
        </div>
    );
};

export default SystemDetect;