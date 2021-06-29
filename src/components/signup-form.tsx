import * as React from "react";
import isEmail from "../utilities/isEmail";

//Mui
import Textfield from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

//gatsby
import { navigate } from "gatsby";

//react query
import { useMutation } from "react-query";
import { signupMutationKey } from "../react-query/keys";
import { signup } from "../react-query/mutations";

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

type gender = {
  value: string;
  label: string;
};

const genders: Array<gender> = [
  {
    value: "male",
    label: "Male",
  },
  {
    value: "female",
    label: "Female",
  },
  {
    value: "other",
    label: "Other",
  },
];

type UserDetails = {
  name: string;
  gender: "male" | "female" | "other";
  professionalNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const initialDetails: UserDetails = {
  name: "",
  gender: "other",
  professionalNumber: "",
  email: "",
  password: "",
  confirmPassword: "",
};

type ErrorDetails = {
  name: {
    error: boolean;
    message: string;
  };
  gender: {
    error: boolean;
    message: string;
  };
  professionalNumber: {
    error: boolean;
    message: string;
  };
  email: {
    error: boolean;
    message: string;
  };
  password: {
    error: boolean;
    message: string;
  };
  confirmPassword: {
    error: boolean;
    message: string;
  };
};

const initialErrors: ErrorDetails = {
  name: {
    error: false,
    message: "",
  },
  gender: {
    error: false,
    message: "",
  },
  professionalNumber: {
    error: false,
    message: "",
  },
  email: {
    error: false,
    message: "",
  },
  password: {
    error: false,
    message: "",
  },
  confirmPassword: {
    error: false,
    message: "",
  },
};

const SignUpForm = () => {
  const classes = useStyles();

  const [details, setDetails] = React.useState(initialDetails);
  const [errors, setErrors] = React.useState(initialErrors);

  const signupMutation = useMutation(signup, {
    mutationKey: signupMutationKey,
    onSuccess: () => {
      localStorage.setItem("TripleaimEmail", details.email);
      localStorage.setItem("TripleaimPassword", btoa(details.password));
      navigate("/home");
    },
  });

  const validate = (): boolean => {
    let newErrorDetails: ErrorDetails = initialErrors;
    //check for empty fields
    if (details.name.trim() === "") {
      newErrorDetails = {
        ...newErrorDetails,
        name: {
          error: true,
          message: "The name field is required",
        },
      };
    }
    if (details.professionalNumber.trim() === "") {
      newErrorDetails = {
        ...newErrorDetails,
        professionalNumber: {
          error: true,
          message: "The number field is required",
        },
      };
    }
    if (details.email.trim() === "") {
      newErrorDetails = {
        ...newErrorDetails,
        email: {
          error: true,
          message: "The email field is required",
        },
      };
    }
    if (details.password.trim() === "") {
      newErrorDetails = {
        ...newErrorDetails,
        password: {
          error: true,
          message: "The password field is required",
        },
      };
    }
    if (details.confirmPassword.trim() === "") {
      newErrorDetails = {
        ...newErrorDetails,
        confirmPassword: {
          error: true,
          message: "The confirm password field is required",
        },
      };
    }

    //check for correct email formatting
    if (details.email.trim() !== "" && !isEmail(details.email.trim())) {
      newErrorDetails = {
        ...newErrorDetails,
        email: {
          error: true,
          message: "Put correct email formatting",
        },
      };
    }

    //check that the password length is at least 6
    const MIN_PASSWORD_LENGTH: number = 6;
    if (
      details.password.trim() !== "" &&
      details.password.length < MIN_PASSWORD_LENGTH
    ) {
      newErrorDetails = {
        ...newErrorDetails,
        password: {
          error: true,
          message: "Password should be at least 6 characters long",
        },
      };
    }

    //check that the confirmation is right
    if (
      details.password.trim() !== "" &&
      details.confirmPassword.trim() !== "" &&
      details.password.trim() !== details.confirmPassword.trim()
    ) {
      newErrorDetails = {
        ...newErrorDetails,
        confirmPassword: {
          error: true,
          message: "The passwords do not match",
        },
      };
    }

    //change errors state
    if (
      newErrorDetails.name.error ||
      newErrorDetails.gender.error ||
      newErrorDetails.professionalNumber.error ||
      newErrorDetails.email.error ||
      newErrorDetails.password.error ||
      newErrorDetails.confirmPassword.error
    ) {
      setErrors(newErrorDetails);
      return false;
    }

    return true;
  };

  const submit = e => {
    e.preventDefault();
    if (validate()) {
      signupMutation.mutate({
        email: details.email,
        password: details.password,
      });
    }
  };

  const changeField = e => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  React.useEffect(() => {
    setErrors(initialErrors);
    //eslint-disable-next-line
  }, [details]);
  return (
    <>
      <form className={classes.form}>
        <Textfield
          variant="outlined"
          label="Name"
          name="name"
          value={details.name}
          onChange={changeField}
          fullWidth
          className={classes.field}
          error={errors.name.error}
          helperText={errors.name.error && errors.name.message}
        />
        <Textfield
          variant="outlined"
          select
          label="Gender"
          fullWidth
          className={classes.field}
          name="gender"
          value={details.gender}
          onChange={changeField}
          error={errors.gender.error}
          helperText={errors.gender.error && errors.gender.message}
        >
          {genders.map(option => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Textfield>
        <Textfield
          variant="outlined"
          type="number"
          label="Professional Number"
          fullWidth
          className={classes.field}
          name="professionalNumber"
          value={details.professionalNumber}
          onChange={changeField}
          error={errors.professionalNumber.error}
          helperText={
            errors.professionalNumber.error && errors.professionalNumber.message
          }
        />
        <Textfield
          variant="outlined"
          label="Email"
          fullWidth
          className={classes.field}
          name="email"
          value={details.email}
          onChange={changeField}
          error={errors.email.error}
          helperText={errors.email.error && errors.email.message}
        />
        <Textfield
          variant="outlined"
          type="password"
          label="Password"
          fullWidth
          className={classes.field}
          name="password"
          value={details.password}
          onChange={changeField}
          error={errors.password.error}
          helperText={errors.password.error && errors.password.message}
        />
        <Textfield
          variant="outlined"
          type="password"
          label="Confirm Password"
          fullWidth
          className={classes.field}
          name="confirmPassword"
          value={details.confirmPassword}
          onChange={changeField}
          error={errors.confirmPassword.error}
          helperText={
            errors.confirmPassword.error && errors.confirmPassword.message
          }
        />
        <Button
          type="submit"
          variant="contained"
          className={classes.button}
          onClick={submit}
          disabled={signupMutation.isLoading}
        >
          Sign Up{" "}
          {signupMutation.isLoading && (
            <CircularProgress className={classes.loadingIndicator} size={20} />
          )}
        </Button>
        {signupMutation.error && (
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

export default SignUpForm;
