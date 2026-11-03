export default function CareersPage() {
  const jobs = [
    { title: "Senior Frontend Developer", type: "Full-time", location: "Karachi (On-site)", dept: "Engineering" },
    { title: "Social Media Manager", type: "Full-time", location: "Karachi (Hybrid)", dept: "Marketing" },
    { title: "Supply Chain Intern", type: "Internship", location: "Karachi (On-site)", dept: "Operations" }
  ];

  return (
    <div className="min-h-screen bg-[#f7f7f5] pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-heading font-black uppercase tracking-widest text-black mb-8 text-center">Join the Team</h1>
        <p className="text-center text-neutral-500 mb-12 max-w-xl mx-auto">We are always looking for passionate people to help us build the future of KINETTA.</p>
        
        <div className="space-y-4">
          {jobs.map((job, idx) => (
            <div key={idx} className="bg-white border border-black/10 p-6 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm">
              <div>
                <h3 className="text-lg font-bold text-black">{job.title}</h3>
                <p className="text-sm text-neutral-500 mt-1">{job.dept} • {job.location} • {job.type}</p>
              </div>
              <button className="mt-4 md:mt-0 bg-black text-white px-6 py-2 text-xs uppercase tracking-widest font-bold hover:bg-neutral-800 transition-colors">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}