import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import CodeIcon from '@material-ui/icons/Code';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const FormSchema = yup.object().shape({
  customerId: yup.string().required(),
  model: yup.string().required(),
  datapath: yup.string().required()
});

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 1000,
});

const PredictionForm = () => {
  const classes = useStyles();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(FormSchema)
  });
  const onSubmit = useCallback(async (data) => {
    try {
      await axiosInstance.post('predictions', data);
      toast("Task added to the queue!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error("Error tring add to the queue!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, []);


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CodeIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Try Predict
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="customerId"
            label="Customer Id"
            name="customerId"
            autoFocus
            error={errors.customerId}
            helperText={errors.customerId && errors.customerId.message}
            {...register("customerId")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="model"
            label="Model"
            id="model"
            error={errors.model}
            helperText={errors.model && errors.model.message}
            {...register("model")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="datapath"
            label="Datapath"
            id="datapath"
            error={errors.datapath}
            helperText={errors.datapath && errors.datapath.message}
            {...register("datapath")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
};

export default PredictionForm;