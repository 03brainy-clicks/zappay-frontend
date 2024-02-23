// Validation function for username
export const validateUsername = (username) => {
  // Check if the username length is between 4 and 19 characters
  return username.length > 3 && username.length < 20;
};

// Validation function for password
export const validatePassword = (password) => {
  // Use a regular expression to check if the password meets certain criteria
  // At least 8 characters, at least one special character, and at least one digit
  const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

// Validation function for name
export const validateName = (name) => {
  // Check if the name length is between 3 and 19 characters
  return name.length >= 3 && name.length < 20;
};
