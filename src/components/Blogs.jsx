import React from 'react';
import FooterSection from './FooterSection';

const LayerPoultryBlog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Top 5 Laying Hen Breeds for Backyard and Commercial Poultry Farmers',
      description: 'Explore the best chicken breeds for high egg production, including Rhode Island Red, Leghorn, and Sussex. Learn about their egg-laying capacity, temperament, and adaptability to various climates, ideal for both small-scale and commercial farms.',
      author: 'Dr. Emily Hatch, Poultry Specialist',
      date: 'September 15, 2025',
      readTime: '6 min read',
      category: 'Breeding & Selection'
    },
    {
      id: 2,
      title: 'Designing the Ultimate Chicken Coop for Maximum Egg Production',
      description: 'Discover expert tips on building a secure, well-ventilated coop that promotes hen comfort and productivity. From predator-proofing to optimizing nesting boxes, this guide covers everything you need for a thriving flock.',
      author: 'James Coopman, Farm Architect',
      date: 'August 28, 2025',
      readTime: '8 min read',
      category: 'Farm Infrastructure'
    },
    {
      id: 3,
      title: 'Optimizing Layer Feed: Nutritional Needs for Peak Performance',
      description: 'Understand the essential nutrients your laying hens need, including calcium, protein, and vitamins. Learn how to select high-quality feed, balance diets, and reduce costs while boosting egg quality and flock health.',
      author: 'Sarah Feedwell, Nutrition Expert',
      date: 'August 10, 2025',
      readTime: '7 min read',
      category: 'Nutrition'
    },
    {
      id: 4,
      title: 'Proactive Strategies to Prevent Common Poultry Diseases',
      description: 'Protect your flock with proven biosecurity measures and early detection techniques. This article covers common diseases like Newcastle and avian influenza, offering practical steps to maintain a healthy, productive flock.',
      author: 'Dr. Rachel Cluck, Veterinary Specialist',
      date: 'July 25, 2025',
      readTime: '5 min read',
      category: 'Health & Welfare'
    },
    {
      id: 5,
      title: 'Sustainable Poultry Farming: Reducing Waste and Costs',
      description: 'Learn eco-friendly practices to minimize waste, optimize feed usage, and lower operational costs. From composting manure to implementing water-saving systems, discover how to make your poultry farm more sustainable and profitable.',
      author: 'Mark Greenfeather, Sustainability Consultant',
      date: 'July 10, 2025',
      readTime: '6 min read',
      category: 'Sustainability'
    }
  ];

  return (
   <div>
     <div className="bg-[#FFF5E1] font-sans leading-normal tracking-normal min-h-screen py-12 sm:py-16 md:py-20">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="text-center mb-12 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#b58900] tracking-tight">
            Layer Poultry Blog
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto">
            Stay informed with expert insights, practical tips, and the latest trends in poultry farming. Our blog is your go-to resource for mastering layer management, boosting egg production, and building a sustainable poultry business.
          </p>
        </section>

        {/* Blog Posts */}
        <section className="py-8">
          <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-8 text-center">
            Latest Articles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogPosts.map(post => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <div className="p-6 sm:p-8">
                  <span className="inline-block bg-[#b58900]/20 text-[#b58900] text-xs sm:text-sm font-semibold px-3 py-1 rounded-full mb-3">
                    {post.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-4">
                    {post.description}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-gray-500 text-xs sm:text-sm mb-4">
                    <span>By {post.author}</span>
                    <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                      <span>{post.date}</span>
                      <span>|</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <a
                    href="#read-more"
                    className="inline-block text-[#b58900] font-semibold hover:underline text-sm sm:text-base"
                  >
                    Read More &rarr;
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-[#b58900] text-white rounded-lg shadow-md p-8 sm:p-10 my-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Join the FarmTrack Community
          </h2>
          <p className="text-gray-100 text-sm sm:text-base mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest poultry farming tips, exclusive insights, and updates on how FarmTrack can transform your layer operations. Join thousands of farmers building smarter, more sustainable farms.
          </p>
          <div className="flex justify-center space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="px-4 py-2 w-full max-w-xs sm:max-w-sm rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              className="bg-white text-[#b58900] font-semibold py-2 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              Subscribe
            </button>
          </div>
        </section>
      </main>
    </div>
    <FooterSection />
   </div>
  );
};

export default LayerPoultryBlog;