
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Aasem",
    feedback:
      "The transaction between service provider and customer is very transparent.",
  },
  {
    name: "Abuzar",
    feedback:
      "Fabguard have the most innovative, reliable & quick service at very low cost with full quality satisfaction.",
  },
  {
    name: "Deepjyoti Das",
    feedback: "Fast, quick and reliable services.",
  },
];

const Testimonials = () => (
  <section className="py-16 bg-gradient-to-br from-blue-50 to-teal-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent drop-shadow-md font-serif">
        Customer Feedback
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {testimonials.map((t, idx) => (
          <Card
            key={idx}
            className="shadow-lg transition-transform hover:scale-105 hover:shadow-2xl border-0 bg-gradient-to-br from-white via-blue-50 to-teal-50"
          >
            <CardContent className="py-8 flex flex-col items-center">
              <blockquote className="italic text-base text-gray-700 text-center mb-4">
                “{t.feedback}”
              </blockquote>
              <div className="mt-2 text-lg font-semibold text-blue-700 gradient-text">
                – {t.name}
              </div>
              <div className="w-16 h-1 mt-3 rounded-full bg-gradient-to-r from-blue-400 via-teal-400 to-green-400" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
