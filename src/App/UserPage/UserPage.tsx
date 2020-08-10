import React, {FC, Fragment, useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import DetailsImage from "./Icons/Details.png"
import AddRequestImage from "./Icons/AddRequest.png"
import RequestListImage from "./Icons/RequestList.png"
import RequestManagementImage from "./Icons/RequestManagement.png"
import UserManagementImage from "./Icons/UserManagement.png"

import Grid from '@material-ui/core/Grid';
import {Button} from "@material-ui/core";
import {userType} from "../utils/UserType";
import OptionManager, {optionManagerProps} from "./OptionManager";

const useStyles = makeStyles({
    root: {
    },
    header: {
        display: "inline-block",
        width: '100%',
        marginBottom: 100,
    },
    title: {
        verticalAlign: 'middle',
        margin: 'auto',
        marginTop: 10,
        fontSize: 40,
    },
    headerImage: {
        float: "left",
        width: 120,
        height: 99,
    },
    options: {
        marginTop: 40,
    },
    optionImage: {
        width: 215,
        height: 230,
    },
    optionButton: {
        textTransform: 'none',
        width: 178,
        marginTop: 10,
        paddingTop: 10,
        radius: 5,
        backgroundColor: '#169bd5',
        fontSize: 20
    }
});

interface UserPageProps {
    loggedInUserType: userType
    userId: string
}

const initialOptionManager: optionManagerProps = {
    showOption: {
        showRequestManager: false,
        showMyRequest: false,
        showMyDetails: false,
        showAddRequest: false,
        showUserManagement: false,
    },
    onClose: () => {},
    userId: ''
};
const UserPage : FC<UserPageProps> = ({loggedInUserType , userId}) => {
    const [optionManagerBools, setOptionManagerBools] = useState<optionManagerProps>(initialOptionManager);

    useEffect(() =>
    setOptionManagerBools({
        ...initialOptionManager,
        onClose: () => {
            setOptionManagerBools((prevState:optionManagerProps) => {
                return {
                    onClose: prevState.onClose,
                    userId: userId,
                    showOption: {
                        showRequestManager: false,
                        showMyRequest: false,
                        showMyDetails: false,
                        showAddRequest: false,
                        showUserManagement: false,
                    },
                }
            })
        }
    }), []);


    const classes = useStyles();

    return (
        <div className={classes.root}>
            <OptionManager {...optionManagerBools}/>
            {
                (!optionManagerBools.showOption.showMyRequest && !optionManagerBools.showOption.showRequestManager && !optionManagerBools.showOption.showUserManagement) &&
                <Grid container spacing={4} className={classes.options}>
                    <Grid item xs>
                        <div>
                            <img
                                className={classes.optionImage}
                                style={{paddingLeft: 20}}
                                src={DetailsImage}
                            />
                        </div>
                        <Button
                            className={classes.optionButton}
                            color="primary"
                            variant="contained"
                            onClick={() => {
                                setOptionManagerBools((prevState: optionManagerProps) => {
                                    return {
                                        onClose: prevState.onClose,
                                        showOption: {
                                            ...prevState.showOption,
                                            showMyDetails: true,
                                        },
                                        userId: prevState.userId,
                                    }
                                })
                            }}
                        >
                            My details
                        </Button>
                    </Grid>
                    <Grid item xs>
                        <div>
                            <img
                                className={classes.optionImage}
                                src={AddRequestImage}
                            />
                        </div>
                        <Button
                            className={classes.optionButton}
                            color="primary"
                            variant="contained"
                            onClick={() => {
                                setOptionManagerBools((prevState: optionManagerProps) => {
                                    return {
                                        onClose: prevState.onClose,
                                        showOption: {
                                            ...prevState.showOption,
                                            showAddRequest: true,
                                        },
                                        userId: prevState.userId
                                    }
                                })
                            }}
                        >
                            Add request
                        </Button>
                    </Grid>
                    <Grid item xs>
                        <div>
                            <img
                                className={classes.optionImage}
                                src={RequestListImage}
                            />
                        </div>
                        <Button
                            className={classes.optionButton}
                            color="primary"
                            variant="contained"
                            onClick={() => {
                                setOptionManagerBools((prevState: optionManagerProps) => {
                                    return {
                                        onClose: prevState.onClose,
                                        showOption: {
                                            ...prevState.showOption,
                                            showMyRequest: true,
                                        },
                                        userId: prevState.userId
                                    }
                                })
                            }}
                        >
                            My requests
                        </Button>
                    </Grid>
                    {
                        (loggedInUserType !== userType.USER) &&
                            <Fragment>
                                <Grid item xs>
                                    <div>
                                        <img
                                            className={classes.optionImage}
                                            src={RequestManagementImage}
                                        />
                                    </div>
                                    <Button
                                        className={classes.optionButton}
                                        color="primary"
                                        variant="contained"
                                        onClick={() => {
                                            setOptionManagerBools((prevState: optionManagerProps) => {
                                                return {
                                                    onClose: prevState.onClose,
                                                    showOption: {
                                                        ...prevState.showOption,
                                                        showRequestManager: true,
                                                    },
                                                    userId: prevState.userId
                                                }
                                            })
                                        }}
                                    >
                                        Human resource
                                    </Button>
                                </Grid>
                                {
                                    loggedInUserType === userType.MANAGER &&
                                        <Grid item xs>
                                            <div>
                                                <img
                                                    className={classes.optionImage}
                                                    src={UserManagementImage}
                                                />
                                            </div>
                                            <Button
                                                className={classes.optionButton}
                                                color="primary"
                                                variant="contained"
                                                onClick={() => {
                                                    setOptionManagerBools((prevState: optionManagerProps) => {
                                                        return {
                                                            onClose: prevState.onClose,
                                                            showOption: {
                                                                ...prevState.showOption,
                                                                showUserManagement: true,
                                                            },
                                                            userId: prevState.userId
                                                        }
                                                    })
                                                }}
                                            >
                                                User Management
                                            </Button>
                                        </Grid>
                                }
                            </Fragment>
                    }
                </Grid>
            }
        </div>
    );
};

export default UserPage;