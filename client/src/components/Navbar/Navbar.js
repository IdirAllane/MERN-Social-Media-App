import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import {
    AppBar,
    Avatar,
    Button,
    Typography,
    Toolbar,
    Grid,
} from "@material-ui/core";

import memories from "../../images/memories.png";
import useStyles from "./styles";

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("profile"))
    );

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]);

    const logout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
        setUser(null);
    };
    const handleClick = () => {
        navigate("/auth");
    };

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <div className={classes.brandContainer}>
                        <Typography
                            component={Link}
                            to="/"
                            className={classes.heading}
                            variant="h2"
                            align="center"
                        >
                            Memories
                        </Typography>
                        <Link to="/">
                            <img
                                className={classes.image}
                                src={memories}
                                alt="memories"
                                height="60"
                            />
                        </Link>
                    </div>
                </Grid>

                <Grid item>
                    <Toolbar className={classes.toolbar}>
                        {user ? (
                            <div className={classes.profile}>
                                <Avatar
                                    className={classes.purple}
                                    alt={user.result.name}
                                    src={user.result.imageUrl}
                                >
                                    {user.result.name.charAt(0)}
                                </Avatar>
                                <Typography
                                    className={classes.userName}
                                    variant="h6"
                                >
                                    {user.result.name}
                                </Typography>
                                <Button
                                    variant="contained"
                                    className={classes.logout}
                                    color="secondary"
                                    onClick={logout}
                                    size="small"
                                >
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <Button
                                onClick={handleClick}
                                variant="contained"
                                color="primary"
                            >
                                Sign In
                            </Button>
                        )}
                    </Toolbar>
                </Grid>
            </Grid>
        </AppBar>
    );
};

export default Navbar;
