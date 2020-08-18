import React, {FC, useState, useEffect} from 'react';
import Filter, {SystemDetectDateFilter} from "./Filter";
import PersonBox from "./PersonBox";
import {Grid, TablePagination} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import UserDetails, {userDetailsProps} from '../UserDetails/UserDetails';
import {detectionEvent} from "./interfaces/interface";
import {fetchInitialState} from "./ServerConnection/FetchInitialState";
import {serverSendEventHandler} from "./ServerConnection/ServerSentEvent";

const useStyles = makeStyles({
    systemDetect: {
        width: '60%',
        margin: 'auto',
    }
});


const SystemDetect : FC = () => {
    const classes = useStyles();

    const [detects, setDetects] = useState<detectionEvent[]>([]);
    const [filteredDetects, setFilteredDetects] = useState<detectionEvent[]>([]);

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

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const [dateFilter, setDateFilter] = useState<SystemDetectDateFilter>({
      begin: new Date(),
      end: new Date(),
      filter: false
    });

    const [indication, setIndication] = useState<string>('');

    const handleChangeDateFilter = (beginOrEnd: boolean, newDate: Date) => {
      let update = {};

      beginOrEnd ? update = {begin: newDate} : update = {end: newDate};

      setDateFilter(prevState => {
          return {
              ...prevState,
              ...update,
              filter: true
          }
      })
    };

    const [personId, setPersonId] = useState<string>('');

    useEffect(() => {
        let filtered = detects.filter(detect => detect.indication.indexOf(indication) !== -1);

        if (personId !== '') {
            filtered = filtered.filter(detect => detect.personId && detect.personId.indexOf(personId) !== -1);
        }

        if (dateFilter.filter) {
            filtered = filtered.filter(detect => detect.timestamp > dateFilter.begin.getTime() && detect.timestamp < dateFilter.end.getTime())
        }

        setFilteredDetects(filtered);
    }, [detects, dateFilter, indication, personId]);

    const detectByOrder = filteredDetects.sort((a, b) => b.timestamp - a.timestamp);
    const detectsToShow = detectByOrder.slice(page * personPerPage, page * personPerPage + personPerPage);

    return (
        <div>
            <UserDetails {...userDetailsInfo}/>
            <Filter
                dateFilter= {dateFilter}
                handleChangeDateFilter = {handleChangeDateFilter}
                indication= {indication}
                handleChangeIndication= {setIndication}
                personId= {personId}
                handleChangePersonId = {setPersonId}
            />
                <div className={classes.systemDetect}>
                    <Grid container spacing={5} >
                        {
                            detectsToShow.map((detect, index) =>
                                <PersonBox
                                    key={index}
                                    {...detect}
                                    onClick={() => {
                                        detect.personId &&
                                            setUserDetailsInfo(prevState => {
                                                return {
                                                    ...prevState,
                                                    open: true,
                                                    id: detect.personId
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
                        count={detectByOrder.length}
                        rowsPerPage={8}
                        page={page}
                        SelectProps={{
                            inputProps: { 'aria-label': 'rows per page' },
                            native: true,
                        }}
                        onChangePage={handleChangePage}
                    />
                </div>
        </div>
    );
};

export default SystemDetect;