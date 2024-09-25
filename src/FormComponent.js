import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const FormComponent = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://testkasarla.netlify.app/api/form', data);
      if (response.status === 200) {
        alert('Form submitted successfully!');
      }
    } catch (error) {
      console.error('Error submitting the form', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Contact Form</h2>
      <div>
        <label>Name:</label>
        <input type="text" {...register('name', { required: true })} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" {...register('email', { required: true })} />
      </div>
      <div>
        <label>Phone:</label>
        <input type="text" {...register('phone', { required: true })} />
      </div>
      <div>
        <label>Message:</label>
        <textarea {...register('message', { required: true })} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
