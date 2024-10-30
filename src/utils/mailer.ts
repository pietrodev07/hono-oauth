import { env } from "@/config/env";
import { CreateEmailOptions, Resend } from "resend";

type EmailOptions = Omit<CreateEmailOptions, "from">;

const resend = new Resend(env.RESEND_KEY);

export const sendEmail = async (options: EmailOptions) => {
  return await resend.emails.send({
    from: env.RESEND_EMAIL,
    to: options.to,
    subject: options.subject,
    react: options.react,
  });
};
