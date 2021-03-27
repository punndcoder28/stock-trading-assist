class Validator {
  constructor() {}

  validatePhone(phone) {
    let validation = {
      isValid: true,
      errorMessage: '',
    };
    let regex = /^\d{10}$/;
    if (phone.length < 1) {
      validation.isValid = false;
      validation.errorMessage = 'Please enter your phone number';
    } else if (!regex.test(phone)) {
      validation.isValid = false;
      validation.errorMessage = 'Please enter a valid phone number';
    }
    return validation;
  }

  validatePassword(password) {
    let validation = {
      isValid: true,
      errorMessage: '',
    };
    if (password.length < 1) {
      validation.isValid = false;
      validation.errorMessage = 'Please enter a password';
    } else if (password.length < 6) {
      validation.isValid = false;
      validation.errorMessage = 'Minimum password length is 6';
    }
    return validation;
  }

  validateName(name) {
    let validation = {
      isValid: true,
      errorMessage: '',
    };
    if (password.length < 1) {
      validation.isValid = false;
      validation.errorMessage = 'Please enter a password';
    }
    return validation;
  }
}

export default validator = new Validator();
