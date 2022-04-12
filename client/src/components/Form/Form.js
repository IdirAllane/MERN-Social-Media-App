import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [postData, setPostData] = useState({
        creator: "",
        title: "",
        message: "",
        tags: "",
        selectedFile: "",
    });

    const post = useSelector((state) =>
        currentId ? state.posts.find((p) => p._id === currentId) : null
    );

    useEffect(() => {
        if (post) {
            setPostData(post);
        }
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, postData));
        } else {
            dispatch(createPost(postData));
        }
    };
    const clear = () => {};
    return (
        <>
            <Paper className={classes.paper}>
                <form
                    autoComplete="off"
                    noValidate
                    className={`${classes.root} ${classes.form}`}
                    onSubmit={handleSubmit}
                >
                    <Typography variant="h6"> Creating a Memory</Typography>
                    <TextField
                        name="creator"
                        variant="outlined"
                        label="Creator"
                        fullWidth
                        value={postData.creator}
                        onChange={({ target }) =>
                            setPostData({
                                ...postData,
                                creator: target.value,
                            })
                        }
                    />
                    <TextField
                        name="title"
                        variant="outlined"
                        label="Title"
                        fullWidth
                        value={postData.title}
                        onChange={({ target }) =>
                            setPostData({
                                ...postData,
                                title: target.value,
                            })
                        }
                    />
                    <TextField
                        name="message"
                        variant="outlined"
                        label="Message"
                        fullWidth
                        value={postData.message}
                        onChange={({ target }) =>
                            setPostData({
                                ...postData,
                                message: target.value,
                            })
                        }
                    />
                    <TextField
                        name="tags"
                        variant="outlined"
                        label="Tags"
                        fullWidth
                        value={postData.tags}
                        onChange={({ target }) =>
                            setPostData({
                                ...postData,
                                tags: target.value,
                            })
                        }
                    />
                    <div className={classes.fileInput}>
                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) =>
                                setPostData({
                                    ...postData,
                                    selectedFile: base64,
                                })
                            }
                        />
                        <Button
                            className={classes.buttonSubmit}
                            variant="contained"
                            color="primary"
                            size="large"
                            type="submit"
                            fullWidth
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={clear}
                            fullWidth
                        >
                            Clear
                        </Button>
                    </div>
                </form>
            </Paper>
        </>
    );
};

export default Form;
