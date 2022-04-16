import React, { useEffect } from "react";
import {
    Paper,
    Typography,
    CircularProgress,
    Divider,
} from "@material-ui/core";
import Comments from "./Comments";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import useStyles from "./styles";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPost, getPostsBySearch } from "../../actions/posts";

const PostDetails = () => {
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPost(id));
    }, [id, dispatch]);

    useEffect(() => {
        post.tags &&
            dispatch(
                getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
            );
    }, [post, dispatch]);

    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

    const openPost = (_id) => {
        navigate(`/posts/${_id}`);
    };

    if (!post) return null;

    if (isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        );
    }

    return (
        <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">
                        {post.title}
                    </Typography>
                    <Typography
                        gutterBottom
                        variant="h6"
                        color="textSecondary"
                        component="h2"
                    >
                        {post.length &&
                            post?.tags.map((tag) => (
                                <Link
                                    to={`/tags/${tag}`}
                                    style={{
                                        textDecoration: "none",
                                        color: "#3f51b5",
                                    }}
                                    key={tag}
                                >
                                    {` #${tag} `}
                                </Link>
                            ))}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="p">
                        {post.message}
                    </Typography>
                    <Typography variant="h6">
                        Created by:
                        <Link
                            to={`/creators/${post.name}`}
                            style={{ textDecoration: "none", color: "#3f51b5" }}
                        >
                            {` ${post.name}`}
                        </Link>
                    </Typography>
                    <Typography variant="body1">
                        {moment(post.createdAt).fromNow()}
                    </Typography>
                    <Divider style={{ margin: "20px 0" }} />

                    <Comments post={post} />
                    <Divider style={{ margin: "20px 0" }} />
                </div>
                <div className={classes.imageSection}>
                    <img
                        className={classes.media}
                        src={
                            post.selectedFile ||
                            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                        }
                        alt={post.title}
                    />
                </div>
            </div>

            {recommendedPosts.length && (
                <div className={classes.section}>
                    <Typography gutterBottom variant="h5">
                        You might also like
                    </Typography>
                    <Divider />
                    <div className={classes.recommendedPosts}>
                        {recommendedPosts.map(
                            ({
                                title,
                                message,
                                name,
                                likes,
                                selectedFile,
                                _id,
                            }) => (
                                <div
                                    style={{
                                        margin: "20px",
                                        cursor: "pointer",
                                        width: "200px",
                                    }}
                                    onClick={() => openPost(_id)}
                                    key={_id}
                                >
                                    <img
                                        src={selectedFile}
                                        width="200px"
                                        alt={title}
                                    />
                                    <Typography gutterBottom variant="h6">
                                        {title}
                                    </Typography>
                                    <Typography
                                        gutterBottom
                                        variant="subtitle1"
                                    >
                                        {name}
                                    </Typography>
                                    <Typography
                                        gutterBottom
                                        variant="subtitle2"
                                    >
                                        {message}
                                    </Typography>
                                </div>
                            )
                        )}
                    </div>
                </div>
            )}
        </Paper>
    );
};

export default PostDetails;
