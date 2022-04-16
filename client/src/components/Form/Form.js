import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    TextField,
    Button,
    Typography,
    Paper,
    Input,
    Avatar,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [postData, setPostData] = useState({
        title: "",
        message: "",
        tags: "",
        selectedFile: "",
    });
    const [uploadPreview, setUploadPreview] = useState({ title: "", img: "" });
    const user = JSON.parse(localStorage.getItem("profile"));
    const post = useSelector((state) =>
        currentId ? state.posts.find((p) => p._id === currentId) : null
    );
    const posts = useSelector((state) => state.posts);

    useEffect(() => {
        if (post) {
            setPostData(post);
        }
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(
                updatePost(currentId, { ...postData, name: user?.result?.name })
            );
        } else {
            dispatch(
                createPost({ ...postData, name: user?.result?.name }, navigate)
            );
        }
        clear();
    };
    const clear = () => {
        setCurrentId(null);
        setPostData({
            title: "",
            message: "",
            tags: "",
            selectedFile: "",
        });
        setUploadPreview({ title: "", img: "" });
    };

    const handleUpload = async ({ target }) => {
        const imgBase64 = await base64converter(target.files[0]);
        setPostData({
            ...postData,
            selectedFile: imgBase64,
        });
        setUploadPreview({ title: target.files[0].name, img: imgBase64 });
    };

    const base64converter = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (e) => {
                reject(e);
            };
        });
    };
    console.log(postData);
    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper} elevation={6}>
                <Typography variant="h6" align="center">
                    Please sign in to create your own memories and like other
                    memories.
                </Typography>
            </Paper>
        );
    }

    return (
        <>
            <Paper className={classes.paper} elevation={6}>
                <form
                    autoComplete="off"
                    noValidate
                    className={`${classes.root} ${classes.form}`}
                    onSubmit={handleSubmit}
                >
                    <Typography variant="h6">
                        {" "}
                        {currentId ? "Updating" : "Creating"} a Memory
                    </Typography>
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
                        multiline
                        minRows={5}
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
                                tags: target.value.split(","),
                            })
                        }
                    />
                    <div className={classes.fileInput}>
                        <input
                            accept="image/*"
                            id="contained-button-file"
                            multiple
                            type="file"
                            style={{ display: "none" }}
                            onChange={(e) => handleUpload(e)}
                        />
                        <label
                            htmlFor="contained-button-file"
                            style={{ width: "100%" }}
                        >
                            <Button
                                variant="contained"
                                component="span"
                                fullWidth
                                size="small"
                                color="default"
                                style={{ marginBottom: "5px" }}
                            >
                                select a memory
                            </Button>
                        </label>
                        <Typography variant="body2" gutterBottom align="center">
                            {uploadPreview.title
                                ? uploadPreview.title
                                : "no image selected"}
                        </Typography>
                        {uploadPreview.img && (
                            <Avatar
                                variant="square"
                                src={uploadPreview?.img}
                                style={{
                                    height: "50%",
                                    width: "75%",
                                    marginBottom: "5px",
                                }}
                            />
                        )}
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
