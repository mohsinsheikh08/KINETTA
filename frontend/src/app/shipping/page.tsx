export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f5] pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-heading font-black uppercase tracking-widest text-black mb-8 text-center">Shipping & Delivery</h1>
        <div className="bg-white border border-black/10 p-8 md:p-12 shadow-sm space-y-6 text-neutral-600 leading-relaxed">
          <h2 className="text-xl font-bold text-black uppercase">Delivery Timelines</h2>
          <p>Orders are processed within 24-48 hours. Delivery within Karachi takes 2-3 business days, while other cities in Pakistan may take 4-7 business days.</p>
          
          <h2 className="text-xl font-bold text-black uppercase pt-4">Shipping Charges</h2>
          <p>We offer <strong>Free Shipping</strong> on all orders above Rs. 3,000. For orders below this amount, a flat delivery fee of Rs. 200 applies nationwide.</p>
          
          <h2 className="text-xl font-bold text-black uppercase pt-4">Order Tracking</h2>
          <p>Once your order is dispatched, you will receive a tracking number via email and SMS. You can track your package using our courier partner&rsquo;s website.</p>
        </div>
      </div>
    </div>
  );
}