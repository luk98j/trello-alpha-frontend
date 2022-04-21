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
  
  const TableList= () => {
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
          <h3>Lista Tablic</h3>
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
             <Button color="inherit">
             <Link to={"/create"} className={classes.menuTile}>
                Stwórz Tablicę
            </Link>
          </Button>
      </Container>
    );
  };
  export default TableList;