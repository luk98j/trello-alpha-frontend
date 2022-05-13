import React, { useEffect,useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import API from "../services/API";
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import Grid from '@material-ui/core/Grid';
import { ToastContainer, toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '35%',
    height: '25%'
  },
  p1:{
    margin:"10px",
}
}));

export default function ModalCardCreation(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState(null);
    const [title, setTitle] = useState(undefined);

    useEffect(()=>{
        if(props.id != null){
            setId(props.id)
        }
    },[])

    const createCard = () =>{
        if(title != undefined){
            console.log(props)
            API.createTrelloCard(title, id).then(
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
        <Button type="button" onClick={handleOpen} variant="contained" color="primary" className={classes.p1}>
            Dodaj kartę
        </Button>
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
                Podaj nazwe karty
            </header>
            <ValidatorForm  className={classes.form}>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Nazwa Karty"
                                name="tablename"
                                autoComplete="tablename"
                                autoFocus
                                value={title}
                                onChange={onChangeTitle}
                                errorMessages={['this field is required']}
                                validators={['required']}
                            />
                        </Grid>
                          <Button type="submit" onClick={createCard} fullWidth variant="contained" color="primary" className={classes.submit}>Stwórz</Button>
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