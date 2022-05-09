import React, { useState,useEffect, useRef } from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import API from "../services/API";
import { Grid } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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
    },
    menuTile: {
        color: "white",
        textDecoration: "none",
        padding:"10px",
        backgroundColor:"#3f51b5",

    },
    cardView:{
        minWidth: 275,
        padding: 15,
        margin: 10,
        backgroundColor: '#cccccc'
    }

}));

const TableList= () => {
    const classes = useStyles();
    const [currentUser, setCurrentUser] = useState(undefined);
    const [table, setTables] = useState(null)

    useEffect(() => {
        setCurrentUser(AuthService.getCurrentUser());
        if(table == null){
            getTableForUser()
        }
        console.log("XD")
        // if(currentUser == undefined){

        //   console.log(AuthService.getCurrentUser())
        //   getTableForUser()
        // }

    }, [table]);

    const getTableForUser = () =>{
        const user = AuthService.getCurrentUser()
        const username = user.username
        console.log(username)
        API.getTrelloTable(username).then(
            (response) => {
                console.log(response)
                console.log(response.data)
                setTables(response.data)
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

    return (
        <Container>
            <div className="container">
                <Grid>
                    <Grid container spacing={3}>
                        <Grid item ="xs">
                            <header className="jumbotron">
                                <h3>Lista Tablic</h3>
                            </header>
                        </Grid>
                        <Grid item ="xs">
                            <div>
                                <Button color="inherit">
                                    <Link to={"/create"} className={classes.menuTile} >
                                        Stwórz Tablicę
                                    </Link>
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <div>
                    <Grid container spacing={1}>
                        {table && table.map((key) =>{
                            return (
                                <div>
                                    <Card className={classes.cardView}>
                                        <CardContent>
                                            <Typography variant="h5" component="h2">
                                                {key.title}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="big">
                                                <Link to={"/table/"+key.id} className={classes.menuTile} >
                                                    Pokaż
                                                </Link></Button>
                                        </CardActions>
                                    </Card>
                                </div>
                            )
                        })}
                    </Grid>
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

        </Container>
    );
};
export default TableList;