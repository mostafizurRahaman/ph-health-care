import nodemailer from "nodemailer";
import configs from "../configs";

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "mostafizurrahaman0401@gmail.com",
    pass: configs.gmail_app_pass,
  },
});

export const sendEmail = async (to: string, subject: string, link?: string) => {
  try {
    const result = await transport.sendMail({
      from: `mostafizurrahaman0401@gmail.com`,
      to,
      subject,
      text: "any things",
      html: resetEmailTemp(link as string),
    });

    return { messageId: result.messageId };
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};

const resetEmailTemp = (link: string) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
      body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.reset-container {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 400px;
    width: 100%;
}

h2 {
    color: #333;
    margin-bottom: 20px;
}

p {
    color: #666;
    font-size: 14px;
    margin-bottom: 20px;
}

.reset-button {
    display: inline-block;
    background-color: #007bff;
    color: #ffffff;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

.reset-button:hover {
    background-color: #0056b3;
}

    </style>

</head>
<body>
    <div class="reset-container">
        <h2>Reset Your Password</h2>
        <p>If you requested to reset your password, click the button below:</p>
        <a href=${link} class="reset-button">Reset Password</a>
        <p>If you didn't request a password reset, you can safely ignore this email.</p>
    </div>
</body>
</html>

`;
};
