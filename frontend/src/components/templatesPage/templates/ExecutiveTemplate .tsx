import { Mail, Phone, MapPin, Calendar, Building2, GraduationCap, User, Github, Linkedin, Globe, Briefcase, Star } from "lucide-react"

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
  github: string
  linkedin: string
  portfolio: string
  experience: Experience[]
  education: Education[]
  skills: string
}

const ExecutiveTemplate = ({ data }: { data: ResumeFormData }) => {
  const safeData = data || {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    address: "",
    summary: "",
    github: "",
    linkedin: "",
    portfolio: "",
    experience: [],
    education: [],
    skills: "",
  }

  const skillsArray = safeData.skills
    ? safeData.skills.split(",").map((skill) => skill.trim()).filter(Boolean)
    : ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker", "MongoDB", "PostgreSQL"]

  return (
    <div className="bg-white  mx-auto overflow-hidden">
      <div className="w-full min-h-[1123px] bg-white text-gray-800 flex">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6 flex flex-col">
          {/* Profile Section */}
          <div className="text-center mb-8">
            {/*  */}
            <h1 className="text-2xl font-bold mb-2">{safeData.fullName || "Ram Limbu"}</h1>
            <p className="text-lg text-blue-300 font-medium">{safeData.jobTitle || "Teacher"}</p>
          </div>

          {/* Contact Information */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Contact
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-300" />
                <span className="break-all">{safeData.email || "rambahadur@email.com"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-300" />
                <span>{safeData.phone || "(+977) 9800000000"}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-300" />
                <span>{safeData.address || "Phidim-07, Nepal"}</span>
              </div>
            </div>
          </div>

          {/* Professional Links */}
          {(safeData.github || safeData.linkedin || safeData.portfolio) && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Links
              </h2>
              <div className="space-y-3 text-sm">
                {safeData.github && (
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-blue-300" />
                    <a 
                      href={safeData.github.startsWith('http') ? safeData.github : `https://${safeData.github}`}
                      className="text-blue-300 hover:text-blue-200 transition-colors break-all"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {safeData.github.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
                {safeData.linkedin && (
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-blue-300" />
                    <a 
                      href={safeData.linkedin.startsWith('http') ? safeData.linkedin : `https://${safeData.linkedin}`}
                      className="text-blue-300 hover:text-blue-200 transition-colors break-all"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {safeData.linkedin.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
                {safeData.portfolio && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-300" />
                    <a 
                      href={safeData.portfolio.startsWith('http') ? safeData.portfolio : `https://${safeData.portfolio}`}
                      className="text-blue-300 hover:text-blue-200 transition-colors break-all"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {safeData.portfolio.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Skills */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5" />
              Skills
            </h2>
            <div className="space-y-2">
              {skillsArray.map((skill, idx) => (
                <div key={idx} className="bg-gray-700 rounded-lg px-3 py-2">
                  <span className="text-sm font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Education
            </h2>
            <div className="space-y-4">
              {(safeData.education.length > 0
                ? safeData.education
                : [
                    {
                      degree: "M.S. Education",
                      school: "Tribhuwan University",
                      years: "2018 - 2020",
                    },
                  ]
              ).map((edu, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-3">
                  <h3 className="font-semibold text-sm">{edu.degree}</h3>
                  <p className="text-blue-300 text-xs">{edu.school}</p>
                  <p className="text-gray-400 text-xs">{edu.years}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Main Content */}
        <div className="w-2/3 p-8 flex flex-col">
          {/* Professional Summary */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Professional Summary</h2>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border-l-4 border-blue-600">
              <p className="text-gray-700 leading-relaxed text-justify">
                {safeData.summary ||
                  "Accomplished Senior Software Engineer with 8+ years of experience in full-stack development, cloud architecture, and team leadership. Proven track record of delivering scalable solutions and driving technical innovation in fast-paced environments."}
              </p>
            </div>
          </section>

          {/* Professional Experience */}
          <section className="flex-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Professional Experience</h2>
            </div>
            
            <div className="space-y-6">
              {(safeData.experience.length > 0
                ? safeData.experience
                : [
                    {
                      jobTitle: "Senior Software Engineer",
                      company: "Tech Solutions Inc",
                      startDate: "2021",
                      endDate: "Present",
                      description: "Led development of microservices architecture serving 1M+ users.\nImplemented CI/CD pipelines reducing deployment time by 60%.\nMentored 5 junior developers and conducted technical interviews.",
                    },
                    {
                      jobTitle: "Software Engineer",
                      company: "StartupCorp",
                      startDate: "2019",
                      endDate: "2021",
                      description: "Built scalable web applications using React and Node.js.\nOptimized database queries improving performance by 40%.\nCollaborated with cross-functional teams in agile environment.",
                    },
                  ]
              ).map((exp, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-4 top-6 w-3 h-3 bg-blue-600 rounded-full border-4 border-white shadow-md"></div>
                  
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{exp.jobTitle}</h3>
                      <div className="flex items-center gap-2 text-blue-600 font-medium">
                        <Building2 className="w-4 h-4" />
                        <span>{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 bg-gray-100 px-3 py-1 rounded-full mt-2 lg:mt-0">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-medium">{exp.startDate} - {exp.endDate}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <ul className="space-y-2">
                      {(exp.description
                        ? exp.description.split(/\r?\n|•/).filter(Boolean)
                        : ["Key achievements and responsibilities for this role."]
                      ).map((point, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 leading-relaxed">{point.trim()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ExecutiveTemplate