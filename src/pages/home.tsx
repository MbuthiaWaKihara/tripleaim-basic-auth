import * as React from "react";
import Layout from "../components/layout";
import Title from "../components/title";

//gatsby
import { navigate } from "gatsby";

//Mui
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(() => ({
  button: {
    width: "100%",
    marginTop: "3em",
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const logout = () => {
    localStorage.removeItem("TripleaimEmail");
    localStorage.removeItem("TripleaimPassword");
    navigate("/login");
  };

  return (
    <>
      <Layout>
        <>
          <Title title="You're now logged in" />
          <Button
            onClick={logout}
            variant="contained"
            className={classes.button}
          >
            Log out
          </Button>
        </>
      </Layout>
    </>
  );
};

export default HomePage;
