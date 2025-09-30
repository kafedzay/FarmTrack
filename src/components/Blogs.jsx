// import React from 'react';

// const LayerPoultryBlog = () => {
//   const blogPosts = [
//     {
//       id: 1,
//       title: 'Top 5 Laying Hen Breeds for Backyard Farmers',
//       description: 'Discover the best chicken breeds known for their high egg production and docile temperament.',
//       author: 'Poultry Pro',
//       date: 'September 15, 2023',
//       readTime: '5 min read'
//     },
//     {
//       id: 2,
//       title: 'Essential Guide to Chicken Coop Design',
//       description: 'Learn how to build a safe and comfortable coop that maximizes egg production and keeps predators out.',
//       author: 'Coop Crafter',
//       date: 'August 28, 2023',
//       readTime: '7 min read'
//     },
//     {
//       id: 3,
//       title: 'Understanding Layer Feed: What Your Chickens Need',
//       description: 'A deep dive into the nutritional requirements of laying hens and how to choose the right feed.',
//       author: 'Feed Expert',
//       date: 'August 10, 2023',
//       readTime: '6 min read'
//     },
//     {
//       id: 4,
//       title: 'Preventing Common Diseases in Your Flock',
//       description: 'Tips and strategies to maintain a healthy flock and spot early signs of illness.',
//       author: 'Flock Health Specialist',
//       date: 'July 25, 2023',
//       readTime: '4 min read'
//     },
//   ];

//   return (
//     <div className="bg-gray-50 font-sans leading-normal tracking-normal">
//       {/* Main Blog Content Section */}
//       <main className="container mx-auto mt-8 px-6 md:px-12">

//         <section className="py-8">
//           <h2 className="text-3xl font-bold text-gray-800 mb-8">Latest Articles</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {blogPosts.map(post => (
//               <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
//                   <p className="text-gray-600 text-sm mb-4">{post.description}</p>
//                   <div className="flex justify-between items-center text-gray-400 text-xs">
//                     <span>By {post.author}</span>
//                     <div className="flex items-center space-x-2">
//                         <span>{post.date}</span>
//                         <span>|</span>
//                         <span>{post.readTime}</span>
//                     </div>
//                   </div>
//                   <a href="#" className="inline-block mt-4 text-green-600 font-semibold hover:underline">Read More &rarr;</a>
//                 </div>
//               </article>
//             ))}
//           </div>
//         </section>

//         {/* Call to Action Section */}
//         <section className="bg-gray-800 text-white rounded-lg shadow-md p-10 my-12 text-center">
//           <h2 className="text-3xl font-bold mb-4">Join Our Community!</h2>
//           <p className="text-gray-300 mb-6">Get the latest tips and insights on layer poultry farming delivered straight to your inbox. 🐔</p>
//           <form className="flex justify-center space-x-4">
//             <input 
//               type="email" 
//               placeholder="Enter your email" 
//               required 
//               className="px-4 py-2 w-full max-w-sm rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500" 
//             />
//             <button 
//               type="submit" 
//               className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300"
//             >
//               Subscribe
//             </button>
//           </form>
//         </section>
//       </main>

      
//     </div>
//   );
// };

// export default LayerPoultryBlog;



import React from 'react';
import FooterSection from './FooterSection';
import Navbar from './NavBar';

const LayerPoultryBlog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Top 5 Laying Hen Breeds for Backyard Farmers',
      description: 'Discover the best chicken breeds known for their high egg production and docile temperament.',
      author: 'Poultry Pro',
      date: 'September 15, 2023',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Essential Guide to Chicken Coop Design',
      description: 'Learn how to build a safe and comfortable coop that maximizes egg production and keeps predators out.',
      author: 'Coop Crafter',
      date: 'August 28, 2023',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'Understanding Layer Feed: What Your Chickens Need',
      description: 'A deep dive into the nutritional requirements of laying hens and how to choose the right feed.',
      author: 'Feed Expert',
      date: 'August 10, 2023',
      readTime: '6 min read'
    },
    {
      id: 4,
      title: 'Preventing Common Diseases in Your Flock',
      description: 'Tips and strategies to maintain a healthy flock and spot early signs of illness.',
      author: 'Flock Health Specialist',
      date: 'July 25, 2023',
      readTime: '4 min read'
    },
  ];

  return (
   <div>
    <Navbar />
     <div className="bg-[#FFF5E1] font-sans mt-11 leading-normal tracking-normal min-h-screen py-12 sm:py-16 md:py-20">
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
                  <a href="#" className="inline-block mt-4 text-green-600 font-semibold hover:underline">Read More &rarr;</a>
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
  );
};

export default LayerPoultryBlog;
