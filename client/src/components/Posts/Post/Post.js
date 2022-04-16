import React, { useState } from "react";
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    ButtonBase,
} from "@material-ui/core";
import ThumbUpAlt from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import useStyles from "./styles";
import moment from "moment";
import Delete from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [likes, setLikes] = useState(post?.likes);
    const user = JSON.parse(localStorage.getItem("profile"));

    const userId = user?.result?.googleId || user?.result?._id;
    const hasLikedPost = likes.find((like) => like === userId);

    const openPost = () => {
        navigate(`/posts/${post._id}`);
    };

    const handleLike = async () => {
        dispatch(likePost(post._id));
        hasLikedPost
            ? setLikes(likes.filter((id) => id !== userId))
            : setLikes([...likes, userId]);
    };

    const Likes = () => {
        if (post?.likes?.length > 0) {
            return hasLikedPost ? (
                <>
                    <ThumbUpAlt fontSize="small" />
                    &nbsp;
                    {likes.length > 2
                        ? `You and ${likes.length - 1} others`
                        : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
                </>
            ) : (
                <>
                    <ThumbUpAltOutlined fontSize="small" />
                    &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
                </>
            );
        }

        return (
            <>
                <ThumbUpAltOutlined fontSize="small" />
                &nbsp;Like
            </>
        );
    };

    return (
        <>
            <Card className={classes.card} raised elevation={6}>
                <ButtonBase className={classes.cardAction} onClick={openPost}>
                    <CardMedia
                        className={classes.media}
                        image={post.selectedFile}
                        title={post.title}
                    />
                    <div className={classes.overlay}>
                        <Typography variant="h6">{post.name}</Typography>
                        <Typography variant="body2">
                            {moment(post.createdAt).fromNow()}
                        </Typography>
                    </div>
                    {(user?.result?.googleId === post.creator ||
                        user?.result?._id === post.creator) && (
                        <div className={classes.overlay2}>
                            <Button
                                style={{ color: "white" }}
                                size="small"
                                onClick={() => {
                                    setCurrentId(post._id);
                                }}
                            >
                                <MoreHoriz fontSize="medium" />
                            </Button>
                        </div>
                    )}

                    <div className={classes.details}>
                        <Typography variant="body2" color="textSecondary">
                            {post.tags.map((tag) => `#${tag} `)}
                        </Typography>
                    </div>
                    <Typography
                        className={classes.title}
                        variant="h5"
                        gutterBottom
                    >
                        {post.title}
                    </Typography>
                    <CardContent>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            gutterBottom
                        >
                            {post.message}
                        </Typography>
                    </CardContent>
                </ButtonBase>
                <CardActions className={classes.cardActions}>
                    <Button
                        size="small"
                        color="primary"
                        variant="outlined"
                        disabled={!user?.result}
                        onClick={handleLike}
                    >
                        <Likes />
                    </Button>
                    {(user?.result?.googleId === post.creator ||
                        user?.result?._id === post.creator) && (
                        <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            onClick={() => {
                                dispatch(deletePost(post._id));
                            }}
                        >
                            <Delete fontSize="small" style={{ color: "red" }} />
                            Delete
                        </Button>
                    )}
                </CardActions>
            </Card>
        </>
    );
};

export default Post;
