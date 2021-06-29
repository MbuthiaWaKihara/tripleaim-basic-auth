import * as React from "react";

//components
import Layout from "../components/layout";
import Title from "../components/title";
import SignUpForm from "../components/signup-form";

//gatsby
import { Link, navigate } from "gatsby";

//Mui
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(() => ({
  tag: {
    textAlign: "center",
    marginTop: 10,
  },
}));

const SignUp = () => {
  const classes = useStyles();

  React.useEffect(() => {
    if (localStorage.getItem("TripleaimEmail")) {
      console.log("perform login");
      navigate("/home");
    }
  }, []);
  return (
    <>
      <Layout>
        <>
          <Title title="Sign Up" />
          <SignUpForm />
          <Typography className={classes.tag}>
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </>
      </Layout>
    </>
  );
};

export default SignUp;
