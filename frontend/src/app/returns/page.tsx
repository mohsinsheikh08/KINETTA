export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f5] pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-heading font-black uppercase tracking-widest text-black mb-8 text-center">Returns & Exchanges</h1>
        <div className="bg-white border border-black/10 p-8 md:p-12 shadow-sm space-y-6 text-neutral-600 leading-relaxed">
          <h2 className="text-xl font-bold text-black uppercase">7-Day Return Policy</h2>
          <p>We want you to be completely satisfied with your purchase. If you are not happy with the fit or quality, you can return or exchange the item within 7 days of delivery.</p>
          
          <h2 className="text-xl font-bold text-black uppercase pt-4">Conditions for Return</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Items must be unworn, unwashed, and in their original packaging.</li>
            <li>Original tags must be attached.</li>
            <li>Proof of purchase (receipt or order confirmation) is required.</li>
          </ul>

          <h2 className="text-xl font-bold text-black uppercase pt-4">How to Initiate</h2>
          <p>Please email us at support@kinetta.com with your Order ID and a photo of the product to start the return process. Customers are responsible for return shipping costs unless the item is defective.</p>
        </div>
      </div>
    </div>
  );
}