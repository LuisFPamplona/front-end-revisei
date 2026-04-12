export const validateRegisterData = (
  name: string,
  email: string,
  password: string,
): boolean => {
  if (!name || name.trim() === "") {
    return false;
  } else if (!email || email.trim() === "") {
    return false;
  } else if (!password || password.trim() === "") {
    return false;
  } else {
    return true;
  }
};
