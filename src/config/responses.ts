export const res = (success: boolean, message: string) => {
  return { success, message };
};

export const authResponses = {
  credentialsInvalid: res(false, "Credentials are invalid or wrong!"),
  notVerified: res(false, "Please verify your account to login!"),
  logged: res(true, "Login completed successfully!"),
  googleLogged: res(true, "Google login completed successfully!"),
  facebookLogged: res(true, "Facebook login completed successfully!"),
  notAuthorized: res(false, "User is not authorized!"),
  authorized: res(false, "User authorized!"),
  emailNotSent: res(false, "Something went wrong while sending the email!"),
  forgotted: res(true, "Email sent successfully, please reset your password!"),
  passwordChanged: res(true, "Password changed successfully!"),
  notValid: res(false, "Something went wrong!"),
};
