import React, { useEffect,useState } from 'react';
import AuthService from "../services/auth.service";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import API from "../services/API";
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import Grid from '@material-ui/core/Grid';
import { ToastContainer, toast } from 'react-toastify';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow:'scroll'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '35%',
        height: 'auto',
    },
    p1:{
        margin:"10px",
    },
    description:{
        width:"100%",
        border:"1px solid gray"
    },
    card: {
        maxWidth: 300,
        minWidth: 300,
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        },
    },
    content: {
        textAlign: "left",
        padding: theme.spacing.unit * 3,
    },
  
}));

export default function ModalCardCreation(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [currentUser] = useState(AuthService.getCurrentUser());
    const [id, setId] = React.useState(props.id);
    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description)
    const [comment, setComment] = useState(null)
    const [todo, setTodo]=useState(null)
    const [comments, setComments] = useState(null)
    const [todos, setTodos] = useState(null)
    useEffect(()=>{
        if(props.id != null){
            setId(props.id);
            getCommentFromCard(props.id);
            getTodoFromCard(props.id);
        }
    },[])

    const createCard = () =>{
        if(title != undefined){
            console.log(props)
            API.editTrelloCard(title, id, description).then(
                (response) => {
                    correctMessage(response.data)
                    // props.history.push("/table/"+id);
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    errorMessage(resMessage);
                }
            );
        } else {
            errorMessage("Title missing!");
        }
    }

    const createComment = () =>{
        if(title != undefined){
            console.log(props)
            API.createTrelloComment(id, currentUser.id, comment).then(
                (response) => {
                    correctMessage(response.data)
                    // props.history.push("/table/"+id);
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    errorMessage(resMessage);
                }
            );
        } else {
            errorMessage("Title missing!");
        }
    }

    const createTodo = () =>{
        if(title != undefined){
            console.log(props)
            API.createTrelloTodo(id, currentUser.id, todo).then(
                (response) => {
                    correctMessage(response.data)
                    // props.history.push("/table/"+id);
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    errorMessage(resMessage);
                }
            );
        } else {
            errorMessage("Title missing!");
        }
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onChangeTitle = (e) => {
        const title = e.target.value;
        setTitle(title);
    };

    const onChangeDescription = (e) =>{
        const dsc = e.target.value;
        setDescription(dsc);
    }
    const onChangeComment = (e) =>{
        const dsc = e.target.value;
        setComment(dsc);
    }
    const onChangeTodo = (e) =>{
        const dsc = e.target.value;
        setTodo(dsc);
    }

    const getTodoFromCard = (id) =>{
        API.getTrelloTodo(id).then(
            (response) => {
                console.log(response)
                console.log(response.data)
                setTodos(response.data)
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                errorMessage(resMessage);
            }
        );
    }


    const getCommentFromCard = (id) =>{
        API.getTrelloComment(id).then(
            (response) => {
                console.log(response)
                console.log(response.data)
                setComments(response.data)
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                errorMessage(resMessage);
            }
        );
    }


    const errorMessage = (text) =>{
        toast.error(text, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const correctMessage = (text) =>{
        toast.done(text, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    return (
        <div>
            <Card className={classes.card}  onClick={handleOpen}>
                <CardContent className={classes.content}>
                    <Typography
                        className={"MuiTypography--h5"}
                        variant={"h6"}
                        gutterBottom
                    >
                        {title}
                    </Typography>
                </CardContent>
            </Card>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <header className="jumbotron">
                            Nazwa karty
                        </header>
                        <ValidatorForm  className={classes.form}>
                            <Grid container spacing={3}>
                                <Grid item xs>
                                    <input
                                        id="outlined-multiline-flexible"
                                        label="Nazwa karty"
                                        value={title}
                                        onChange={onChangeTitle}
                                        className={classes.description}
                                    />
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        label="Opis karty"
                                        multiline
                                        //maxRows={10}
                                        rows={15}
                                        className={classes.description}
                                        value={description}
                                        onChange={onChangeDescription}
                                    />
                                </Grid>
                                <Button type="submit" onClick={createCard} fullWidth variant="contained" color="primary" className={classes.submit}>Edytuj</Button>
                            </Grid>
                        </ValidatorForm>
                        <br></br>
                        <header className="jumbotron">
                            ZADANIA
                        </header>
                        <br></br>
                        {todos && todos.map((key) =>{
                            return (
                                <div>
                                    <Card className={classes.cardView}>
                                        <CardContent>
                                            <Typography variant="h5" component="h2">
                                                {key.todo}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </div>
                            )
                        })}
                        <ValidatorForm  className={classes.form}>
                            <Grid container spacing={3}>
                                <Grid item xs>
                                    <input
                                        label="Zadanie"
                                        className={classes.description}
                                        value={todo}
                                        onChange={onChangeTodo}
                                    />
                                </Grid>
                                <Button type="submit" onClick={createTodo} fullWidth variant="contained" color="primary" className={classes.submit}>Dodaj Zadanie</Button>
                            </Grid>
                        </ValidatorForm>
                        <br></br>
                        <header className="jumbotron">
                            KOMENTARZE
                        </header>
                        <br></br>
                        {comments && comments.map((key) =>{
                            return (
                                <div>
                                    <Card className={classes.cardView}>
                                        <CardContent>
                                            <Typography variant="h5" component="h2">
                                                {key.comment}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </div>
                            )
                        })}
                        <ValidatorForm  className={classes.form}>
                            <Grid container spacing={3}>
                                <Grid item xs>
                                    <input
                                        label="Komentarz"
                                        className={classes.description}
                                        value={comment}
                                        onChange={onChangeComment}
                                    />
                                </Grid>
                                <Button type="submit" onClick={createComment} fullWidth variant="contained" color="primary" className={classes.submit}>Dodaj komentarz</Button>
                            </Grid>
                        </ValidatorForm>

                    </div>
                </Fade>
            </Modal>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}