import { Mail, Phone, MapPin, Calendar,  Briefcase, GraduationCap, Star, Github, Linkedin, Globe } from "lucide-react"

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

function SkillBar({ skill }: { skill: string }) {
  return (
    <div className="mb-2 flex items-center">
      <Star className="w-4 h-4 text-purple-600 mr-2" />
      <span className="text-sm font-medium text-gray-700">{skill}</span>
    </div>
  );
}

export default function ClassicTemplate({ data }: { data?: ResumeFormData }) {
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
    : ["UI/UX Design", "Figma / Sketch", "Adobe Creative Suite", "Photo Editing and Retouching", "Color Theory and Composition", "Tailwind CSS"]

  const defaultEducation = [
    {
      degree: "B.Sc. Computer Science",
      school: "Tribhuvan University",
      years: "2017 - 2021",
    },
  ];
  const defaultExperience = [
    {
  "jobTitle": "Graphic Designer",
  "company": "Creative Studio X",
  "startDate": "2022",
  "endDate": "Present",
  "description": "Designed branding materials, social media graphics, and marketing assets. Led visual direction for client campaigns. Collaborated with content and marketing teams to maintain cohesive brand identity."
},
{
  "jobTitle": "Junior Graphic Designer",
  "company": "Pixel & Co.",
  "startDate": "2020",
  "endDate": "2022",
  "description": "Assisted in creating visual content for print and digital platforms. Supported senior designers on layout and concept development. Edited product images and optimized files for web use."
}

  ];

  const educationArray = safeData.education.length > 0 ? safeData.education : defaultEducation;
  const experienceArray = safeData.experience.length > 0 ? safeData.experience : defaultExperience;

 return (
    <div className=" mx-auto min-h-[1123px] bg-white shadow-2xl   overflow-hidden print:border-none">
      {/* Header Section with Gradient Background */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-24 -translate-x-24"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="">
            <h1 className="text-5xl  font-bold mb-3 tracking-tight">{safeData.fullName || "Suman Shrestha"}</h1>
            <div className="flex items-center space-x-2 mb-4">
              <Briefcase className="w-5 h-5" />
              <h2 className="text-xl font-light  opacity-90">{safeData.jobTitle || "Graphic Designer"}</h2>
            </div>
            {/* Links Section */}
            {(safeData.github || safeData.linkedin || safeData.portfolio) && (
              <div className="flex flex-wrap gap-4 mt-2">
                {safeData.github && (
                  <div className="flex items-center gap-2">
                <Github className="h-4 w-4" style={{ color: "black" }} />
                <a 
                  href={safeData.github.startsWith('http') ? safeData.github : `https://${safeData.github}`}
                  className="hover:underline transition-all duration-200"
                  style={{ color: "black" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {safeData.github.replace(/^https?:\/\//, '')}
                </a>
              </div>
                )}
                {safeData.linkedin && (
                 <div className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" style={{ color: "black" }} />
                <a 
                  href={safeData.linkedin.startsWith('http') ? safeData.linkedin : `https://${safeData.linkedin}`}
                  className="hover:underline transition-all duration-200"
                  style={{ color: "black" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {safeData.linkedin.replace(/^https?:\/\//, '')}
                </a>
              </div>
                )}
                {safeData.portfolio && (
                   <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" style={{ color: "black" }} />
                <a 
                  href={safeData.portfolio.startsWith('http') ? safeData.portfolio : `https://${safeData.portfolio}`}
                  className="hover:underline transition-all duration-200"
                  style={{ color: "black" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {safeData.portfolio.replace(/^https?:\/\//, '')}
                </a>
              </div>
                )}
              </div>
            )}
          </div>

          {/* Contact Information Cards */}
          <div className="flex flex-col ">
            <div className=" bg-opacity-20 backdrop-blur-sm rounded-lg p-3 flex items-center space-x-3">
              <Phone className="w-4 h-4" />
              <span className="text-sm">{safeData.phone || "(+977) 9876543210"}</span>
            </div>
            <div className=" bg-opacity-20 backdrop-blur-sm rounded-lg p-3 flex items-center space-x-3">
              <Mail className="w-4 h-4" />
              <span className="text-sm">{safeData.email || "sumanhero@gmail.com"}</span>
            </div>
            <div className=" bg-opacity-20 backdrop-blur-sm rounded-lg p-3 flex items-center space-x-3">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{safeData.address || "Birtamode-07, Jhapa, Nepal"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Summary Section */}
        <div className="mb-10">
          <div className="flex items-center mb-4">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-4"></div>
            <h3 className="text-2xl font-bold text-gray-800">Professional Summary</h3>
          </div>
          <p className="text-gray-700 leading-relaxed text-md text-justify bg-gray-50 p-6 rounded-xl border-l-4 border-blue-500">
            {safeData.summary || "Creative and detail-oriented Graphic Designer with [X+] years of experience developing engaging visual content across digital and print platforms. Proficient in Adobe Creative Suite (Photoshop, Illustrator, InDesign, XD), with a strong foundation in branding, typography, layout design, and user-centered design principles."}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-3  gap-8">
          {/* Left Column - Education & Skills */}
          <div className="col-span-1 space-y-8">
            {/* Education */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
              <div className="flex items-center mb-6">
                <GraduationCap className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-800">Education</h3>
              </div>
              {educationArray.map((edu, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                    <div className="flex items-center mb-2">
                      <Calendar className="w-4 h-4 text-blue-500 mr-2" />
                      <span className="text-sm font-semibold text-blue-600">{edu.years || "2000 - 2005"}</span>
                    </div>
                    <h4 className="font-bold text-gray-800 mb-1">{edu.school || "Unknown School"}</h4>
                    <p className="text-sm text-gray-600 mb-2">{edu.degree || "Degree Not Provided"}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
              <div className="flex items-center mb-6">
                <Star className="w-6 h-6 text-purple-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-800">Skills</h3>
              </div>
              {skillsArray.map((skill, index) => (
                <SkillBar key={index} skill={skill} />
              ))}
            </div>
          </div>

          {/* Right Column - Work Experience */}
          <div className="col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full mr-4"></div>
              <h3 className="text-2xl font-bold text-gray-800">Work Experience</h3>
            </div>

            <div className="space-y-6">
              {experienceArray.map((job, index) => (
                <div key={index} className="relative">
                  <div className="absolute left-0 top-6 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-white shadow-lg"></div>
                  {index < safeData.experience.length - 1 && (
                    <div className="absolute left-2 top-10 w-0.5 h-full bg-gradient-to-b from-blue-200 to-purple-200"></div>
                  )}
                  <div className="ml-8 bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-gray-800 mb-1">{job.jobTitle || "Unknown Job Title"}</h4>
                        <div className="flex items-center text-blue-600 font-semibold mb-2">
                          <Briefcase className="w-4 h-4 mr-2" />
                          {job.company || "Unknown Company"}
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full">
                        <span className="text-sm font-medium text-gray-700">
                          {job.startDate || "Start"} - {job.endDate || "End"}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">{job.description || "No description provided."}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
