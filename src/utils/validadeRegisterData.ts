type RegisterValidationResult = {
  isValid: boolean;
  errors: string[];
};

const SPECIAL_CHAR_REGEX = /[^A-Za-z0-9]/;
const UPPERCASE_REGEX = /[A-Z]/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateRegisterData = (
  name: string,
  email: string,
  password: string,
): RegisterValidationResult => {
  const errors: string[] = [];

  if (!name || name.trim() === "") {
    errors.push("validation.nameRequired");
  }

  if (!email || email.trim() === "") {
    errors.push("validation.emailRequired");
  } else if (!EMAIL_REGEX.test(email)) {
    errors.push("validation.emailInvalid");
  }

  if (!password || password.trim() === "") {
    errors.push("validation.passwordRequired");
  } else {
    if (password.length < 8) {
      errors.push("validation.passwordMinLength");
    }

    if (!UPPERCASE_REGEX.test(password)) {
      errors.push("validation.passwordUppercase");
    }

    if (!SPECIAL_CHAR_REGEX.test(password)) {
      errors.push("validation.passwordSpecial");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
