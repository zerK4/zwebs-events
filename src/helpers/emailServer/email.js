/**
 * @author Sebastian Pavel
 * @date February 2023
 * ? email server
 */

import { render } from '@react-email/render';
import nodemailer from 'nodemailer';
import { errLogger, infoLogger } from '../../utils/logger';
import Email from './templates/confirmation'
import EventCreationConfirmation from './templates/eventCreationConfirmation'
import ConfirmGuest from './templates/confirmGuest'
import GuestEmailConfirmation from './templates/guestEmailConfirmation';


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
    infoLogger.info(`Confirmation email sent to ${userEmail}!`)
  } catch(err) {
    errLogger.error(`Could not send confirmation email to ${userEmail}!`)
    console.error(`got an error sending the email | ${err}`)
  }
}

export const confirmEventCreation = async ({ userEmail, url, subject, message }) => {
  const emailHtml = render(<EventCreationConfirmation userEmail={userEmail} url={url} subject={subject} message={message} />)
  try {
    transporter.sendMail({
      from: 'zWebsEvents<info@zwebs-events.com>',
      to: userEmail,
      subject: subject,
      html: emailHtml
    })
    infoLogger.info(`Event confirmation email sent to ${userEmail}!`)
  } catch (err) {
    console.error(err)
    errLogger.error(`Could not send event confirmation email to ${userEmail}!`)
  }
}

export const confirmGuestCreation = async (document) => {
  const { userEmail, firstname, url, subject, message, guest } = document
  const emailHtml = render(<ConfirmGuest firstname={firstname} url={url} subject={subject} message={message} guest={guest} />)
  try {
    transporter.sendMail({
      from: 'zWebsEvents<info@zwebs-events.com>',
      to: userEmail,
      subject: subject,
      html: emailHtml
    })
    infoLogger.info(`Guest confirmation email sent to ${userEmail}!`)
  } catch (err) {
    console.error(err)
    errLogger.error(`Could not send guest confirmation email to ${userEmail}!`)
  }
}

export const confirmGuestEmail = async (document) => {
  const { userEmail, firstname, url, subject, message } = document
  const emailHtml = render(<GuestEmailConfirmation firstname={firstname} url={url} subject={subject} message={message} />)
  try {
    transporter.sendMail({
      from: 'zWebsEvents<info@zwebs-events.com>',
      to: userEmail,
      subject: subject,
      html: emailHtml
    })
    infoLogger.info(`Guest confirmation email sent to ${userEmail}!`)
  } catch (err) {
    console.error(err)
    errLogger.error(`Could not send guest confirmation email to ${userEmail}!`)
  }
}