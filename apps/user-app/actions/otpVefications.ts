"use server"
import { storeOtp, verifyOtp } from '@/lib/otpServices';
import { ActionType } from '@/lib/utils';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);



interface RequestData {
    phoneNumber: string;
    otp?: string;
    action: ActionType;
}

export async function verifyNumber(data: RequestData) {
    try {
        const { phoneNumber, otp, action } = data;

        if (action === ActionType.SEND) {

            const generatedOtp = Math.floor(100000 + Math.random() * 900000)
           
            // store OTP in DB 
            const stored = await storeOtp(phoneNumber, generatedOtp);
            
            if(!stored){
                return {
                    success:false,
                    message: "Something went wrong"
                }
            }

            // Send SMS
            await twilioClient.messages.create({
                body: `Your verification code is: ${generatedOtp.toString}`,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: phoneNumber,
            });

            return {
                success: true,
                message: 'OTP sent successfully'
            };
        }

        if (action === ActionType.VERIFY) {
            if (!otp) {
                return {
                    success: false,
                    message: 'OTP is required for verification'
                }
            }

            // verify against stored OTP in database 
            const isValid = await verifyOtp(phoneNumber, Number(otp));

            return {
                success: isValid,
                message: isValid ? 'OTP verified successfully' : 'Invalid OTP'
            }
        }

        return {
            success: false,
            message: 'Invalid action'
        }

    } catch (error) {
        console.error('OTP verification error:', error);
        return {
            success: false,
            message: 'Internal server error'
        }
    }
}