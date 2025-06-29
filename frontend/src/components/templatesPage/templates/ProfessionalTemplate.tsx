import { Github, Linkedin, Globe} from "lucide-react"
type Experience = {
  jobTitle: string
  company: string
  startDate: string
  endDate: string
  description: string
}

type Education = {
  degree: string
  school: string
  years: string
}

type ResumeFormData = {
  fullName: string
  jobTitle: string
  email: string
  phone: string
  address: string
  summary: string
  experience: Experience[]
  education: Education[]
  skills: string
  github?: string
  linkedin?: string
  portfolio?: string
}

const ProfessionalTemplate = ({ data }: { data?: ResumeFormData }) => {
  const resumeData = data || {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    address: "",
    summary: "",
    experience: [],
    education: [],
    skills: "",
    github: "",
    linkedin: "",
    portfolio: "",
  }

  const skillsArray =
    typeof resumeData.skills === "string" && resumeData.skills.trim()
      ? resumeData.skills.split(",").map((s) => s.trim()).filter(Boolean)
      : []

  return (
    <div className="max-w-4xl min-h-[1123px] mx-auto bg-white shadow-lg">
      {/* Header Section */}
      <div className="bg-gray-900 text-white p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">
            {resumeData.fullName || "Sanket Timsina"}
          </h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-300 mb-4">
            {resumeData.jobTitle || "Senior Software Engineer"}
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm mb-2">
            <span>{resumeData.email || "jhapalisanket@gmail.com"}</span>
            <span>•</span>
            <span>{resumeData.phone || "(+977) 9876543210"}</span>
            <span>•</span>
            <span>{resumeData.address || "Jhapa, Nepal"}</span>
          </div>
          {/* Links Section */}
          {(resumeData.github || resumeData.linkedin || resumeData.portfolio) && (
            <div className="flex flex-wrap justify-center gap-6 text-sm mt-2">
              {resumeData.github && (
                 <div className="flex items-center gap-2">
                <Github className="h-4 w-4" style={{ color: "#1D4ED8" }} />
                <a 
                  href={resumeData.github.startsWith('http') ? resumeData.github : `https://${resumeData.github}`}
                  className="hover:underline transition-all duration-200"
                  style={{ color: "#1D4ED8" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resumeData.github.replace(/^https?:\/\//, '')}
                </a>
              </div>
              )}
              {resumeData.linkedin && (
               <div className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" style={{ color: "#1D4ED8" }} />
                <a 
                  href={resumeData.linkedin.startsWith('http') ? resumeData.linkedin : `https://${resumeData.linkedin}`}
                  className="hover:underline transition-all duration-200"
                  style={{ color: "#1D4ED8" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resumeData.linkedin.replace(/^https?:\/\//, '')}
                </a>
              </div>
              )}
              {resumeData.portfolio && (
                <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" style={{ color: "#1D4ED8" }} />
                <a 
                  href={resumeData.portfolio.startsWith('http') ? resumeData.portfolio : `https://${resumeData.portfolio}`}
                  className="hover:underline transition-all duration-200"
                  style={{ color: "#1D4ED8" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resumeData.portfolio.replace(/^https?:\/\//, '')}
                </a>
              </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="p-8">
        {/* Professional Summary */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {resumeData.summary ||
              "Enthusiastic and experienced Full Stack Developer with expertise in scalable web apps, clean architecture, and modern JavaScript frameworks."}
          </p>
        </section>

        {/* Experience */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500">
            PROFESSIONAL EXPERIENCE
          </h2>
          {(resumeData.experience.length > 0
            ? resumeData.experience
            : [
                {
                  jobTitle: "Software Engineer",
                  company: "ABC Corp",
                  startDate: "2021",
                  endDate: "Present",
                  description:
                    "Built modern web apps using React and Node.js\nOptimized app performance and scalability\nCollaborated with cross-functional teams",
                },
              ]
          ).map((exp, idx) => (
            <div className="mb-6" key={idx}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {exp.jobTitle || "Software Engineer"}
                  </h3>
                  <p className="text-lg text-blue-600 font-medium">
                    {exp.company || "ABC Corp"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 font-medium">
                    {exp.startDate || "2021"} - {exp.endDate || "Present"}
                  </p>
                </div>
              </div>
              <ul className="text-gray-700 space-y-2 ml-4">
                {(exp.description || "")
                  .split(/\r?\n|\u2022/)
                  .filter(Boolean)
                  .map((line, i) => (
                    <li
                      key={i}
                      className="relative pl-4 before:content-['▸'] before:absolute before:left-0 before:text-blue-500"
                    >
                      {line.trim()}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Skills */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500">
            TECHNICAL SKILLS
          </h2>
          <ul className="flex flex-wrap gap-3">
            {skillsArray.map((skill, idx) => (
              <li
                key={idx}
                className="px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>

        {/* Education */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500">
            EDUCATION
          </h2>
          {(resumeData.education.length > 0
            ? resumeData.education
            : [
                {
                  degree: "B.Sc. Computer Science",
                  school: "Tribhuvan University",
                  years: "2017 - 2021",
                },
              ]
          ).map((edu, idx) => (
            <div
              className="flex justify-between items-start mb-4"
              key={idx}
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {edu.degree || "B.Sc. Computer Science"}
                </h3>
                <p className="text-lg text-blue-600 font-medium">
                  {edu.school || "Tribhuvan University"}
                </p>
              </div>
              <p className="text-gray-600 font-medium">
                {edu.years || "2017 - 2021"}
              </p>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

export default ProfessionalTemplate
