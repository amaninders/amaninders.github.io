'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'

interface FormInputProps {
  label: string;
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const FormInput = ({ label, type, id, value, onChange, placeholder }: FormInputProps) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-zinc-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      required
      value={value}
      onChange={onChange}
      className="w-full p-3 bg-white/80 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
      placeholder={placeholder}
    />
  </div>
);

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    // Here you would typically make an API call to your backend
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      if (error instanceof Error) {
        setStatus(error.message);
      } else {
        setStatus('An unknown error occurred.');
      }
      setTimeout(() => setStatus(''), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <FormInput
        label="Name"
        type="text"
        id="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your name"
      />
      <FormInput
        label="Email"
        type="email"
        id="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="your@email.com"
      />
      <FormInput
        label="Subject"
        type="text"
        id="subject"
        value={formData.subject}
        onChange={handleChange}
        placeholder="What's this about?"
      />
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-zinc-700 mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full p-3 bg-white/80 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
          placeholder="Your message here..."
        />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-6 rounded-lg hover:from-amber-600 hover:to-amber-700 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50"
      >
        <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
        <Send className="w-4 h-4" />
      </button>
      {status === 'success' && (
        <div className="bg-green-50 text-green-800 rounded-lg p-4 text-center">
          Thank you! Your message has been sent successfully.
        </div>
      )}
      {status === 'error' && (
        <div className="bg-red-50 text-red-800 rounded-lg p-4 text-center">
          An error occurred. Please try again later.
        </div>
      )}
    </form>
  );
}