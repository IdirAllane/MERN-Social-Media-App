import React, { useState } from "react";
import {
    Avatar,
    Button,
    Paper,
    Grid,
    Typography,
    Container,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";
import LockOutlined from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
import Icon from "./Icon";
import { signIn, signUp } from "../../actions/auth";
const initialState = {
    first: "",
    last: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignUp) {
            //sign up
            dispatch(signUp(formData, navigate));
        } else {
            //sign in
            dispatch(signIn(formData, navigate));
        }
    };
    const handleChange = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value });
    };
    const handleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };
    const switchMode = () => {
        setIsSignUp((prev) => !prev);
    };
    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({ type: "AUTH", data: { result, token } });
            navigate("/");
        } catch (e) {
            console.log(e);
        }
    };
    const googleFailure = (err) => {
        console.log(err);
        console.log("Google sign in was unsuccessful! Try Again.");
    };
    return (
        <>
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockOutlined />
                    </Avatar>
                    <Typography variant="h5">
                        {" "}
                        {isSignUp ? "Sign Up" : "Sign In"}{" "}
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {isSignUp && (
                                <>
                                    <Input
                                        name="first"
                                        label="First"
                                        handleChange={handleChange}
                                        autoFocus
                                        half
                                    />
                                    <Input
                                        name="last"
                                        label="Last"
                                        handleChange={handleChange}
                                        half
                                    />
                                </>
                            )}
                            <Input
                                name="email"
                                label="E-Mail"
                                handleChange={handleChange}
                                type="email"
                            />
                            <Input
                                name="password"
                                label="Password"
                                handleChange={handleChange}
                                type={showPassword ? "text" : "password"}
                                handleShowPassword={handleShowPassword}
                            />
                            {isSignUp && (
                                <Input
                                    name="confirmPassword"
                                    label="Repeat Password"
                                    handleChange={handleChange}
                                    type="password"
                                />
                            )}
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {isSignUp ? "Sign Up" : "Sign In"}
                        </Button>
                        <GoogleLogin
                            clientId="904157567962-gbg73h5an0c3ea5kvjf1ptiet94bi0mh.apps.googleusercontent.com"
                            render={(renderProps) => (
                                <Button
                                    className={classes.googleButton}
                                    color="primary"
                                    fullWidth
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    startIcon={<Icon />}
                                    variant="contained"
                                >
                                    Sign In with Google
                                </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        />
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {isSignUp
                                        ? "Already have an account? Sign In!"
                                        : "Don't have an account yet? Sign Up!"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </>
    );
};

export default Auth;
