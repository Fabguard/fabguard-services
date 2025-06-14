import { Users } from "lucide-react";

const TEAM = [
  {
    name: "S N Saqueb",
    role: "Founder & CEO",
    image: "https://randomuser.me/api/portraits/men/99.jpg",
    // LinkedIn removed
  },
  {
    name: "S Rizwan",
    role: "Tech Lead",
    image: "https://randomuser.me/api/portraits/men/98.jpg",
    // LinkedIn removed
  },
];

const TeamSection = () => (
  <section id="team" className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-2">
          <Users className="h-8 w-8 text-blue-600" />
          Meet Our Team
        </h2>
        <p className="text-md md:text-lg text-gray-600">
          The passionate team driving Fabguard forward.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-center md:justify-center">
        {TEAM.map((member) => (
          <div
            key={member.name}
            className="bg-white rounded-xl shadow-md flex flex-col items-center p-6 group hover:shadow-lg transition"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 rounded-full border-4 border-blue-200 object-cover mb-3"
            />
            <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
            <div className="text-blue-600 text-sm mb-2">{member.role}</div>
            {/* LinkedIn removed */}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TeamSection;
