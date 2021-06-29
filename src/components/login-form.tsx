import * as React from "react";
import isEmail from "../utilities/isEmail";

//Mui
import Textfield from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

//react query
import { useMutation } from "react-query";
import { loginMutationKey } from "../react-query/keys";
import { login } from "../react-query/mutations";

//gatsby
import { navigate } from "gatsby";

const useStyles = makeStyles(() => ({
  form: {
    marginTop: 10,
  },
  field: {
    marginTop: 5,
    marginBottom: 5,
  },
  button: {
    width: "100%",
    marginTop: 5,
  },
  loadingIndicator: {
    marginLeft: 5,
  },
  serverError: {
    marginTop: 5,
  },
}));

export type Credentials = {
  email: string;
  password: string;
};

export type ErrorDetails = {
  email: {
    error: boolean;
    message: string;
  };
  password: {
    error: boolean;
    message: string;
  };
};

const initialCredentials: Credentials = {
  email: "",
  password: "",
};

const initialErrors: ErrorDetails = {
  email: {
    error: false,
    message: "",
  },
  password: {
    error: false,
    message: "",
  },
};

const LoginForm = () => {
  const classes = useStyles();

  const [credentials, setCredentials] = React.useState(initialCredentials);
  const [errors, setErrors] = React.useState(initialErrors);

  const loginMutation = useMutation(login, {
    mutationKey: loginMutationKey,
    onSuccess: () => {
      localStorage.setItem("TripleaimEmail", credentials.email);
      localStorage.setItem("TripleaimPassword", btoa(credentials.password));
      navigate("/home");
    },
  });

  const validate = (): boolean => {
    let newErrorDetails: ErrorDetails = initialErrors;
    //check for empty fields
    if (credentials.email.trim() === "") {
      newErrorDetails = {
        ...newErrorDetails,
        email: {
          error: true,
          message: "The email field is required",
        },
      };
    }
    if (credentials.password.trim() === "") {
      newErrorDetails = {
        ...newErrorDetails,
        password: {
          error: true,
          message: "The password field is required",
        },
      };
    }

    //check for correct email formatting
    if (credentials.email.trim() !== "" && !isEmail(credentials.email.trim())) {
      newErrorDetails = {
        ...newErrorDetails,
        email: {
          error: true,
          message: "Put correct email formatting",
        },
      };
    }

    //change errors state
    if (newErrorDetails.email.error || newErrorDetails.password.error) {
      setErrors(newErrorDetails);
      return false;
    }

    return true;
  };

  const submit = e => {
    e.preventDefault();
    if (validate()) {
      loginMutation.mutate(credentials);
    }
  };

  const changeField = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  //clear errors on user typing
  React.useEffect(() => {
    setErrors(initialErrors);
    //eslint-disable-next-line
  }, [credentials]);

  return (
    <>
      <form className={classes.form}>
        <Textfield
          variant="outlined"
          label="Email"
          name="email"
          value={credentials.email}
          onChange={changeField}
          error={errors.email.error}
          helperText={errors.email.error && errors.email.message}
          fullWidth
          className={classes.field}
        />
        <Textfield
          variant="outlined"
          type="password"
          label="Password"
          value={credentials.password}
          name="password"
          onChange={changeField}
          error={errors.password.error}
          helperText={errors.password.error && errors.password.message}
          fullWidth
          className={classes.field}
        />
        <Button
          type="submit"
          variant="contained"
          className={classes.button}
          onClick={submit}
          disabled={loginMutation.isLoading}
        >
          Log in{" "}
          {loginMutation.isLoading && (
            <CircularProgress className={classes.loadingIndicator} size={20} />
          )}
        </Button>
        {loginMutation.error && (
          <Typography
            color="secondary"
            variant="caption"
            className={classes.serverError}
          >
            An error occured. Check your details and your internet connection
            and try again
          </Typography>
        )}
      </form>
    </>
  );
};

export default LoginForm;
