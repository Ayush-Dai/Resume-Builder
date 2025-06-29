import ModernTemplate from "../templatesPage/templates/ModernTemplate";
import ImageTemplate from "../templatesPage/templates/ImageTemplate";
import ExecutiveTemplate from "../templatesPage/templates/ExecutiveTemplate ";
import ProfessionalTemplate from "../templatesPage/templates/ProfessionalTemplate";
import ClassicTemplate from "../templatesPage/templates/ClassicTemplate";
import ProResumeTemplate from "../templatesPage/templates/try";

const Preview = () => {
  // Prefer injected data (for Puppeteer), fallback to localStorage for browser
  const injectedData = typeof window !== "undefined" ? (window as any).__RESUME_DATA__ : undefined;
  const formData = injectedData || JSON.parse(localStorage.getItem("resumeData") || "{}");

  // Prefer template from injected data, then query param, then default
  const query = new URLSearchParams(window.location.search);
  const template = (injectedData && injectedData.template) ||
    query.get("template") ||
    "modern" || "professional || classic || image || executive || pro ";

  return (
    <div>
      {template === "image" && <ImageTemplate data={formData} />}
      {template === "modern" && <ModernTemplate data={formData} />}
      {template === "executive" && <ExecutiveTemplate data={formData} />}
      {template === "professional" && <ProfessionalTemplate data={formData} />}
      {template === "classic" && <ClassicTemplate data={formData} />}
      {template === "pro" && <ProResumeTemplate data={formData} />}


    </div>
  );
};

export default Preview;