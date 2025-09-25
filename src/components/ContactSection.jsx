import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FooterSection from './FooterSection';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill out all fields.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    // Simulate form submission
    toast.success('Your message has been sent! Our team will respond within 24 hours.', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
   <div>
     <section className="bg-[#FFF5E1] py-12 sm:py-16 md:py-20 lg:py-24 min-h-screen flex items-center justify-center" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#b58900] tracking-tight">
            Get in Touch with FarmTrack
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto">
            Have questions about our poultry management tools or need support? Our dedicated team is here to assist you with expert advice, technical support, or inquiries about how FarmTrack can transform your poultry farming operations.
          </p>
        </div>
        {/* Form */}
        <form 
          onSubmit={handleSubmit} 
          className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-lg space-y-6"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#b58900] text-gray-800 text-base"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#b58900] text-gray-800 text-base"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your needs or questions"
              rows="6"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#b58900] text-gray-800 text-base"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-[#b58900] text-white font-semibold px-6 py-3 rounded-md hover:bg-[#a57800] transition-colors duration-300 text-base sm:text-lg"
          >
            Send Message
          </button>
        </form>
        {/* Additional Information */}
        <div className="mt-12 text-center space-y-6">
          <h3 className="text-xl sm:text-2xl font-semibold text-[#b58900]">
            Why Contact FarmTrack?
          </h3>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto">
            At FarmTrack, we’re committed to empowering poultry farmers with innovative solutions. Whether you need help setting up real-time flock monitoring, optimizing egg production, or exploring our analytics tools, our team of experts is available 24/7 to provide personalized support. Trusted by farmers in over 20 countries, we’re here to help you succeed.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="#faqs"
              className="inline-block bg-transparent border-2 border-[#b58900] text-[#b58900] font-semibold px-6 py-3 rounded-lg hover:bg-[#b58900]/10 transition-colors duration-300 text-base sm:text-lg"
            >
              View FAQs
            </a>
            <a
              href="#support"
              className="inline-block bg-[#b58900] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#a57800] transition-colors duration-300 text-base sm:text-lg"
            >
              Explore Support Options
            </a>
          </div>
        </div>
        {/* Toast Container */}
        <ToastContainer />
      </div>
    </section>
    <FooterSection/>
   </div>
  );
};

export default ContactSection;