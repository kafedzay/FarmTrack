import React from 'react';

const ContactSection = () => {
  return (
    <section className="bg-green-50 py-12 md:py-20" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Contact Form */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4 text-center md:text-left">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600 mb-6 text-center md:text-left">
              Have questions? Reach out to us, and we’ll get back to you soon.
            </p>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-600">
                  Message
                </label>
                <textarea
                  id="message"
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                  rows="4"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-200"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Image */}
          <div className="md:w-1/2 md:pl-10">
            <img
              src="/assets/contact-image.jpg"
              alt="FarmTrack Contact"
              className="w-full h-auto rounded-lg shadow-lg object-cover max-h-[400px] md:max-h-[500px]"
              onError={(e) => (e.target.src = '/assets/fallback-image.jpg')} // Fallback image
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;