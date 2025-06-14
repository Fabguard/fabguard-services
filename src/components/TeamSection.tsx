
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
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
            {/* Only show LinkedIn if present */}
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-teal-600 transition-colors text-sm underline flex items-center gap-1"
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M7.994 7.5c0 .966-.786 1.75-1.75 1.75-.96 0-1.75-.784-1.75-1.75 0-.966.79-1.75 1.75-1.75.965 0 1.75.784 1.75 1.75zM4.747 9.872h2.495V19H4.747V9.872zM16.602 9.61c-1.28 0-1.865.71-2.19 1.212v-1.01h-2.496c.033.668 0 9.188 0 9.188h2.496v-5.134c0-.276.021-.551.102-.749.224-.552.735-1.124 1.593-1.124 1.124 0 1.574.849 1.574 2.093v4.914H20V14.16c0-2.443-1.307-3.577-3.398-3.577z"
                  />
                </svg>
                LinkedIn
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TeamSection;

