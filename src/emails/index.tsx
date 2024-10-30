import { env } from "@/config/env";
import { sendEmail } from "@/utils/mailer";
import { ForgotEmail } from "./forgot-email";

export const sendForgotEmail = async (username: string, email: string, token: string) => {
  const baseUrl = `${env.FRONTEND_URL}/auth/reset-password`;

  return await sendEmail({
    to: email,
    subject: "Reset your password",
    react: (
      <ForgotEmail
        username={username}
        tokenUrl={`${baseUrl}?email=${email}&token=${token}`}
      />
    ),
  });
};
