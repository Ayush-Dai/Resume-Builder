
export interface ResumeFormData {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  experience: any[]; 
  education: any[];  
  skills: string;
  github: string;
  linkedin: string;
  portfolio: string;
}

export const defaultResumeData: ResumeFormData = {
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
  portfolio: ""
};