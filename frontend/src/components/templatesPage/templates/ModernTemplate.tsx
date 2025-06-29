import { Mail, Phone, MapPin, Calendar, Building2, GraduationCap, Award, User, Github, Linkedin, Globe } from "lucide-react"

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

const ModernTemplate = ({ data }: { data: ResumeFormData }) => {
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
    : ["React", "Node.js", "TypeScript", "MongoDB", "REST APIs", "Tailwind CSS"]

  return (
    <div className="bg-white min-h-[1123px] mx-auto overflow-hidden">
      <div className=" w-full shadow-lg bg-white text-slate-800 text-sm leading-tight flex flex-col">
        {/* Header - Dynamic height */}
        <div className="bg-slate-900 px-6 py-4 flex flex-col sm:flex-row justify-between text-white flex-shrink-0">
          <div className="mb-3 sm:mb-0">
            <h1 className="text-3xl font-bold mb-1">{safeData.fullName || "Sahil Gurung"}</h1>
            <p className="text-2xl text-blue-200">{safeData.jobTitle || "Full Stack Developer"}</p>
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>{safeData.email || "sahil@email.com"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>{safeData.phone || "(+977) 9876543210"}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{safeData.address || "Kathmandu-05,Nepal"}</span>
            </div>
            
            {/* Professional Links */}
            <div className="pt-1">
              {safeData.github && (
                <div className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  <a 
                    href={safeData.github.startsWith('http') ? safeData.github : `https://${safeData.github}`}
                    className="text-blue-200 hover:text-blue-100 transition-colors break-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {safeData.github.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              {safeData.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4" />
                  <a 
                    href={safeData.linkedin.startsWith('http') ? safeData.linkedin : `https://${safeData.linkedin}`}
                    className="text-blue-200 hover:text-blue-100 transition-colors break-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {safeData.linkedin.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              {safeData.portfolio && (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <a 
                    href={safeData.portfolio.startsWith('http') ? safeData.portfolio : `https://${safeData.portfolio}`}
                    className="text-blue-200 hover:text-blue-100 transition-colors break-all"
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

        {/* Content*/}
        <div className="flex-1 p-4 space-y-4 overflow-auto">
          {/* Summary */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 bg-blue-500 rounded">
                <User className="h-4 w-4 text-white" />
              </div>
              <h2 className="text-lg font-semibold">Professional Summary</h2>
            </div>

            <div className="border-l-4 border-blue-500 bg-slate-50 p-3 text-base text-justify text-slate-700 leading-relaxed">
              {safeData.summary ||
                "Experienced Full Stack Developer with 5+ years in building scalable web applications. Passionate about modern JavaScript frameworks, clean code, and delivering high-quality user experiences."}
            </div>
          </section>

          {/* Skills */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 bg-emerald-500 rounded">
                <Award className="h-4 w-4 text-white" />
              </div>
              <h2 className="text-lg font-semibold">Skills & Expertise</h2>
            </div>
            <div className="border-l-4 border-emerald-500 bg-slate-50 p-3">
              <div className="flex flex-wrap gap-2">
                {skillsArray.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-md bg-slate-100 border border-slate-300 text-xs whitespace-nowrap"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Experience */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 bg-orange-500 rounded">
                <Building2 className="h-4 w-4 text-white" />
              </div>
              <h2 className="text-lg font-semibold">Professional Experience</h2>
            </div>
            <div className="space-y-2">
              {(safeData.experience.length > 0
                ? safeData.experience
                : [
                  {
                    jobTitle: "Senior Developer",
                    company: "Acme Corp",
                    startDate: "2021",
                    endDate: "Present",
                    description: "Led a team of 6 in building a SaaS platform using React and Node.js.",
                  },
                ]
              ).map((exp, index) => (
                <div
                  key={index}
                  className="border-l-4 border-orange-500 bg-slate-50 p-3"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between mb-1">
                    <div>
                      <h3 className="text-base font-semibold">{exp.jobTitle}</h3>
                      <div className="flex items-center text-sm gap-1 text-slate-600">
                        <Building2 className="h-4 w-4" />
                        {exp.company}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500 mt-1 sm:mt-0">
                      <Calendar className="h-4 w-4" />
                      {exp.startDate} - {exp.endDate}
                    </div>
                  </div>
                  <hr className="my-2 border-slate-200" />
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
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 bg-purple-500 rounded">
                <GraduationCap className="h-4 w-4 text-white" />
              </div>
              <h2 className="text-lg font-semibold">Education</h2>
            </div>
            <div className="space-y-2">
              {(safeData.education.length > 0
                ? safeData.education
                : [
                  {
                    degree: "B.Sc. in Computer Science",
                    school: "NYU",
                    years: "2014 - 2018",
                  },
                ]
              ).map((edu, index) => (
                <div
                  key={index}
                  className="border-l-4 border-purple-500 bg-slate-50 p-3"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div>
                      <h3 className="text-sm font-semibold">{edu.degree}</h3>
                      <div className="flex items-center text-sm gap-1 text-slate-600">
                        <GraduationCap className="h-4 w-4" />
                        {edu.school}
                      </div>
                    </div>
                    <span className="mt-1 sm:mt-0 bg-slate-200 px-2 py-1 rounded text-slate-600 text-xs">
                      {edu.years}
                    </span>
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

export default ModernTemplate