import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../assets/logo-no-background.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import axios from "axios";
import Avatar from "./Avatar";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { NavDropdown } from "react-bootstrap";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      // console.log(err);
    }
  };

  const title = <i className="far fa-plus-square"></i>;
  const addPostIcon = (
    <NavDropdown title={title} id="basic-nav-dropdown">
      <NavDropdown.Item
        as={NavLink}
        to="/songs/create"
        // className={styles.NavDropdown}
      >
        Song
      </NavDropdown.Item>
      <NavDropdown.Item
        as={NavLink}
        to="/posts/create"
        // className={styles.NavDropdown}
      >
        Post
      </NavDropdown.Item>
    </NavDropdown>
  );
  const loggedInIcons = (
    <>
      <>
        <NavLink
          className={styles.NavLink}
          activeClassName={styles.Active}
          to="/wall"
        >
          <i className="fa-solid fa-icons"></i>Wall
        </NavLink>
        <NavLink
          className={styles.NavLink}
          activeClassName={styles.Active}
          to="/miced"
        >
          <i className="fas fa-microphone-alt"></i>Mic'd
        </NavLink>
        <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
          <i className="fas fa-sign-out-alt"></i>Sign out
        </NavLink>
        <NavLink
          className={styles.NavLink}
          to={`/profiles/${currentUser?.profile_id}`}
        >
          <Avatar
            src={currentUser?.profile_avatar}
            text="Profile"
            height={40}
          />
        </NavLink>
      </>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className="fa-solid fa-arrow-right-to-bracket"></i> Sign In
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signup"
      >
        <i className="fas fa-user-plus"></i> Sign Up
      </NavLink>
    </>
  );

  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top"
    >
      <NavLink to="/">
        <Navbar.Brand>
          <img className={styles.Logo} src={logo} alt="logo" height="43" />
        </Navbar.Brand>
      </NavLink>
      {currentUser && addPostIcon}
      <Navbar.Toggle
        ref={ref}
        onClick={() => setExpanded(!expanded)}
        aria-controls="basic-navbar-nav"
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink
            exact
            className={styles.NavLink}
            activeClassName={styles.Active}
            to="/"
          >
            <i className="fa-solid fa-home"></i> Home
          </NavLink>
          {currentUser ? loggedInIcons : loggedOutIcons}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
