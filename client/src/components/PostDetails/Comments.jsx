import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { commentPost } from "../../actions/posts";
import useStyles from "./styles";

const Comments = ({ post }) => {
    const dispatch = useDispatch();
    const commentsRef = useRef();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem("profile"));
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState("");

    const handleClick = async () => {
        const finalComment = `${user?.result?.name}: ${comment}`;
        const newComments = await dispatch(commentPost(finalComment, post._id));
        setComments(newComments);
        setComment("");

        commentsRef.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    {comments?.map((c, idx) => (
                        <Typography
                            key={idx}
                            gutterBottom
                            variant="subtitle1"
                            className={classes.singleComment}
                        >
                            <strong>{c.split(": ")[0]}:</strong>
                            <em> {c.split(": ")[1]}</em>
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
                {user?.result?.name && (
                    <div style={{ width: "100%" }}>
                        <TextField
                            fullWidth
                            multiline
                            minRows={2}
                            className={classes.button}
                            variant="outlined"
                            label="Write a comment"
                            value={comment}
                            onChange={({ target }) => setComment(target.value)}
                        />
                        <Button
                            className={classes.button}
                            disabled={!comment}
                            variant="contained"
                            onClick={handleClick}
                            color="primary"
                            size="small"
                        >
                            Comment
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Comments;
