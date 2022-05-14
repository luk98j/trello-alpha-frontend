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
import ModalCardCreation from '../modals/ModalCardCreation';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles((theme) => ({
    root: {
        
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
        minWidth: 200,
        minHeight: 200,
        padding: '20px',
        margin: '10px',
        backgroundColor: '#cccccc',
        border:'1px solid black',
    },
    gridList: {
        
       height:'100%'
      },
    container:{
        width: '50%'
    }

}));

export default function CardList(props){
    const [id, setId ] = useState(undefined);
    const classes = useStyles();
    const [currentUser, setCurrentUser] = useState(undefined);
    const [tableInfo, setTableInfo] = useState(undefined);
    const [cards, setCards] = useState(null)

    useEffect(() => {
        if(props.id != null){
            setId(props.id)
            getCardForList(props.id)
        }
    }, []);

    const getCardForList = (id) =>{
        API.getTrelloCard(id).then(
            (response) => {
                console.log(response)
                console.log(response.data)
                setCards(response.data)
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
        
            <div className={classes.container}>
                <div>
                    <GridList className={classes.gridList}>
                        {cards && cards.map((key) =>{
                            return (
                                <div>
                                    <Card className={classes.cardView}>
                                        <CardContent>
                                            <Typography variant="h5" component="h2">
                                                {key.title}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </div>
                            )
                        })}
                    </GridList >
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
            </div>
           

    );
};
