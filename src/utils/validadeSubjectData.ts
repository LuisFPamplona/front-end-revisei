export const validadeSubjectData = (name: string) => {
  if (!name || name.trim() === "") {
    return false;
  } else {
    return true;
  }
};
