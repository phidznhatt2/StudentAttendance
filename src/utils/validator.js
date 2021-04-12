const validator = values => {
  const errors = {};

  if (values.hasOwnProperty.call(values, 'accountName')) {
    if (!values.accountName.trim()) {
      errors.accountName = 'Username or E-mail is required!';
    }
  }

  if (values.hasOwnProperty.call(values, 'accountPass')) {
    if (!values.accountPass.trim()) {
      errors.accountPass = 'Password is required!';
    }
  }

  if (values.hasOwnProperty.call(values, 'fullname')) {
    if (!values.fullname.trim()) {
      errors.fullname = 'Full name is required!';
    }
  }

  if (values.hasOwnProperty.call(values, 'username')) {
    if (!values.username.trim()) {
      errors.username = 'Username is required!';
    } else if (values.username.length < 6) {
      errors.username = 'Username needs to be 6 characters or more!';
    } else if (!/^[a-zA-Z0-9]+$/g.test(values.username)) {
      errors.username = 'Username is invalid!';
    }
  }

  if (values.hasOwnProperty.call(values, 'email')) {
    if (!values.email) {
      errors.email = 'Email is required!';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(values.email)) {
      errors.email = 'Email address is invalid!';
    }
  }

  if (values.hasOwnProperty.call(values, 'password')) {
    if (!values.password) {
      errors.password = 'Password is required!';
    } else if (values.password.length < 8) {
      errors.password = 'Password needs to be 8 characters or more!';
    } else if (!/[a-z]/.test(values.password)) {
      errors.password = 'Password must contain at least lower case!';
    } else if (!/[A-Z]/.test(values.password)) {
      errors.password = 'Password must contain at least upper case!';
    } else if (!/[0-9]/.test(values.password)) {
      errors.password = 'Password must contain at least one digit!';
    } else if (!/[#?!@$%^&*-]/.test(values.password)) {
      errors.password = 'Password must contain at least one special character!';
    }
  }

  if (values.hasOwnProperty.call(values, 'password2')) {
    if (!values.password2) {
      errors.password2 = 'Password is required!';
    } else if (values.password2 !== values.password) {
      errors.password2 = 'Password do not match!';
    }
  }

  return errors;
};

export default validator;
