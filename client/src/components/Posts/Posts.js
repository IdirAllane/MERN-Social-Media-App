import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";

import { Grid, CircularProgress } from "@material-ui/core";
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
    const classes = useStyles();
    const { posts, isLoading } = useSelector((state) => state.posts);

    if (!isLoading && !posts.length) return "No Posts";

    return (
        <>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <Grid
                    container
                    className={classes.container}
                    alignItems="stretch"
                    spacing={3}
                >
                    {posts?.map((post) => (
                        <Grid item key={post._id} xs={12} sm={12} md={6} lg={6}>
                            <Post post={post} setCurrentId={setCurrentId} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
};

export default Posts;
