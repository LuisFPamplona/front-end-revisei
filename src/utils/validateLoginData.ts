type LoginValidationResult = {
  isValid: boolean;
  errors: string[];
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateLoginData = (
  email: string,
  password: string,
): LoginValidationResult => {
  const errors: string[] = [];

  if (!email || email.trim() === "") {
    errors.push("validation.emailRequired");
  } else if (!EMAIL_REGEX.test(email)) {
    errors.push("validation.emailInvalid");
  }

  if (!password || password.trim() === "") {
    errors.push("validation.passwordRequired");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
