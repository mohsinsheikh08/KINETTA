export default function FAQPage() {
  const faqs = [
    { q: "What sizes do you offer?", a: "We offer sizes ranging from XS to 3XL. Please refer to our size chart on the product page for exact measurements." },
    { q: "Are your products true to size?", a: "Our gym wear is designed for a performance fit. If you prefer a looser fit, we recommend sizing up." },
    { q: "Do you offer Cash on Delivery (COD)?", a: "Yes, we offer COD across Pakistan. You can pay in cash when the delivery agent arrives." },
    { q: "How do I wash my KINETTA clothes?", a: "Machine wash cold with like colors. Do not bleach. Tumble dry low or hang dry for best results." },
    { q: "Can I change my order after placing it?", a: "Once an order is placed, it cannot be modified. However, you can cancel it within 2 hours by contacting support." }
  ];

  return (
    <div className="min-h-screen bg-[#f7f7f5] pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-heading font-black uppercase tracking-widest text-black mb-8 text-center">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-black/10 p-6 shadow-sm">
              <h3 className="font-bold text-black mb-2">{faq.q}</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}