export const testEmail = (email: string) => {
  let pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return pattern.test(email);
};

// 8-20 characters - least one uppercase character - least one lowercase character - least one number - least one special character
export const testPassword = (password: string) => {
  let pattern =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&#^])([a-zA-Z0-9@$!%*?&#^]{8,20})$/;
  return pattern.test(password);
};
