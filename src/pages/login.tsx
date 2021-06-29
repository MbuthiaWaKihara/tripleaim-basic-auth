import * as React from "react";
import Layout from "../components/layout";
import LoginForm from "../components/login-form";
import Title from "../components/title";
import { Link } from "gatsby";

//Mui
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(() => ({
  tag: {
    textAlign: "center",
    marginTop: 10,
  },
}));

const Login = () => {
  const classes = useStyles();
  return (
    <>
      <Layout>
        <>
          <Title title="Login" />
          <LoginForm />
          <Typography className={classes.tag}>
            Don't have an account? <Link to="/">Sign Up</Link>
          </Typography>
        </>
      </Layout>
    </>
  );
};

export default Login;
