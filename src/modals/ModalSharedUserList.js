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
    minHeight: '45%'
  },
  p1:{
    margin:"10px",
    },
    rowLikeTable:{
        border: "1px solid black",
        margin: "10px",
        padding: "15px",
        minHeight: "35px"
    },
    deleteButton: {
        color: "white",
        backgroundColor: "rgb(216, 28, 0)",
        float:"right",
        
    },
}));

export default function ModalSharedUserList(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState(null);
    const [usersList, setUsersList] = useState(undefined);
    const [currentUser, setCurrentUser] =  useState(undefined);

    useEffect(()=>{
        if(props.id != null){
            setId(props.id)
            getSharedUser(props.id)
        }
        
    },[])

    const getSharedUser = (id) =>{
        console.log(id)
        API.getSharedUser(id).then(
            (response) => {
                console.log(response)
                setUsersList(response.data)
            // props.history.push("/table/"+id);
            // setOpen(false)
            },
            (error) => {
                errorMessage(error.response.data);
            }
        );
      }

    const handleOpen = () => {
        setOpen(true);
        getSharedUser(props.id)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteUserFromList = (userName) => {
        API.deleteSharedUser(userName, id).then(
            (response) => {
                console.log(response)
                getSharedUser(id)
            // props.history.push("/table/"+id);
            // setOpen(false)
            },
            (error) => {
                errorMessage(error.response.data);
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
        <Button type="button" onClick={handleOpen} variant="contained" color="primary" className={classes.p1}>
            Sprawdz udostepnienia
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
                <h3><center>List Udostepnionych uzytkowników</center></h3>
                {usersList && usersList.map((key) =>{
                    console.log(key)
                                return (
                                    <div className={classes.rowLikeTable}>
                                        {key.username}
                                    <Button type="button" onClick={()=>deleteUserFromList(key.username)} className={classes.deleteButton}>
                                        Usuń
                                    </Button>
                                    </div>
                                )
                            })}
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