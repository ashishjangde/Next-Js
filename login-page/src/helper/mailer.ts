import { Users } from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";


export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);  // Ensure userId is a string

        // Update token in the database
        if (emailType === "verify") {
            await Users.findOneAndUpdate(
                { email },
                {
                    $set:
                        { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 }
                }
            );
        } else if (emailType === "reset") {
            await Users.findOneAndUpdate(
                { email },
                {
                    $set: {
                        forgotPasswordToken: hashedToken, forgotPasswordExpiry: Date.now() + 3600000
                    }
                }
            );
        }

        // Configure nodemailer transport
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAIL_USERNAME!,
                pass: process.env.MAIL_PASSWORD!,
            },
        });

        // Email options
        const mailOptions = {
            from: "maddison53@ethereal.email",
            to: email,
            subject: emailType === "verify" ? "Verify your email" : "Reset Password",
            html: `<a href="http://localhost:3000/verifyemail?token=${hashedToken}">Click here to verify your email</a>`,
        };

        // Send email
        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;
    } catch (error: any) {
        console.error("Error in sendEmail:", error.message);
        throw new Error("Failed to send email");
    }
};
