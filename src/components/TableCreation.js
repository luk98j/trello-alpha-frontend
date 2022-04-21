import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Container } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { AddAlarmOutlined, CenterFocusStrong } from "@material-ui/icons";
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link } from "react-router-dom";
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import Grid from '@material-ui/core/Grid';
import {  MenuItem } from "@material-ui/core";

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
  
  const TableCreation= () => {
    const classes = useStyles();
   
  
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
                                //value=tablename
                              //  onChange={this.handleChange}
                                errorMessages={['this field is required']}
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs>
                            <SelectValidator
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Widoczność"
                                name="visiblility"
                                autoComplete="visiblility"
                                autoFocus
                              //  onChange={this.handleChange}
                                errorMessages={['this field is required']}
                                validators={['required']}
                                
                            >
                         <MenuItem value={"Prywatna"}>Prywatna</MenuItem>
                         <MenuItem value={"Publiczna"}>Publiczna</MenuItem>
                        
                         </SelectValidator>
                  
                        </Grid>
                        <Grid item xs>
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
                        </Grid>
                        </Grid>
                    

                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>OK</Button>

                </ValidatorForm>
        
      </Container>
    );
  };
  export default TableCreation;