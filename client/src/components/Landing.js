import React from "react";
import { NavLink } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/styles";

import splash from "../images/splash.png";
import splashEndOne from "../images/splash_endblock1.jpeg";
import splashEndTwo from "../images/splash_endblock2.jpeg";

const useStyles = makeStyles((theme) => ({
  topBlock: {
    paddingTop: 150,
    paddingBottom: 100,
    backgroundColor: "rgba(255,255,255,0.7)",
    backgroundBlendMode: "lighten",
    backgroundImage: `url(${splash})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  midBlock: {
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: theme.palette.primary.light,
  },
  endBlock: {
    paddingTop: 100,
    paddingBottom: 25,
    alignItems: "center",
  },
  img1: {
    backgroundImage: `url(${splashEndOne})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: 250,
    width: 250,
    borderRadius: "50%",
    margin: "0 auto",
  },

  img2: {
    backgroundImage: `url(${splashEndTwo})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: 250,
    width: 250,
    borderRadius: "50%",
    margin: "0 auto",
  },
  imageContainer: {
    order: -1,
    [theme.breakpoints.down("xs")]: {
      order: 2,
    },
  },
  imgSection: {
    marginBottom: 80,
  },
}));
const LandingPage = () => {
  const classes = useStyles();

  return (
    // <img src={splash} alt="coding splash image"/>
    <>
      <div className={classes.topBlock}>
        <Container maxWidth='md'>
          <Typography
            component='h1'
            variant='h2'
            color='textPrimary'
            gutterBottom>
            PyPractice
          </Typography>
          <Typography variant='h5' color='textSecondary' paragraph>
            Create your account and start learning to code today.
          </Typography>
          <div>
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  component={NavLink}
                  to='/problems'
                  variant='contained'
                  color='primary'>
                  Start Coding
                </Button>
              </Grid>
              <Grid item>
                <Button
                  component={NavLink}
                  to='/signup'
                  variant='outlined'
                  color='primary'>
                  Create Account
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <div className={classes.midBlock} />
      <Container className={classes.endBlock}>
        <Grid
          container
          className={classes.imgSection}
          component={Container}
          maxWidth='md'
          justify='space-around'
          alignItems='center'>
          <Grid item sm={4}>
            <Typography variant='h4' gutterBottom>
              Why Python?
            </Typography>
            <Typography variant='h6' paragraph gutterBottom>
              Python is a modern programming language with powerful features
              and clean syntax. It's used for everything from building novel
              artificial intelligences and powering advanced data architecture,
              to simplifying administrative tasks and tinkering with widgets. It's
              beloved by experienced developers and laypeople alike.
            </Typography>
          </Grid>
          <Grid item sm={5}>
            <div className={classes.img1} />
          </Grid>
        </Grid>
        <Divider variant='middle' style={{ marginBottom: "50px" }} />
        <Grid
          container
          className={classes.imgSection}
          component={Container}
          maxWidth='md'
          justify='space-around'
          alignItems='center'>
          <Grid item sm={4}>
            <Typography variant='h4' gutterBottom>
              How does PyPractice work?
            </Typography>
            <Typography variant='h6' paragraph gutterBottom>
              Start with the basics, and work your way through increasingly
              complex problems as you learn the fundamentals of Python programming.
              Soon you'll be ready to use Python for your goals and projects. Make
              something brand new—or just make your existing tasks a little easier.
              Isn't it time you gave Python a try?
            </Typography>
          </Grid>
          <Grid item sm={5} className={classes.imageContainer}>
            <div className={classes.img2} />
          </Grid>
        </Grid>
        <Divider variant='middle' style={{ marginBottom: "50px" }} />
        <Grid container direction='column' align='center'>
          <Typography variant='h5' gutterBottom>
            What are you waiting for?
          </Typography>
          <Button
            component={NavLink}
            to='/problems'
            size='large'
            variant='outlined'
            color='primary'>
            Start Coding
          </Button>
        </Grid>
      </Container>
    </>
  );
};

export default LandingPage;
