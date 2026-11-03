export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f5] pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-widest text-black mb-8 text-center">Our Story</h1>
        <div className="bg-white border border-black/10 p-8 md:p-12 shadow-sm space-y-8 text-neutral-600 leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-black uppercase mb-4">Built for Movement. Designed for Performance.</h2>
            <p>KINETTA was born out of a simple idea: premium gym wear should be accessible to everyone who trains with purpose. We believe that what you wear impacts how you perform.</p>
            <p className="mt-4">Our garments are crafted with high-quality, breathable fabrics that move with you, whether you&rsquo;re lifting heavy or running miles. We focus on minimal, timeless designs that look as good outside the gym as they do inside.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-black uppercase mb-4">Our Mission</h2>
            <p>To empower athletes, fitness enthusiasts, and everyday warriors by providing apparel that enhances their performance and confidence.</p>
          </div>
        </div>
      </div>
    </div>
  );
}