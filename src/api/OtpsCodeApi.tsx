import axios from 'axios'

export const HandleSendPhone = async (numberPhone: string) => {
    try {
      const response = await axios.post(
        "https://shift-backend.onrender.com/auth/otp",
        { phone: numberPhone }
      );
      console.log("OTP sent successfully: ", response.data.success);
    } catch (error) {
      console.error("Error sending OTP: ", error);
    }
};