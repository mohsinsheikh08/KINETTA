"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-widest text-black mb-10 text-center">
          Contact Us
        </h1>
        <div className="flex flex-col md:flex-row gap-12 bg-white border border-black/10 p-8 md:p-12 shadow-sm">
          <div className="w-full md:w-1/3 space-y-6">
            <h2 className="text-xl font-bold uppercase tracking-wider mb-6">Get in Touch</h2>
            <div className="flex items-center gap-4 text-neutral-600">
              <Mail size={20} /> <span>support@kinetta.com</span>
            </div>
            <div className="flex items-center gap-4 text-neutral-600">
              <Phone size={20} /> <span>+92 336 1840806</span>
            </div>
            <div className="flex items-center gap-4 text-neutral-600">
              <MapPin size={20} /> <span>Gulshan-e-Iqbal, Karachi</span>
            </div>
          </div>
          <div className="w-full md:w-2/3">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-neutral-500">We will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Your Name" required className="w-full p-3 border border-black/20 outline-none focus:border-black" onChange={(e) => setFormData({...formData, name: e.target.value})} />
                <input type="email" placeholder="Your Email" required className="w-full p-3 border border-black/20 outline-none focus:border-black" onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <textarea placeholder="Your Message" rows={4} required className="w-full p-3 border border-black/20 outline-none focus:border-black resize-none" onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
                <button type="submit" className="w-full bg-black text-white py-3 text-xs uppercase tracking-widest font-bold flex justify-center items-center gap-2 hover:bg-neutral-800 transition-colors">
                  Send Message <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}