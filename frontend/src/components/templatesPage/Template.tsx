import { useState } from "react";
import { Sparkles } from "lucide-react";
import ImageTemplate from "./templates/ImageTemplate";
import ModernProfessionalTemplate from "./templates/ModernTemplate";
import ExecutiveTemplate from "./templates/ExecutiveTemplate ";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import ProResumeTemplate from "./templates/try";
import { useNavigate } from "react-router-dom";
import { defaultResumeData } from "../constants/defaultResumeData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ModerTemplateImage from "../../Image/ModernTemplateImage.png";
import ImageTemplateImage from "../../Image/ImageTemplateImage.png";
import ExecutiveTemplateImage from "../../Image/ExecutiveTemplateImage.png";
import ProfessionalImageTemplate from "../../Image/ProfessionalImageTemplate.png";
import ClassicImageTemplate from "../../Image/ClassicImageTemplate.png";
import ProImageTemplate from "../../Image/ProImageTemplate.png"


const Template = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<"modern" | "image" | "executive" |"professional" | "classic" |  "pro" | null>(null);
  const navigate=useNavigate();

  const openTemplateDialog = (template: "modern" | "image" | "executive"| "professional" | "classic" | "pro") => {
    setSelectedTemplate(template);
  };

  const closeTemplateDialog = () => {
    setSelectedTemplate(null);
  };

  const handleTemplateSelection = () => {
    console.log(`Selected template: ${selectedTemplate}`);
    closeTemplateDialog();
    navigate("/builder", {
      state: {
        template: selectedTemplate,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-br from-purple-400 via-white to-pink-500 ">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-blue-700" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-800 to-purple-800 bg-clip-text text-transparent">
                Resume Templates
              </h1>
            </div>
            <p className="text-xl text-black-600 max-w-3xl mx-auto mb-8">
              Choose from our collection of professionally designed resume templates. Stand out from the crowd and land
              your dream job with a stunning resume.
            </p>
          </div>

          <div className="w-full h-px bg-gray-900" />


          {/* Template Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            {/* Modern Template */}
            <div
              className="cursor-pointer shadow-lg shadow-blue-600 rounded-lg overflow-hidden 
               hover:shadow-2xl hover:shadow-cyan-800 hover:scale-105 transition-transform duration-300 h-90 w-90"
              onClick={() => openTemplateDialog("modern")}
            >
              <img src={ModerTemplateImage} alt="Modern Template" className="w-full h-full object-center" />
            </div>

            {/* Image Template */}
            <div
              className="cursor-pointer shadow-lg shadow-blue-600 rounded-lg overflow-hidden 
               hover:shadow-2xl hover:shadow-cyan-800 hover:scale-105 transition-transform duration-300 h-90 w-90"
              onClick={() => openTemplateDialog("image")}
            >
              <img src={ImageTemplateImage} alt="Image Template"  className="w-full h-full object-fill" />
            </div>

            {/* Executive Template */}
             <div
              className="cursor-pointer shadow-lg shadow-blue-600 rounded-lg overflow-hidden 
               hover:shadow-2xl hover:shadow-cyan-800 hover:scale-105 transition-transform duration-300 h-90 w-90"
              onClick={() => openTemplateDialog("executive")}
            >
              <img src={ExecutiveTemplateImage} alt="executive Template"  className="w-full h-full object-fill" />
            </div>

            {/*Professional Template */}
             <div
              className="cursor-pointer shadow-lg shadow-blue-600 rounded-lg overflow-hidden 
               hover:shadow-2xl hover:shadow-cyan-800 hover:scale-105 transition-transform duration-300 h-90 w-90"
              onClick={() => openTemplateDialog("professional")}
            >
              <img src={ProfessionalImageTemplate} alt="executive Template"  className="w-full h-full object-fill" />
            </div>

            {/* Classic Template */}
             <div
              className="cursor-pointer shadow-lg shadow-blue-600 rounded-lg overflow-hidden 
               hover:shadow-2xl hover:shadow-cyan-800 hover:scale-105 transition-transform duration-300 h-90 w-90"
              onClick={() => openTemplateDialog("classic")}
            >
              <img src={ClassicImageTemplate} alt="Classic Template"  className="w-full h-full object-fill" />
            </div>

            {/* Pro Template */}
             <div
              className="cursor-pointer shadow-lg shadow-blue-600 rounded-lg overflow-hidden 
               hover:shadow-2xl hover:shadow-cyan-800 hover:scale-105 transition-transform duration-300 h-90 w-90"
              onClick={() => openTemplateDialog("pro")}
            >
              <img src={ProImageTemplate} alt="pro Template"  className="w-full h-full object-fill" />
            </div>
            




          </div>
        </div>
      </div>

      {/* Template Dialog */}
      <Dialog open={selectedTemplate !== null} onOpenChange={closeTemplateDialog}>
        <DialogContent className="h-screen w-screen bg-gradient-to-br from-blue-400 via-white to-pink-500 max-w-[90vw]">

          <DialogHeader>
            <DialogTitle>
              {selectedTemplate === "modern" && "Modern Professional Template"}
              {selectedTemplate === "image" && "Image Template"}
              {selectedTemplate === "executive" && "Executive Template"}
              {selectedTemplate === "professional" && "Professional Template"}
              {selectedTemplate === "classic" && "Classic Template"}
              {selectedTemplate === "pro" && "Pro Template"}
              {!selectedTemplate && "Resume Template"}
            </DialogTitle>
            <DialogDescription className="text-black-600">
              {selectedTemplate === "modern" && "A clean and professional resume layout"}
              {selectedTemplate === "image" && "A best resume template with modern touch"}
              {selectedTemplate === "executive" && "An executive-style resume for senior professionals"}
              {selectedTemplate === "professional" && "A professional resume template with a modern touch"}
              {selectedTemplate === "classic" && "A classic resume template with a timeless design"}
              {selectedTemplate === "pro" && "A perfect resume template with classic features"}
              {!selectedTemplate && "Preview of the selected resume template"}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 overflow-auto max-h-[80vh]">
            {selectedTemplate === "modern" && <ModernProfessionalTemplate data={defaultResumeData} />}
            {selectedTemplate === "image" && <ImageTemplate data={defaultResumeData} />}
            {selectedTemplate === "executive" && <ExecutiveTemplate data={defaultResumeData} />}
            {selectedTemplate === "professional" && <ProfessionalTemplate data={defaultResumeData} />}
            {selectedTemplate === "classic" && <ClassicTemplate data={defaultResumeData} />}
            {selectedTemplate === "pro" && <ProResumeTemplate data={defaultResumeData} />}
           
          </div>

          <div className="flex justify-center mt-4">
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-900 transition-colors cursor-pointer"
              onClick={handleTemplateSelection}
            >
              Use This Template
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Template;
