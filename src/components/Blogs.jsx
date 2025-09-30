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

const LayerPoultryBlog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Ultimate Guide to Raising Layer Chicken',
      description: 'A complete guide covering housing, feeding, disease control, and maximizing egg production in layers.',
      author: 'Livine Blog',
      date: 'September 15, 2023',
      readTime: '8 min read',
      link: './components/Blogs1.jsx/'
      // 'https://www.livine.io/blogs/ultimate-guide-raising-layer-chicken'
    },
    {
      id: 2,
      title: 'How to Raise Productive Layer Chickens',
      description: 'Learn about housing systems, lighting, biosecurity, and flock management for consistent egg production.',
      author: 'Shambani College',
      date: 'August 28, 2023',
      readTime: '7 min read',
      link: 'https://www.shambanicollege.com/blogs/how-to-raise-productive-layer-chickens'
    },
    {
      id: 3,
      title: 'Poultry Tips: Layer House Management',
      description: 'Practical management advice on manure drying, cage-free housing, floor eggs, and environmental control.',
      author: 'UGA Poultry Science',
      date: 'August 10, 2023',
      readTime: '6 min read',
      link: 'https://site.extension.uga.edu/poultrytips'
    },
    {
      id: 4,
      title: 'Poultry & Egg Production Resources',
      description: 'Penn State Extension’s trusted resources on poultry health, feeding, housing, and flock management.',
      author: 'Penn State Extension',
      date: 'July 25, 2023',
      readTime: '9 min read',
      link: 'https://extension.psu.edu/animals-and-livestock/poultry'
    },
    {
      id: 5,
      title: 'Layer Production Losses: Causes, Types, Solutions',
      description: 'An in-depth look at the challenges of egg production losses and strategies to prevent them.',
      author: 'EW Nutrition',
      date: 'June 30, 2023',
      readTime: '5 min read',
      link: 'https://ew-nutrition.com/layer-production-losses-causes-types-solutions'
    },
  ];

  return (
    <div className="bg-gray-50 font-sans leading-normal tracking-normal">
      {/* Main Blog Content Section */}
      <main className="container mx-auto mt-8 px-6 md:px-12">

        <section className="py-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map(post => (
              <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{post.description}</p>
                  <div className="flex justify-between items-center text-gray-400 text-xs">
                    <span>By {post.author}</span>
                    <div className="flex items-center space-x-2">
                        <span>{post.date}</span>
                        <span>|</span>
                        <span>{post.readTime}</span>
                    </div>
                  </div>

                  <a 
                  href="/article-1" 
                  className="inline-block mt-4 text-green-600 font-semibold hover:underline"
                  >
                    Read More &rarr;
                  </a>

                  <a 
                    href={post.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-block mt-4 text-green-600 font-semibold hover:underline"
                  >
                    Read More &rarr;
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-gray-800 text-white rounded-lg shadow-md p-10 my-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community!</h2>
          <p className="text-gray-300 mb-6">Get the latest tips and insights on layer poultry farming delivered straight to your inbox. 🐔</p>
          <form className="flex justify-center space-x-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              required 
              className="px-4 py-2 w-full max-w-sm rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500" 
            />
            <button 
              type="submit" 
              className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default LayerPoultryBlog;
