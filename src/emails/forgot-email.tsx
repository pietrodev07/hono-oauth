type ForgotEmailProps = { username: string; tokenUrl: string };

export const ForgotEmail = ({ username, tokenUrl }: ForgotEmailProps) => {
  return (
    <section>
      <h1>Welcome, {username}!</h1>

      <p>You requested a password reset.</p>
      <a href={`${tokenUrl}`}>Click here to reset your password</a>
      <p>If you did not request a password reset, please ignore this email.</p>
    </section>
  );
};
