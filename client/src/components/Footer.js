import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/bpu991/pypractice">
        PyPractice
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Contributors() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Contributors:  
      {' '}
      <Link color="inherit" href="https://github.com/jshafto">
        Juliet Shafto,
      </Link> {' '}
      <Link color="inherit" href="https://bpu991.github.io./">
        Benjamin Pu,
      </Link> {' '}
      <Link color="inherit" href="https://github.com/traversar">
        Andrew Travers,
      </Link> {' '}
      <Link color="inherit" href="https://jonyalmeida.herokuapp.com">
        Jony Almeida
      </Link>
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
  }
}));

 const Footer = () => {
  const classes = useStyles();

  return (
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          {/* <Typography variant="body1" align="center">My sticky footer can be found here.</Typography> */}
          <Copyright />
          <Contributors />
        </Container>
      </footer>
  );
}

export default Footer;
