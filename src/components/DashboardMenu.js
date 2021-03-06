import React, { useState, useEffect, Profiler } from "react";
import {Link } from "react-router-dom";
import "../App.css";
import AuthService from "../services/auth.service";
import SwitchAndRoute from "../services/SwitchAndRoute";
import menuHeaderForAllUsers from "../services/MenuTabs";
import menuHeaderForAuthUsers from "../services/MenuTabsForAuthUsers";
import { AppBar, Toolbar, Typography, MenuItem, Menu, Button, IconButton, requirePropFactory } from "@material-ui/core";
import { AccountCircle } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  menuTile: {
    color: "white",
    textDecoration: "none",
    margin:"5px",
  },
  menuItem: {
    color: "black",
    textDecoration: "none",
    padding:"5px",
  }
}));

const DashboardMenu = () => {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [openMenu, setOpen] = useState(false);
  
  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser());
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleMenu = () => {
    setOpen(true);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <Link to={"/"} className={classes.menuTile}> 
              Trello alpha
          </Link>
        </Typography>
        {menuHeaderForAllUsers.map((key) => {
        let keyName = Object.keys(key).toString();
        return (
          <MenuItem>
            <Link to={keyName} color="inherit" className={classes.menuTile}>
              {key[keyName]}
            </Link>
          </MenuItem>
        )}
      )}
        {currentUser && 
          menuHeaderForAuthUsers.map((key) => {
            let keyName = Object.keys(key).toString();
            if(currentUser.roles[0]!="ROLE_ADMIN"){
              if(keyName == "/add-post"){
                
              } else{
                return (
                  <MenuItem>
                    <Link to={keyName} color="inherit" className={classes.menuTile}>
                      {key[keyName]}
                    </Link>
                  </MenuItem>
                )
              }
            } else {
              return (
                <MenuItem>
                  <Link to={keyName} color="inherit" className={classes.menuTile}>
                    {key[keyName]}
                  </Link>
                </MenuItem>
              )
            }
            
          }
        
        )}
          {currentUser ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={openMenu}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={openMenu}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link to={"/profile"} className={classes.menuItem}>
                    {currentUser.username}
                  </Link>
                </MenuItem>
                
                <MenuItem onClick={handleClose}>
                <a href="/login" className={classes.menuItem} onClick={logOut}>
                  LogOut
                </a>
                </MenuItem>
                {/* <MenuItem >
                <a href="/tables" className={classes.menuItem} >
                  Tables
                </a>
                </MenuItem> */}
              </Menu>
              </div>
          ):(
            <div>
          <Button color="inherit">
            <Link to={"/login"} className={classes.menuTile}>
                Login
              </Link>
          </Button>
          <Button color="inherit">
            <Link to={"/register"} className={classes.menuTile}>
                Rejestracja
              </Link>
          </Button>
          </div>
          )}
        </Toolbar>
      </AppBar>
      <div className="container mt-5">
        <SwitchAndRoute/>
      </div>
    </div>
  );
};

export default DashboardMenu