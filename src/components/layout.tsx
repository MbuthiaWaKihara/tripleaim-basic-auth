import * as React from "react";

//Mui
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(() => ({
  mainGrid: {
    paddingTop: "1em",
  },
}));

type LayoutProps = {
  children: React.ReactChild;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item lg={4} md={4} />
      <Grid item lg={4} md={4} sm={12} className={classes.mainGrid}>
        {children}
      </Grid>
      <Grid item lg={4} md={4} />
    </Grid>
  );
};

export default Layout;
