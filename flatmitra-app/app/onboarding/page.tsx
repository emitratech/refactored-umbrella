"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Upload, Camera, ShieldAlert, Phone, Mail, User, Shield } from "lucide-react";
import { Button } from "@/components/buttons/button";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  
  // Step 1 Form Data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    emergencyName: "",
    emergencyPhone: "",
    aadhaarNumber: "",
    panNumber: "",
  });

  // Files state
  const [aadhaarFile, setAadhaarFile] = useState<File | null>(null);
  const [panFile, setPanFile] = useState<File | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "aadhaar" | "pan") => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (type === "aadhaar") setAadhaarFile(file);
      if (type === "pan") setPanFile(file);
    }
  };

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    // Process Onboarding logic
    alert("Onboarding submitted successfully! KYC verification is in progress.");
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-gray-900 flex flex-col font-sans">
      {/* Header */}
      <header className="h-[64px] bg-white border-b border-gray-100 flex items-center px-4 justify-between shrink-0">
        <button onClick={handleBack} className="p-2 -ml-2 text-gray-500 hover:text-gray-800">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-[#5B48BD] rounded-md flex items-center justify-center text-white font-bold text-xs">F</div>
          <span className="font-bold text-base text-gray-900">FlatMitra</span>
        </div>
        <div className="w-8"></div> {/* spacer */}
      </header>

      {/* Main Container */}
      <main className="flex-1 overflow-y-auto pb-32 px-4 max-w-md w-full mx-auto pt-6">
        
        {/* Progress Tracker */}
        <div className="mb-6">
          <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 tracking-wider mb-2">
            <span>STEP {step} OF 3: {step === 1 ? "BASIC INFO" : step === 2 ? "IDENTITY" : "PHOTO"}</span>
            <span className="text-gray-500">{Math.round((step / 3) * 100)}%</span>
          </div>
          {/* Progress Bar */}
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#5B48BD] transition-all duration-300 ease-in-out"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* STEP 1: BASIC INFO */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-[28px] font-extrabold tracking-tight text-gray-900 leading-tight">Let's get started</h1>
              <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
                Please provide your basic information to begin the verification process. This ensures a secure community.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Jane"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#5B48BD] focus:ring-1 focus:ring-[#5B48BD] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#5B48BD] focus:ring-1 focus:ring-[#5B48BD] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="jane.doe@example.com"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#5B48BD] focus:ring-1 focus:ring-[#5B48BD] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Phone Number</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Phone size={16} /></span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#5B48BD] focus:ring-1 focus:ring-[#5B48BD] transition-colors"
                  />
                </div>
              </div>

              {/* Emergency Contact Container */}
              <div className="bg-[#F3F4F6]/50 border border-gray-100 rounded-2xl p-4 space-y-4">
                <div className="flex items-center space-x-2 text-sm font-bold text-gray-800">
                  <Shield size={16} className="text-[#5B48BD]" />
                  <span>Emergency Contact</span>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Contact Name</label>
                  <input
                    type="text"
                    name="emergencyName"
                    value={formData.emergencyName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#5B48BD] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Contact Phone</label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#5B48BD] transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: IDENTITY */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-[28px] font-extrabold tracking-tight text-gray-900 leading-tight">Verify your identity</h1>
              <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
                Please provide your government issued ID to ensure the safety and security of our community.
              </p>
            </div>

            <div className="space-y-6">
              {/* Aadhaar Section */}
              <div className="bg-white border border-gray-200/60 rounded-2xl p-4 space-y-4 shadow-sm">
                <h3 className="font-bold text-[17px] text-gray-900">Aadhaar Card</h3>
                
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Aadhaar Number</label>
                  <input
                    type="text"
                    name="aadhaarNumber"
                    value={formData.aadhaarNumber}
                    onChange={handleInputChange}
                    placeholder="XXXX XXXX XXXX"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#5B48BD] transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Upload Document</label>
                  <label className="border-2 border-dashed border-gray-200 hover:border-[#5B48BD] rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors mt-1.5 bg-gray-50/50">
                    <input 
                      type="file" 
                      accept="image/*,application/pdf" 
                      className="hidden" 
                      onChange={(e) => handleFileChange(e, "aadhaar")}
                    />
                    <Upload className="text-gray-400 mb-2" size={24} />
                    <span className="text-xs font-bold text-gray-800">
                      {aadhaarFile ? aadhaarFile.name : "Tap to upload front & back"}
                    </span>
                  </label>
                </div>
              </div>

              {/* PAN Section */}
              <div className="bg-white border border-gray-200/60 rounded-2xl p-4 space-y-4 shadow-sm">
                <h3 className="font-bold text-[17px] text-gray-900">PAN Card</h3>
                
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">PAN Number</label>
                  <input
                    type="text"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleInputChange}
                    placeholder="XXXXX0000X"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#5B48BD] transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Upload Document</label>
                  <label className="border-2 border-dashed border-gray-200 hover:border-[#5B48BD] rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors mt-1.5 bg-gray-50/50">
                    <input 
                      type="file" 
                      accept="image/*,application/pdf" 
                      className="hidden" 
                      onChange={(e) => handleFileChange(e, "pan")}
                    />
                    <Upload className="text-gray-400 mb-2" size={24} />
                    <span className="text-xs font-bold text-gray-800">
                      {panFile ? panFile.name : "Tap to upload front"}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: PHOTO */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-[28px] font-extrabold tracking-tight text-gray-900 leading-tight">Almost done.</h1>
              <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
                Let's put a face to the name.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center py-6">
              <div className="relative">
                {profilePhoto ? (
                  <img 
                    src={profilePhoto} 
                    alt="Profile Preview" 
                    className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-md"
                  />
                ) : (
                  <div className="w-40 h-40 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-300">
                    <User size={64} />
                  </div>
                )}
                
                <label className="absolute bottom-1 right-1 w-10 h-10 bg-[#5B48BD] hover:bg-[#4a39a6] text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-colors">
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handlePhotoCapture}
                  />
                  <Camera size={18} />
                </label>
              </div>

              {/* Alert notice */}
              <div className="mt-8 bg-gray-100/80 border border-gray-200/50 rounded-xl px-4 py-3 flex items-center space-x-3 w-full max-w-sm">
                <span className="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs font-bold">i</span>
                <span className="text-xs font-medium text-gray-600">Please ensure your face is clearly visible.</span>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Action Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shrink-0 z-10 shadow-[0_-4px_16px_rgba(0,0,0,0.03)]">
        <div className="max-w-md mx-auto flex items-center space-x-4">
          <button 
            onClick={handleBack}
            disabled={step === 1}
            className={`flex-1 font-bold py-3.5 px-4 rounded-xl text-sm transition-colors flex items-center justify-center border ${
              step === 1 
                ? "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed" 
                : "bg-white border-gray-200 hover:border-gray-300 text-gray-700"
            }`}
          >
            <ArrowLeft size={16} className="mr-2" /> Back
          </button>

          <button 
            onClick={step < 3 ? handleNext : handleSubmit}
            className="flex-1 bg-[#5B48BD] hover:bg-[#4a39a6] text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-colors flex items-center justify-center shadow-[0_4px_12px_rgba(91,72,189,0.2)]"
          >
            {step === 1 ? "Next: Identity Verification" : step === 2 ? "Next: Profile Photo" : "Complete Onboarding"}{" "}
            <ArrowRight size={16} className="ml-2" />
          </button>
        </div>
      </footer>
    </div>
  );
}
