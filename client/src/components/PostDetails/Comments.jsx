import React, { useState, useEffect, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { commentPost } from "../../actions/posts";

const Comments = ({ post }) => {
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments);
    const commentsRef = useRef();
    const classes = useStyles();
    const [comment, setComment] = useState("");
    const user = JSON.parse(localStorage.getItem("profile"));

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
                    <Typography gutterBottom variant="h6">
                        Comments
                    </Typography>
                    {comments?.map((c, idx) => (
                        <Typography key={idx} gutterBottom variant="subtitle1">
                            <strong>{c.split(": ")[0]}:</strong>
                            <em> {c.split(": ")[1]}</em>
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
                {user?.result?.name && (
                    <div style={{ width: "70%" }}>
                        <Typography gutterBottom variant="h6">
                            Your Comment:
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            minRows={4}
                            variant="outlined"
                            label="Comment"
                            value={comment}
                            onChange={({ target }) => setComment(target.value)}
                        />
                        <Button
                            style={{ marginTop: "10px" }}
                            fullWidth
                            disabled={!comment}
                            variant="contained"
                            onClick={handleClick}
                            color="primary"
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
