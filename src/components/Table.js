import React, { useState,useEffect, useRef } from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
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
import ModalListCreation from '../modals/ModalListCreation';
import ModalCardCreation from '../modals/ModalCardCreation'
import ModalUserShared from '../modals/ModalUserShared'
import ModalSharedUserList from '../modals/ModalSharedUserList'
import CardList from "./CardList";

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
        margin:"10px",
        backgroundColor:"#3f51b5",

    },
    cardView:{
        minWidth: 175,
        minHeight: 700,
        padding: 15,
        margin: 10,
        backgroundColor: '#cccccc'
    },
    marginTen:{
        margin:"10px"
    },
    marginTen:{
        margin:"10px",
        padding: "10px",
        border: "1px solid black"
    }

}));

const Table= () => {
    const { id } = useParams()
    const classes = useStyles();
    const [currentUser, setCurrentUser] = useState(undefined);
    const [tableInfo, setTableInfo] = useState(undefined);
    const [table, setTables] = useState(null)

    useEffect(() => {
        
        setCurrentUser(AuthService.getCurrentUser());
        if(table == null){
            getTrelloTableInfo()
            getTableForUser()
        }
        console.log(tableInfo)
        console.log(table)
        // if(currentUser == undefined){

        //   console.log(AuthService.getCurrentUser())
        //   getTableForUser()
        // }

    }, [table, tableInfo]);

    const getTableForUser = () =>{
        API.getTrelloList(id).then(
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

    const getTrelloTableInfo = () =>{
        API.getTrelloTableInfo(id).then(
            (response) => {
                console.log(response)
                console.log(response.data)
                setTableInfo(response.data)
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
                    <Grid container spacing={2}>
                        <Grid item ="xs">
                            <header className="jumbotron">
                                
                                <h3>{tableInfo != undefined ?(
                                    <div>{tableInfo.title}</div>
                                ):(
                                    <div></div>
                                )}</h3>
                            </header>
                        </Grid>
                        <Grid item ="xs">
                            <Grid>
                            <div>
                                <ModalListCreation id={id}/>
                                {/* <Button className={classes.menuTile}>
                                    Dodaj List??
                                </Button> */}
                            </div>
                            </Grid>
                        </Grid>
                        {tableInfo && tableInfo.owner == currentUser.username ?(
                            
                                <div className={classes.marginTen}>
                                <Grid container spacing={1}>
                                <Grid item ="xs">
                                    <ModalUserShared id={id}/>
                                </Grid>
                                <Grid item ="xs">
                                    <ModalSharedUserList id={id}/>
                                </Grid>
                                </Grid>
                                    </div>
                        ):(
                            <div>
                                {tableInfo && tableInfo.owner != undefined ? (
                                    <div className={classes.marginTen}>
                                        Tablica udost??pniona przez: <b>{tableInfo.owner}</b>
                                    </div>
                                ):(
                                    <div>
                                    </div>
                                )}
                            </div>
                        )}

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
                                            <Grid>
                                            <CardList id={key.id} />
                                            <ModalCardCreation id={key.id}/>
                                            {/* <Button size="big">
                                                {/* <Link to={"/table"} className={classes.menuTile} >
                                                    Dodaj kart??
                                                </Link></Button> */} 
                                                </Grid>
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
export default Table;