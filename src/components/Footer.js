import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import classNames from "classnames";

import styles from "../styles/FooterStyles.js";

class Footer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <footer className={classes.footer}>
        <a
          href="https://github.com/MohammedAbidNafi/COVID19-Tracker-Advanced-React"
          target="_blank"
          rel="noopener noreferrer"
          className={classNames(classes.btn, classes.github)}
        >
          Contribute on Github
        </a>
        <a
          href="https://twitter.com/intent/tweet?text=Get the latest Covid-19 updates with Covid-19 India Tracker!&url=https://covid19-case-tracker-india.web.app/"
          target="_blank"
          rel="noopener noreferrer"
          className={classNames(classes.btn, classes.twitter)}
        >
          Share on Twitter
        </a>
        <a
          href="https://github.com/MohammedAbidNafi/COVID19-Tracker-Advanced-React/issues"
          target="_blank"
          rel="noopener noreferrer"
          className={classNames(classes.btn, classes.issue)}
        >
          Report an Issue
        </a>

        <a
          href="https://margsglobal.weebly.com/about-us.html"
          target="_blank"
          rel="noopener noreferrer"
          className={classNames(classes.btn, classes.aboutus)}
        >
          About Us
        </a>
      </footer>
    );
  }
}
export default withStyles(styles)(Footer);
