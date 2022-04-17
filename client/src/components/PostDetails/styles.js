import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    title: {
        [theme.breakpoints.down("sm")]: {
            fontSize: "2rem",
        },
    },
    media: {
        borderRadius: "20px",
        objectFit: "cover",
        width: "100%",
        [theme.breakpoints.down("sm")]: {
            maxHeight: "350px",
        },
    },
    card: {
        display: "flex",
        width: "100%",
        gap: "20px",
        [theme.breakpoints.down("sm")]: {
            flexWrap: "wrap",
            flexDirection: "column-reverse",
            justifyContent: "space-between",
            gap: "10px",
        },
    },
    section: {
        borderRadius: "20px",
        width: "350px",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
    },
    section2: {
        borderRadius: "20px",
        margin: "10px",
        width: "100%",
    },
    imageSection: {
        flex: 1,
        paddingLeft: "10px",
        [theme.breakpoints.down("sm")]: {
            paddingLeft: 0,
        },
    },
    recommendedPosts: {
        display: "flex",
        flexWrap: "wrap",
    },
    loadingPaper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        borderRadius: "15px",
        height: "39vh",
    },
    commentsOuterContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    commentsInnerContainer: {
        width: "350px",
        height: "200px",
        overflowY: "auto",
        padding: "5px",
        borderRadius: "0.5rem",
        backgroundColor: "lightgray",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            padding: 0,
        },
    },
    singleComment: {
        margin: "3px",
        padding: "5px 10px",
        backgroundColor: "white",
        borderRadius: "5px",
    },
    button: {
        marginTop: "10px",
        width: "350px",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
    },
}));
