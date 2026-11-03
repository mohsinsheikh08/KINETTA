export default function PressPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f5] pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-heading font-black uppercase tracking-widest text-black mb-8 text-center">Press & Media</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-black/10 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-black mb-4">Media Inquiries</h2>
            <p className="text-neutral-600 mb-4 text-sm">For press releases, interviews, or brand collaborations, please reach out to our PR team.</p>
            <p className="font-semibold text-black">Email: press@kinetta.com</p>
          </div>
          <div className="bg-white border border-black/10 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-black mb-4">Press Kit</h2>
            <p className="text-neutral-600 mb-4 text-sm">Download our official brand logos, high-resolution product images, and company fact sheet.</p>
            <button className="bg-black text-white px-6 py-2 text-xs uppercase tracking-widest font-bold hover:bg-neutral-800 transition-colors">
              Download Zip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}