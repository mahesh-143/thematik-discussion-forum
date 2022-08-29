import { createTransport, getTestMessageUrl } from 'nodemailer';
import jwt from "jsonwebtoken"


const transporter = createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    service: process.env.MAIL_SERVICE,

    auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASS,
    }

});
function sendAccountVerificationMail(user, password) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_VERIFY_SECRET + password, { expiresIn: '60m' })
    const link = `http://localhost:5000/api/auth/verify/${user.id}/${token}`
    console.log(link);
    transporter.sendMail({
        to: user.email,
        subject: 'OTP verification',
        html: `<a href=${link}>Verify me</a>`
    }, (error, info) => {
        if (error) {
            throw error
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', getTestMessageUrl(info));
    })
}
export { transporter, sendAccountVerificationMail }