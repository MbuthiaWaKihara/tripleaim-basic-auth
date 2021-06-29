import * as React from "react";

//Mui
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(() => ({
  title: {
    textAlign: "center",
  },
}));

type Props = {
  title: string;
};

const Title: React.FC<Props> = ({ title }) => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h3" color="primary" className={classes.title}>
        {title}
      </Typography>
    </>
  );
};

export default Title;
