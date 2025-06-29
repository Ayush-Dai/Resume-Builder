import {useEffect} from "react"
import { useForm, useWatch, useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Plus,
  Trash2,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Github,
  Linkedin,
  Globe,
} from "lucide-react"

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

function DataForm({
  formData,
  setFormData,
}: {
  formData: ResumeFormData
  setFormData: (data: ResumeFormData) => void
})
 {
  const { register, handleSubmit, control } = useForm<ResumeFormData>({
    defaultValues: formData,
  })

  const {
    fields: expFields,
    append: appendExp,
    remove: removeExp,
  } = useFieldArray({
    control,
    name: "experience",
  })

  const {
    fields: eduFields,
    append: appendEdu,
    remove: removeEdu,
  } = useFieldArray({
    control,
    name: "education",
  })

  const watchedFields = useWatch({ control })

  useEffect(() => {
    setFormData(watchedFields as ResumeFormData)
  }, [watchedFields, setFormData])

  const onSubmit = (data: ResumeFormData) => {
    alert("Resume data submitted!")
    console.log(data)
  }

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 via-pink-50 to-purple-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Resume Builder</h1>
          <p className="text-slate-600">Create your professional resume in minutes</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

          {/* Personal Info */}
          <Card className="shadow-md border border-indigo-200 bg-gradient-to-tl from-red-200 via-cyan-50 to-rose-200">
            <CardHeader className="rounded-t-md">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-indigo-600" /> Personal Information
              </CardTitle>
              <CardDescription>Tell us about yourself and how to contact you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center gap-2">
                    <User className="h-4 w-4 text-indigo-600" />
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                   {...register("fullName")}
                    placeholder="Sahil Gurung"
                    required
                    className="border border-black focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobTitle" className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-purple-500" />
                    Job Title
                  </Label>
                  <Input
                    id="jobTitle"
                    {...register("jobTitle")}
                    placeholder="Full Stack Developer"
                    required
                    className="border border-black focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-pink-500" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="sahil@example.com"
                    required
                    className="border border-black focus:ring-2 focus:ring-pink-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-green-500" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    placeholder="(+977) 9876543210"
                    required
                    className="border border-black focus:ring-2 focus:ring-green-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-orange-500" />
                  Address
                </Label>
                <Input
                  id="address"
                  {...register("address")}
                  placeholder="Birtamode-07, Jhapa, Nepal"
                  className="border border-black focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* Professional Links Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">
                  Professional Links
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="github" className="flex items-center gap-2">
                      <Github className="h-4 w-4 text-slate-700" />
                      GitHub
                    </Label>
                    <Input
                      id="github"
                      {...register("github")}
                      placeholder="https://github.com/sahilgurung"
                      className="border border-black focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin" className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4 text-blue-600" />
                      LinkedIn
                    </Label>
                    <Input
                      id="linkedin"
                      {...register("linkedin")}
                      placeholder="https://linkedin.com/in/sahilgurung"
                      className="border border-black focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="portfolio" className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-emerald-600" />
                      Portfolio
                    </Label>
                    <Input
                      id="portfolio"
                      {...register("portfolio")}
                      placeholder="https://sahilgurung.dev"
                      className="border border-black focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary" className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-yellow-500" />
                  Professional Summary
                </Label>
                <Textarea
                  id="summary"
                  {...register("summary")}
                  placeholder="Brief overview of your background and achievements..."
                  rows={4}
                  className="resize-none border border-black focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="shadow-md border border-yellow-200 bg-gradient-to-tl from-rose-200 via-pink-150 to-red-150">
            <CardHeader className="rounded-t-md">
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-600" />
                Skills
              </CardTitle>
              <CardDescription>List your technical and professional skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="skills">Skills</Label>
                <Textarea
                  id="skills"
                  {...register("skills")}
                  placeholder="JavaScript, React, Python, Leadership..."
                  rows={3}
                  className="resize-none border border-black focus:ring-2 focus:ring-yellow-400"
                />
                <p className="text-sm text-slate-500">Separate skills with commas</p>
              </div>
            </CardContent>
          </Card>

          {/* Work Experience */}
          <Card className="shadow-md border border-orange-200 bg-gradient-to-tl from-red-100 to-rose-100">
            <CardHeader className="rounded-t-md">
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-orange-500" />
                Work Experience
              </CardTitle>
              <CardDescription>Add your work history and professional experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {expFields.map((item, index) => (
                <Card key={item.id} className="border-2 border-dashed border-orange-200 bg-white">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-slate-900">
                          Experience #{index + 1}
                        </h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeExp(index)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`jobTitle-${index}`}>Job Title</Label>
                          <Input
                            id={`jobTitle-${index}`}
                            {...register(`experience.${index}.jobTitle`)}
                            placeholder="Software Engineer"
                            className="border border-black"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`company-${index}`}>Company</Label>
                          <Input
                            id={`company-${index}`}
                            {...register(`experience.${index}.company`)}
                            placeholder="Tech Corp Inc."
                            className="border border-black"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                          <Input
                            id={`startDate-${index}`}
                            {...register(`experience.${index}.startDate`)}
                            placeholder="2020"
                            className="border border-black"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`endDate-${index}`}>End Date</Label>
                          <Input
                            id={`endDate-${index}`}
                            {...register(`experience.${index}.endDate`)}
                            placeholder="Present"
                            className="border border-black"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`description-${index}`}>Description</Label>
                        <Textarea
                          id={`description-${index}`}
                          {...register(`experience.${index}.description`)}
                          placeholder="Describe your responsibilities and achievements..."
                          rows={3}
                          className="border border-black"
                          onKeyDown={e => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              const target = e.target as HTMLTextAreaElement;
                              const value = target.value;
                              const start = target.selectionStart;
                              const end = target.selectionEnd;
                              const bullet = '\n• ';
                              const newValue = value.slice(0, start) + bullet + value.slice(end);
                              target.value = newValue;
                              // Manually trigger change event for react-hook-form
                              const event = new Event('input', { bubbles: true });
                              target.dispatchEvent(event);
                              // Move cursor after bullet
                              setTimeout(() => {
                                target.selectionStart = target.selectionEnd = start + bullet.length;
                              }, 0);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  appendExp({
                    jobTitle: "",
                    company: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                  })
                }
                className="w-full border-dashed border-black h-12 text-purple-600 hover:bg-gradient-to-r from-green-200 to-lime-200 hover:transition-all duration-700 ease-in-out"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Work Experience
              </Button>
            </CardContent>
          </Card>

          {/* Education */}
          <Card className="shadow-md border border-purple-200 bg-gradient-to-tl from-red-100 to-rose-100">
            <CardHeader className="rounded-t-md">
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-purple-600" />
                Education
              </CardTitle>
              <CardDescription>Add your educational background and qualifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {eduFields.map((item, index) => (
                <Card key={item.id} className="border-2 border-dashed border-purple-200 bg-white">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-slate-900">
                          Education #{index + 1}
                        </h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEdu(index)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`degree-${index}`}>Degree</Label>
                          <Input
                            id={`degree-${index}`}
                            {...register(`education.${index}.degree`)}
                            placeholder="Bachelor of Science"
                            className="border border-black"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`school-${index}`}>School</Label>
                          <Input
                            id={`school-${index}`}
                            {...register(`education.${index}.school`)}
                            placeholder="University of Technology"
                            className="border border-black"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`years-${index}`}>Years</Label>
                        <Input
                          id={`years-${index}`}
                          {...register(`education.${index}.years`)}
                          placeholder="2016 - 2020"
                          className="border border-black"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={() => appendEdu({ degree: "", school: "", years: "" })}
                className="w-full border-dashed border-black h-12 text-purple-600 hover:bg-gradient-to-r from-green-200 to-lime-200 hover:transition-all duration-700 ease-in-out"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Education
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>

      <div className="mt-4 mb-5 text-center text-yellow-950">
        If You Completed filling out the form, you can now directly download your resume as a PDF.
      </div>
    </div>
  )
}

export default DataForm