
import React from 'react';

const TeamSection = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            About FabGuard
          </h2>
          <div className="max-w-4xl mx-auto text-gray-600 text-lg leading-relaxed space-y-6">
            <p>
              FabGuard is an e-commerce platform dedicated to providing reliable domestic services conveniently delivered to your doorstep. With just a single click, customers can access a wide range of services including plumbing, carpentry, electrical repairs, laundry, dry cleaning, and more.
            </p>
            <p>
              We take pride in offering high-quality services at reasonable prices, with a focus on prompt delivery and customer satisfaction. Our commitment to excellence and convenience has earned the trust of our growing customer base.
            </p>
            <p className="font-semibold text-blue-600">
              Currently, we are pleased to offer our services across pan India.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center p-6 rounded-lg bg-white shadow-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏠</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Comprehensive Services</h3>
            <p className="text-gray-600">
              From plumbing and electrical work to laundry and dry cleaning - we cover all your domestic needs.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-white shadow-lg">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Quick & Reliable</h3>
            <p className="text-gray-600">
              Fast response times and reliable service delivery to ensure your convenience and satisfaction.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-white shadow-lg">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🇮🇳</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Pan India Coverage</h3>
            <p className="text-gray-600">
              Available across India, bringing quality domestic services to your doorstep wherever you are.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
