import { render } from '@react-email/render';
import nodemailer from 'nodemailer';
import Email from './templates/confirmation'

const email = process.env.EMAIL
const password = process.env.PW

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  secure: false,
  auth: {
    user: email,
    pass: password,
  },
});

export const verifyEmail = async ({ userEmail, url, subject, message, button }) => {
  const emailHtml = render(<Email userEmail={userEmail} url={url} subject={subject} message={message} buttonTxt={button}/>);
  try {
    transporter.sendMail({
      from: 'zWebsEvents<info@zwebs-events.com>',
      to: userEmail,
      subject: subject,
      html: emailHtml
    });
  } catch(err) {
    console.error(`got an error sending the email | ${err}`)
  }
}