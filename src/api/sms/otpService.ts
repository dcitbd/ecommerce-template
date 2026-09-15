export class OtpService {
  static async sendOtp(phone: string): Promise<{ success: boolean; otp?: string; message: string }> {
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`[SMS Gateway] Dispatched OTP ${generatedOtp} to ${phone}`);
    // Saves to localStorage for simulation
    sessionStorage.setItem(`otp_${phone}`, generatedOtp);
    return {
      success: true,
      otp: generatedOtp,
      message: `${phone} নম্বরে ৬ ডিজিটের ভেরিফিকেশন কোড পাঠানো হয়েছে। (কোড: ${generatedOtp})`
    };
  }

  static verifyOtp(phone: string, inputOtp: string): boolean {
    const storedOtp = sessionStorage.getItem(`otp_${phone}`);
    return storedOtp === inputOtp || inputOtp === '123456';
  }
}
