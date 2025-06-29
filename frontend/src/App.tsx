import Navbar from "./components/NavBar/NavBar"
import { Routes, Route } from 'react-router-dom';
import SignupPage from "./components/SignUp_Page/SignupPage";
import GoogleWrapper from "./googleWrapper/googleWrapper";
import Template from "./components/templatesPage/Template";
// import ModernTemplate from "./components/templatesPage/templates/ModernTemplate";
// import ImageTemplate from "./components/templatesPage/templates/ImageTemplate";
import ResumeBuilder from "./components/ResumeBuildPage/ResumeBuilder";
import Preview from "./components/Preview/PreviewPage";
// import ExecutiveTemplate from "./components/templatesPage/templates/ExecutiveTemplate ";
// import ProfessionalTemplate from "./components/templatesPage/templates/ProfessionalTemplate";
// import SkillBar from "./components/templatesPage/templates/ClassicTemplate"
import ProResumeTemplate from "./components/templatesPage/templates/try";
import ResumeBot from "./components/ResumeBot/ResumeBot";
import PrivateRoute from "./Private/PrivateRoute";
import Admin from "./components/Admin DashBoard/Admin";
import NotFound from "./components/NotFound/NotFound";
import About from "./components/About/About";
import Home from "./components/Home/Home";





function App() {
  const isPreview = window.location.pathname === '/preview';
  return (
    <>

      {!isPreview && <ResumeBot />}
      {!isPreview && <Navbar />}
      <Routes>
        <Route path="/register" element={<SignupPage />} />
        <Route path="/login" element={<GoogleWrapper />} />
        <Route path="templates" element={<Template />} />
        <Route path="/builder" element={<PrivateRoute element={ResumeBuilder} requiredRole={["user" , "admin"]} />} />
        <Route path="/admin-dashboard" element={<PrivateRoute element={Admin} requiredRole="admin"/>} />
        {/* <Route path="/builder" element={<ResumeBuilder />} /> */}
        <Route path="/bot" element={<ResumeBot />} />
        <Route path="imgtemp" element={
          <ProResumeTemplate data={{
            fullName: "",
            jobTitle: "",
            email: "",
            phone: "",
            address: "",
            summary: "",
            experience: [],
            github: "",
            linkedin: "",
            portfolio: "",
            education: [],
            skills: ""
          }} />
        } />
        <Route path="/preview" element={<Preview />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
