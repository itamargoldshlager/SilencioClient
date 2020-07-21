import React, {FC, Fragment, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import UserManagement from './UserManagement/UserManagement';
import SystemDetect from "../SystemDetect/SystemDetect";

const AdminPage : FC = () => {
    const [adminSelect, setAdminSelect] = useState<{
        users: boolean,
        systemDetects: boolean
    }>({
        users: false,
        systemDetects: false
    });

    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={4}/>
                <Grid item xs={2}>
                    <Button
                        color="primary"
                        variant="outlined"
                        onClick={() =>
                            setAdminSelect((prevState)  => {
                                return {
                                    users: !prevState.users,
                                    systemDetects: false
                                }
                            })
                        }
                    >
                        User management
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <Button
                        color="primary"
                        variant="outlined"
                        onClick={() =>
                            setAdminSelect((prevState)  => {
                                return {
                                    users: false,
                                    systemDetects: !prevState.systemDetects
                                }
                            })
                        }
                    >
                        System's Detects
                    </Button>
                </Grid>
                <Grid item xs={4}/>
            </Grid>
            {
                adminSelect.users &&
                    <UserManagement/>
            }
            {
                adminSelect.systemDetects &&
                    <SystemDetect/>
            }
        </Fragment>
    );
};

export default AdminPage;