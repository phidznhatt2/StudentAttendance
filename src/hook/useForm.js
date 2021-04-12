import React from 'react';

const useForm = (callback, validate) => {
  const [formData, setFormData] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const handleChange = (name, value) => {
    setErrors(validate({ ...formData, [name]: value }));
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    callback();
    /*     if (
      errors &&
      Object.keys(errors).length === 0 &&
      obj.constructor === Object
    ) {
    } */

    // onSubmit?.(formData);
  };

  return { formData, handleChange, handleSubmit, errors };
};

export default useForm;
