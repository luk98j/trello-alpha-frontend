import React, { useState, useEffect, useRef } from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link } from "react-router-dom";
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import Grid from '@material-ui/core/Grid';
import {  MenuItem } from "@material-ui/core";
import AuthService from "../services/auth.service";
import API from "../services/API";

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: "450px",
      height: "275px",
      margin:"5px",
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    typ: {
      height:"50px"
    }
    
  }));
  
  const TableCreation= (props) => {
    const classes = useStyles();
    const [currentUser, setCurrentUser] = useState(undefined);
    const [title, setTitle] = useState(undefined);
    useEffect(() => {
      setCurrentUser(AuthService.getCurrentUser());
      console.log(currentUser)
    }, []);

    const onChangeTitle = (e) => {
      const title = e.target.value;
      setTitle(title);
    };

    const createTable = () =>{
      if(title != undefined){
      API.createTrelloTable(currentUser.username, title).then(
        (response) => {
          correctMessage(response.data)
          props.history.push("/tables");
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
      <Container>
      <div className="container">
        <header className="jumbotron">
          <h3>Stwórz Tablice</h3>
        </header>
          <div>
          </div>
      </div>
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
            <ValidatorForm  className={classes.form}>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Nazwa Tablicy"
                                name="tablename"
                                autoComplete="tablename"
                                autoFocus
                                value={title}
                                onChange={onChangeTitle}
                                errorMessages={['this field is required']}
                                validators={['required']}
                            />
                        </Grid>
                        {/* <Grid item xs>
                            <SelectValidator
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Widoczność"
                                name="visiblility"
                                autoComplete="visiblility"
                                autoFocus
                                onChange={this.handleChange}
                                errorMessages={['this field is required']}
                                validators={['required']}
                                
                            >
                         <MenuItem value={"Prywatna"}>Prywatna</MenuItem>
                         <MenuItem value={"Publiczna"}>Publiczna</MenuItem>
                        
                         </SelectValidator>
                  
                        </Grid> */}
                        {/* <Grid item xs>
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Członkowie"
                                name="members"
                                autoComplete="members"
                                autoFocus
                                //value=members
                              //  onChange={this.handleChange}
                                errorMessages={['this field is required']}
                                validators={['required']}
                            />
                        </Grid> */}
                          <Button type="submit" onClick={createTable} fullWidth variant="contained" color="primary" className={classes.submit}>Stwórz</Button>
                        </Grid>
                    

                    

                </ValidatorForm>
        
      </Container>
    );
  };
  export default TableCreation;