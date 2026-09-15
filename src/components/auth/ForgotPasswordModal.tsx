import React, { useState } from 'react';
import { OtpService } from '../../api/sms/otpService';

export const ForgotPasswordModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const handleSendOtp = async () => {
    await OtpService.sendOtp(phone);
    setStep(2);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-2xl max-w-sm w-full space-y-4 text-xs">
        <h3 className="font-bold text-sm">পাসওয়ার্ড পরিবর্তন (OTP ভেরিফিকেশন)</h3>
        {step === 1 ? (
          <div>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="ফোন নম্বর দিন" className="w-full p-2 border rounded" />
            <button onClick={handleSendOtp} className="w-full mt-3 py-2 bg-emerald-600 text-white rounded font-bold">OTP পাঠান</button>
          </div>
        ) : (
          <div>
            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="৬ ডিজিটের কোড" className="w-full p-2 border rounded" />
            <button onClick={onClose} className="w-full mt-3 py-2 bg-emerald-600 text-white rounded font-bold">যাচাই করুন</button>
          </div>
        )}
      </div>
    </div>
  );
};
