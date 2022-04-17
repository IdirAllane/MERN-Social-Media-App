import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: "30px 0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 30px",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            padding: "10px 15px",
        },
    },
    heading: {
        color: theme.palette.primary.main,
        textDecoration: "none",
        fontSize: "2.4rem",
        fontWeight: 600,
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    image: {
        marginLeft: "10px",
        marginTop: "5px",
    },
    toolbar: {
        display: "flex",
        justifyContent: "flex-end",
        width: "400px",
        [theme.breakpoints.down("sm")]: {
            width: "auto",
        },
    },
    profile: {
        display: "flex",
        columnGap: "10px",
        justifyContent: "flex-end",
        width: "400px",
        alignItems: "center",
        [theme.breakpoints.down("sm")]: {
            width: "auto",
            justifyContent: "space-between",
        },
    },
    logout: {
        marginLeft: "20px",
    },
    userName: {
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        [theme.breakpoints.down("xs")]: {
            display: "none",
        },
    },
    brandContainer: {
        display: "flex",
        alignItems: "center",
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
}));
