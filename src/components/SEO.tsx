import { Helmet } from "react-helmet-async";
import { faqs } from "@/data/faqs";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  includeFaq?: boolean;
}

const BASE = "https://fabguard-services.lovable.app";

const SEO = ({
  title = "FabGuard — Home Services in India | Plumber, Electrician, Cleaning",
  description = "Book trusted home services across India: plumber near me, electrician at home, deep cleaning, carpentry, laundry pickup. Same-day, cash on delivery, 4.9★ rated.",
  path = "/",
  includeFaq = false,
}: SEOProps) => {
  const url = `${BASE}${path}`;
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "FabGuard",
    image: "https://storage.googleapis.com/gpt-engineer-file-uploads/ufPU7vUj43fKbYxGBUWOlvgIXvG2/uploads/1763450060842-Fabguard_1.png",
    url: BASE,
    telephone: "+91-7262927177",
    email: "support@fabguard.co.in",
    address: { "@type": "PostalAddress", addressCountry: "IN" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1000" },
    priceRange: "₹₹",
    areaServed: "IN",
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <script type="application/ld+json">{JSON.stringify(localBusiness)}</script>
      {includeFaq && (
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
