import React, { useEffect, useState } from "react";
import useStyles from './styles';
import { AppBar, Button, Toolbar, Typography, IconButton } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actionType from '../../constants/actionTypes';
import decode from 'jwt-decode';
import { Avatar } from "@material-ui/core";

const Navbar = () => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const handleLogin = () => history.push('/loginUser');
    const profile = localStorage.getItem('profile')!;
    const [user, setUser] = useState(JSON.parse(profile));
    const dispatch = useDispatch();

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });

        history.push('/');

        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode<any>(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(profile));
    }, [location]);


    return (
        <div className={classes.root} style={{position: "absolute", left: "0", top: "0"}}>
            <AppBar color="secondary">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/">
                            Farmer MarketPlace
                        </Link>
                    </Typography>
                    {user?.result ?
                        <div style={{ display: "flex" }}>
                            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                            <Button variant="contained" style={{ marginLeft: "20px" }} color="secondary" onClick={logout}>Logout</Button>
                        </div>
                        :
                        <Button color="inherit" onClick={handleLogin}>Sign In</Button>
                    }

                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;