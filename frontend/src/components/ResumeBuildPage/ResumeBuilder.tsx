import { useState } from 'react'
import DataForm from '../DataForm/DataForm'
import ModernTemplate from '../templatesPage/templates/ModernTemplate'
import ImageTemplate from '../templatesPage/templates/ImageTemplate'
import ExecutiveTemplate from '../templatesPage/templates/ExecutiveTemplate '
import ProfessionalTemplate from '../templatesPage/templates/ProfessionalTemplate'
import ClassicTemplate from '../templatesPage/templates/ClassicTemplate'
import { useLocation, useNavigate } from 'react-router-dom'
import {generatePdfApi} from "../../api/ApiHandler";
import ProResumeTemplate from '../templatesPage/templates/try'
import { Loader2 } from 'lucide-react'



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
  email: string
  phone: string
  address: string
  summary: string
  jobTitle: string
  github: string
  linkedin: string
  portfolio: string
  experience: Experience[]
  education: Education[]
  skills: string
}

const ResumeBuilder = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { state } = location

  const [formData, setFormData] = useState<ResumeFormData>({
    fullName: '',
    email: '',
    phone: '',
    jobTitle: '',
    address: '',
    summary: '',
    github: '',
    linkedin: '',
    portfolio: '',
    experience: [],
    education: [],
    skills: ''
  })

  const [downloading, setDownloading] = useState(false)

  const handleServerPdfDowlaod=async()=>{
    try {
      setDownloading(true)
      const response=await generatePdfApi(formData, state?.template);
      const blob=response.data; 
      const url=window.URL.createObjectURL(blob);
      const link=document.createElement('a');
      link.href=url;
      link.download="resume.pdf";
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Error downloading PDF:", error);
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="flex flex-row h-[90vh] bg-gray-100">

      {/* Left form panel */}
      <div className="w-1/2 h-full overflow-auto border-r border-gray-300">
        <DataForm formData={formData} setFormData={setFormData} />
      </div>


     {/* Right panel */}
<div className="w-1/2 h-full flex flex-col  bg-gradient-to-br from-blue-400 via-white to-pink-500 ">

  {/*  Buttons */}
  <div className="mb-4 flex justify-center gap-9 items-center p-4 ">
    <button
  className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 text-gray-200 font-semibold cursor-pointer rounded-full px-6 py-3 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-300 "
  onClick={() => navigate('/templates')}
>
  Choose Template
</button>



  <button
    onClick={handleServerPdfDowlaod}
    className="bg-gradient-to-r from-emerald-400 cursor-pointer to-green-500 text-white font-semibold rounded-full px-6 py-3 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-300 flex items-center gap-2"
    disabled={downloading}
  >
    {downloading ? (
      <>
        <Loader2 className="animate-spin w-5 h-5 mr-2" /> Downloading...
      </>
    ) : (
      "Download Resume"
    )}
  </button>

  </div>

  {/* Template Preview */}
  <div className="flex-1 overflow-auto ">
    {!state ? (
     <div className="flex items-center justify-center h-full">
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center">
    <p className="text-gray-800 text-xl font-semibold mb-2">No Template Selected</p>
    <p className="text-gray-600 text-sm">Please select a template to start building your resume.</p>
  </div>
</div>

    ) : (
      <>
        {state?.template === 'modern' && (
          <ModernTemplate data={formData} />
        )}

        {state?.template === 'image' && (
          <ImageTemplate data={formData} />
        )}

        {state?.template === "executive" && (
          <ExecutiveTemplate data={formData} />
        )}

        {state?.template === "professional" && (
          <ProfessionalTemplate data={formData} />
        )}
        
        {state?.template === "classic" && (
          <ClassicTemplate data={formData} />
        )}

        {state?.template === "pro" && (
          <ProResumeTemplate data={formData} />
        )}
      </>
    )}
  </div>
  
</div>


</div>
  )
}


export default ResumeBuilder
