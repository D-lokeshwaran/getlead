import nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';

type placeHolderType = {
    [int:string]: string
}

export default async function sendCustomEmail(
    to: string,
    subject: string,
    template: string,
    placeholders?: placeHolderType
) {

    const {
        EMAIL_SERVER_USER,
        EMAIL_SERVER_PASSWORD,
        EMAIL_FROM,
        APP_NAME,
        CC_EMAIL
    } = process.env;

    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: EMAIL_SERVER_USER,
            pass: EMAIL_SERVER_PASSWORD
        }
    })

    const templateData = handlebars.compile(template);
    const date = new Date() || placeholders?.date;
    const support = {
        team: `${APP_NAME} team`,
        email: CC_EMAIL
    }
    const placeholderValues = {
        date,
        support,
        ...placeholders
    };

    const html = templateData(placeholderValues);

    // verify the mailer connection config
    await new Promise((resolve, reject) => {
        transport.verify((error, success) => {
            if (error) {
                console.log("Error during verification")
                reject(error)
            } else if (success) {
                resolve(success)
            }
        });
    });

    const mailOptions = {
        from: EMAIL_FROM,
        to,
        subject,
        html,
    }

    // send the email
    await new Promise((resolve, reject) => {
        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    });

}