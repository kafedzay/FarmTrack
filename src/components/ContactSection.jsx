import React from 'react';

const ContactSection = () => {
  return (
    <section className="bg-[#fdfcf9] py-12 md:py-20" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#b58900]">
            Get in Touch
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Have questions or need support? Reach out to our team.
          </p>
        </div>
        <form className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-[#b58900]"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-[#b58900]"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-[#b58900]"
          ></textarea>
          <button
            type="submit"
            className="bg-[#b58900] text-white font-semibold px-6 py-3 rounded-md hover:bg-[#a57800] transition-colors duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
