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
import AuthService from "../services/auth.service";


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

export default function ModalUserShared(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState(null);
    const [user, setUser] = useState(undefined);
    const [currentUser, setCurrentUser] =  useState(undefined);

    useEffect(()=>{
        if(props.id != null){
            setId(props.id)
        }
        setCurrentUser(AuthService.getCurrentUser());
    },[])

    const createList = () =>{
        if(user != undefined){
            console.log(user)
            console.log(currentUser.username)
            if(currentUser.username === user){
                errorMessage("You can't assign yourself!");
            } else {
                API.addSharedUser(user, id).then(
                    (response) => {
                        console.log(response)
                    correctMessage(response.data)
                    // props.history.push("/table/"+id);
                    setOpen(false)
                    },
                    (error) => {
                        errorMessage(error.response.data);
                    }
                );
            }
        } else {
            errorMessage("Something went wrong!");
        }
      }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onChangeTitle = (e) => {
        const user = e.target.value;
        setUser(user);
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
            Udostępnij
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
                Podaj nazwe uzytkownika
            </header>
            <ValidatorForm  className={classes.form}>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Nazwa użytkownika"
                                name="tablename"
                                autoComplete="tablename"
                                autoFocus
                                value={user}
                                onChange={onChangeTitle}
                                errorMessages={['this field is required']}
                                validators={['required']}
                            />
                        </Grid>
                          <Button type="submit" onClick={createList} fullWidth variant="contained" color="primary" className={classes.submit}>Dodaj</Button>
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