import React from 'react';

const Blogs1 = () => {
  return (
    <div className="bg-gray-50 font-sans leading-relaxed tracking-normal">
      <main className="container mx-auto mt-8 px-6 md:px-12">
        <article className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Ultimate Guide to Raising Layer Chicken
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            By Livine Blog • September 15, 2023 • 8 min read
          </p>

          <section className="text-gray-700 space-y-6">
            <p>
              Raising layer chickens successfully requires good planning and consistent management. 
              Layers are hens bred specifically for egg production, and they need proper housing, 
              nutrition, lighting, and disease prevention to perform well. With the right conditions, 
              hens can lay efficiently for 18–24 months.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800">Housing</h2>
            <p>
              A proper chicken house should provide enough space, good ventilation, and security 
              against predators. Overcrowding stresses birds and reduces egg production. Each hen 
              should have at least 1.5–2 square feet of floor space in a deep litter system or 
              appropriate space in cages.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800">Feeding</h2>
            <p>
              A balanced diet is crucial. Layer feed must contain sufficient protein for egg 
              formation and calcium for strong eggshells. Farmers can supplement with crushed 
              oyster shells or limestone. Clean water should always be available, as water 
              intake directly affects egg production.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800">Lighting</h2>
            <p>
              Layers require 14–16 hours of light daily to sustain production. During shorter 
              days, artificial lighting can be introduced to maintain consistency. Sudden changes 
              in lighting should be avoided to prevent stress.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800">Health & Disease Prevention</h2>
            <p>
              Preventive care is better than treatment. Farmers should follow vaccination 
              schedules against common diseases like Newcastle and Gumboro. The chicken house 
              should be cleaned regularly, with litter replaced or refreshed to minimize 
              parasite infestations.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800">Conclusion</h2>
            <p>
              By providing proper housing, balanced feeding, adequate lighting, and preventive 
              health care, farmers can achieve maximum egg production from their layers. 
              Consistency and record-keeping are key to long-term success.
            </p>
          </section>
        </article>
      </main>
    </div>
  );
};

export default Blogs1;
