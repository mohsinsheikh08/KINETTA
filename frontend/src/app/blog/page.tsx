import Image from "next/image";

export default function BlogPage() {
  const posts = [
    { title: "5 Exercises to Build a Stronger Core", date: "Nov 1, 2026", category: "Fitness" },
    { title: "Why Heavyweight Tees are a Gym Essential", date: "Oct 25, 2026", category: "Style" },
    { title: "Nutrition Guide: What to Eat Post-Workout", date: "Oct 15, 2026", category: "Health" }
  ];

  return (
    <div className="min-h-screen bg-[#f7f7f5] pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-heading font-black uppercase tracking-widest text-black mb-10 text-center">The Journal</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <div key={idx} className="bg-white border border-black/10 group cursor-pointer shadow-sm">
              <div className="relative aspect-[4/3] bg-neutral-200 overflow-hidden">
                 {/* Dummy Image Placeholder */}
                 <div className="absolute inset-0 flex items-center justify-center text-neutral-400">Image Placeholder</div>
              </div>
              <div className="p-6">
                <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">{post.category} • {post.date}</p>
                <h2 className="text-lg font-bold text-black group-hover:text-neutral-600 transition-colors">{post.title}</h2>
                <p className="text-sm text-neutral-500 mt-4 underline decoration-transparent group-hover:decoration-black transition-all">Read Article</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}