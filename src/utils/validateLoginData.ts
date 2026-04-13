export const validateLoginData = (email: string, password: string): boolean => {
  if (!email || email.trim() === "") {
    return false;
  } else if (!password || password.trim() === "") {
    return false;
  } else {
    return true;
  }
};
