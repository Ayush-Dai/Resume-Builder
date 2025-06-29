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

const defaultExperience = [
  {
    jobTitle: "Senior Tester",
    company: "Hamro Comapny Pvt. Ltd, Remote",
    startDate: "January 2021",
    endDate: "Present",
    description:
      "Developed and executed comprehensive test plans.\nCollaborated with developers to resolve issues.\nAutomated regression tests using Selenium.",
  },
  {
    jobTitle: "Junior  Tester",
    company: "DevWorks LLC, Remote",
    startDate: "June 2018",
    endDate: "December 2020",
    description:
      "Assisted in manual testing of web applications.\nReported bugs and tracked them using JIRA.\nParticipated in Agile ceremonies and contributed to sprint planning.",
  },
]

const defaultEducation = [
  {
    degree: "Bachelor of Software Testing",
    school: "University of Earth, Milky Way",
    years: "Graduated: May 2020",
  },
]

const ProResumeTemplate  = ({ data }: { data: ResumeFormData }) => {
  const skillsArray = data?.skills
    ? data.skills.split(",").map((s) => s.trim()).filter(Boolean)
    : "Manual Testing, Test Case Design & Execution,SQL & Database Testing ".split(",").map((s) => s.trim())

  const experienceArray = data?.experience && data.experience.length > 0 ? data.experience : defaultExperience
  const educationArray = data?.education && data.education.length > 0 ? data.education : defaultEducation

  return (
    <div className="bg-white text-gray-900 font-serif  min-h-[1123px]  shadow-lg overflow-hidden">
      <div className="max-w-4xl mx-auto p-10">
        {/* Header */}
        <header className="text-center mb-7 pb-5 border-b-2 border-gray-900">
          <h1 className="text-5xl font-bold mb-2 tracking-wide">{data?.fullName || "Ayush Bishwakarma"}</h1>
          <p className="text-2xl text-gray-700 mb-2 font-light">
            {data?.jobTitle || " Tester"}
          </p>
          <div className="flex justify-center items-center space-x-3 text-sm flex-wrap">
            <span>{data?.email || "aayushlamgade157@gmail.com"}</span>
            <span>•</span>
            <span>{data?.phone || "(+977) 9845611072"}</span>
            <span>•</span>
            <span>{data?.address || "Taplejung, Nepal"}</span>
          </div>
        </header>

        {/* Summary */}
        <section className="mb-5">
          <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-400 uppercase tracking-wider">
            Professional Summary
          </h2>
          <p className="text-gray-800 leading-relaxed  text-base text-justify">
            {data?.summary ||
              "Detail-oriented and highly analytical Software Tester with 100+ years of experience ensuring high-quality software delivery through meticulous manual and automated testing. Proven expertise in designing robust test plans, identifying critical bugs, and collaborating with cross-functional teams to enhance product performance and user experience. Proficient in tools like Selenium, JIRA, Postman, and TestRail, with a solid foundation in Agile/Scrum methodologies.."}
          </p>
        </section>

        {/* Experience */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-2 pb-2 border-b border-gray-400 uppercase tracking-wider">
            Professional Experience
          </h2>
          {experienceArray.map((exp, idx) => (
            <div className="mb-8" key={idx}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-bold">{exp.jobTitle}</h3>
                  <p className="text-lg text-gray-700 font-medium">{exp.company}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {exp.startDate} – {exp.endDate}
                  </p>
                </div>
              </div>
              <ul className="list-disc pl-6 text-base text-gray-800">
                {exp.description.split(/\n|\r/).filter(Boolean).map((line, i) => (
                  <li key={i}>{line.replace(/^•\s*/, "")}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Skills */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-2 pb-2 border-b border-gray-400 uppercase tracking-wider">
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <p className="text-gray-800">{skillsArray.join(", ")}</p>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-2 pb-2 border-b border-gray-400 uppercase tracking-wider">Education</h2>
          {educationArray.map((edu, idx) => (
            <div className="flex justify-between items-start" key={idx}>
              <div>
                <h3 className="text-lg font-bold">{edu.degree}</h3>
                <p className="text-lg text-gray-700 font-medium">{edu.school}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{edu.years}</p>
              </div>
            </div>
          ))}
        </section>

        <section>
             {(data?.linkedin || data?.github || data?.portfolio) && (
        <footer className="mt-0 pt-0 border-t-2 border-gray-900 text-center text-sm text-gray-700 flex flex-col items-center gap-2">
          <div className="flex flex-wrap justify-center pt-3 gap-6">
            {data?.linkedin && (
              <a
                href={data.linkedin}
                className="hover:underline text-blue-700 flex items-center gap-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            )}
            {data?.github && (
              <a
                href={data.github}
                className="hover:underline text-blue-700 flex items-center gap-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            )}
            {data?.portfolio && (
              <a
                href={data.portfolio}
                className="hover:underline text-blue-700 flex items-center gap-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Portfolio
              </a>
            )}
          </div>
        </footer>
      )} 
        </section>
      </div>
      {/* Footer with links */}
  
    </div>
  )
}

export default ProResumeTemplate
