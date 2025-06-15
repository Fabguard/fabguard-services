
import React from "react";

const testimonials = [
  {
    name: "Aasem",
    feedback: "The transaction between service provider and customer is very transparent.",
  },
];

const Testimonials = () => (
  <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
        Customer Feedback
      </h2>
      <div className="max-w-2xl mx-auto">
        {testimonials.map((t, idx) => (
          <div key={idx} className="mb-8 text-center">
            <blockquote className="italic text-lg text-gray-700 border-l-4 border-teal-500 pl-4">
              “{t.feedback}”
            </blockquote>
            <div className="mt-2 text-teal-700 font-semibold">– {t.name}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
