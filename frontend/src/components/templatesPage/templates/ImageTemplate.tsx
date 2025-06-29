import { Mail, Phone, MapPin, Github, Linkedin, Globe } from "lucide-react"

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

const ImageTemplate = ({ data }: { data: ResumeFormData }) => {
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

  return (
    <div className="mt-0 min-h-[1123px] bg-white shadow-lg rounded-lg p-6 my-10 font-sans text-gray-900">
      {/* Header with Image */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-6 mb-6">
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: "#1D4ED8" }}>
              {safeData.fullName || "Bharat Oli"}
            </h1>
            <p className="text-2xl text-gray-600">{safeData.jobTitle || "UI/UX Designer"}</p>
          </div>
        </div>
        
        <div className=" text-gray-500 text-base">
          {/* Contact Information */}
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" style={{ color: "#1D4ED8" }} />
            <span>{safeData.email || "bharat@email.com"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" style={{ color: "#1D4ED8" }} />
            <span>{safeData.phone || "(+977) 9800000000"}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" style={{ color: "#1D4ED8" }} />
            <span>{safeData.address || "Birtamode-04,Jhapa"}</span>
          </div>
          
          {/* Professional Links */}
          <div className="">
            {safeData.github && (
              <div className="flex items-center gap-2">
                <Github className="h-4 w-4" style={{ color: "#1D4ED8" }} />
                <a 
                  href={safeData.github.startsWith('http') ? safeData.github : `https://${safeData.github}`}
                  className="hover:underline transition-all duration-200"
                  style={{ color: "#1D4ED8" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {safeData.github.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            {safeData.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" style={{ color: "#1D4ED8" }} />
                <a 
                  href={safeData.linkedin.startsWith('http') ? safeData.linkedin : `https://${safeData.linkedin}`}
                  className="hover:underline transition-all duration-200"
                  style={{ color: "#1D4ED8" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {safeData.linkedin.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            {safeData.portfolio && (
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" style={{ color: "#1D4ED8" }} />
                <a 
                  href={safeData.portfolio.startsWith('http') ? safeData.portfolio : `https://${safeData.portfolio}`}
                  className="hover:underline transition-all duration-200"
                  style={{ color: "#1D4ED8" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {safeData.portfolio.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6 text-justify">
        <h2 className="text-xl font-semibold mb-2" style={{ color: "#2563EB" }}>
          Professional Summary
        </h2>
        <p>
          {safeData.summary ||
            "Creative UI/UX Designer with 4+ years of experience designing engaging, user-friendly interfaces for web and mobile applications. Skilled in Figma, Adobe XD, and prototyping."}
        </p>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2" style={{ color: "#2563EB" }}>
          Skills
        </h2>
        <ul className="flex flex-wrap gap-2">
          {(safeData.skills ? safeData.skills.split(",") : ["Figma", "Adobe XD", "User Research", "Wireframing", "Prototyping"]).map((skill, idx) => (
            <li
              key={idx}
              className="px-3 py-1 rounded-full text-sm"
              style={{
                backgroundColor: "#DBEAFE", // bg-blue-100
                color: "#1D4ED8" // text-blue-700
              }}
            >
              {skill.trim()}
            </li>
          ))}
        </ul>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2" style={{ color: "#2563EB" }}>
          Experience
        </h2>
        {safeData.experience && safeData.experience.length > 0 ? (
          safeData.experience.map((exp, idx) => (
            <div className="mb-4" key={idx}>
              <div className="flex justify-between items-center">
                <span className="font-bold">{exp.jobTitle || "Job Title"}</span>
                <span className="italic text-gray-500">
                  {exp.company || "Company"} | {exp.startDate || "Start"} - {exp.endDate || "End"}
                </span>
              </div>
              <ul className="space-y-1 mt-1">
                {(exp.description
                  ? exp.description.split(/\r?\n|•/).filter(Boolean)
                  : ["Description of your role and achievements."]
                ).map((point, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', lineHeight: '1.5', fontSize: '1rem', marginLeft: 0 }}>
                    <span style={{ display: 'inline-block', width: 18, minWidth: 18, color: '#6b7280', fontWeight: 'bold', fontSize: '1.2em', lineHeight: '1.5', marginRight: 6, textAlign: 'center' }}>•</span>
                    <span style={{ display: 'inline-block', verticalAlign: 'top', wordBreak: 'break-word', flex: 1 }}>{point.trim()}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <span className="font-bold">Lead Designer</span>
              <span className="italic text-gray-500">Design Studio | 2022 - Present</span>
            </div>
            <ul className="space-y-1 mt-1">
              <li style={{ display: 'flex', alignItems: 'flex-start', lineHeight: '1.5', fontSize: '1rem', marginLeft: 0 }}>
                <span style={{ display: 'inline-block', width: 18, minWidth: 18, color: '#6b7280', fontWeight: 'bold', fontSize: '1.2em', lineHeight: '1.5', marginRight: 6, textAlign: 'center' }}>•</span>
                <span style={{ display: 'inline-block', verticalAlign: 'top', wordBreak: 'break-word', flex: 1 }}>Directed UI/UX for 10+ client projects, improving user satisfaction by 25%.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', lineHeight: '1.5', fontSize: '1rem', marginLeft: 0 }}>
                <span style={{ display: 'inline-block', width: 18, minWidth: 18, color: '#6b7280', fontWeight: 'bold', fontSize: '1.2em', lineHeight: '1.5', marginRight: 6, textAlign: 'center' }}>•</span>
                <span style={{ display: 'inline-block', verticalAlign: 'top', wordBreak: 'break-word', flex: 1 }}>Introduced design systems for consistent branding and faster delivery.</span>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Education */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2" style={{ color: "#2563EB" }}>
          Education
        </h2>
        {safeData.education && safeData.education.length > 0 ? (
          safeData.education.map((edu, idx) => (
            <div className="flex justify-between items-center" key={idx}>
              <span className="font-bold">{edu.degree || "Degree"}</span>
              <span className="italic text-gray-500">
                {edu.school || "School"}, {edu.years || "Years"}
              </span>
            </div>
          ))
        ) : (
          <div className="flex gap-3 justify-between items-center">
            <span className="font-bold">B.A. in Graphic Design</span>
            <span className="italic text-gray-500">UCLA, 2016 - 2020</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageTemplate