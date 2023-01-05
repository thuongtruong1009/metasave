import Mailgen from "mailgen";
import * as dotenv from "dotenv";
dotenv.config();

const emailTemplate = (toUserEmail: string, emailToken: string) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Metasave",
      link: "https://metasave.vercel.app/",
      logo: "https://metasave.vercel.app/assets/metasave_logo.70d0c99d.png",
      copyright: "Copyright © 2022 thuongtruong1009. All rights reserved.",
    },
  });

  const urlConfirm = `${process.env.APP_URL}/api/auth/verify/${emailToken}`;

  const email = {
    body: {
      name: toUserEmail,
      intro: "Welcome to Metasave! We're very excited to have you on board.",
      action: {
        instructions:
          "To get started with Metasave, please click confirm your account button below:",
        button: {
          color: "#22BC66",
          text: "✉ Confirm your account",
          link: urlConfirm,
        },
      },
      signature: "Sincerely",
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
  return mailGenerator.generate(email);
};

export const confirmEmailMsg = (toUserEmail: string, emailToken: string) => {
  return {
    from: process.env.EMAIL_USERNAME,
    to: toUserEmail,
    subject: "Confirm your email",
    html: emailTemplate(toUserEmail, emailToken),
  };
};
