import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import './PredictionForm.css';

const FormSchema = yup.object().shape({
  customerId: yup.string().required(),
  model: yup.string().required(),
  datapath: yup.string().required()
});

const PredictionForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(FormSchema)
  });
  const onSubmit = (data) => {
    
  };


  return (
    <div className="prediction-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>CustomerId</label>
          <input type="text" {...register("customerId")} />
          {errors.customerId && <p className="error">{errors.customerId.message}</p>}
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Model</label>
          <input type="text" {...register("model")} />
          {errors.model && <p className="error">{errors.model.message}</p>}
        </div>
        <div>
          <label>Data path</label>
          <input type="text" {...register("datapath")} />
          {errors.datapath && <p className="error">{errors.datapath.message}</p>}
        </div>
        <input type="submit" />
      </form>
    </div>

  );
};

export default PredictionForm;