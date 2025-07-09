import type React from "react"
import { Users, Shield, Zap, CheckCircle, ArrowRight } from "lucide-react"

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            About Resume Builder
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Empowering job seekers with professionally crafted resumes and modern, eye-catching templates.
          </p>
        </div>

        {/* Story */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-12 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Our mission is to simplify the job application process by offering modern, professionally designed resume templates and a smart AI-powered bot that guides you through every step of creating your resume.
            Whether you’re just beginning your career or aiming for your next big opportunity, our platform makes it easy to create a standout resume—so you can focus on what really matters: landing your dream job.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
              10+ Resumes Created
            </div>
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">
              95% Success Rate
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <ValueCard
              icon={<Users className="w-8 h-8 text-blue-600" />}
              title="For Every Job Seeker"
              description="Designed for students, professionals, and career changers alike"
            />
            <ValueCard
              icon={<Shield className="w-8 h-8 text-green-600" />}
              title="Privacy First"
              description="Your resumes and personal data are always secure and never shared"
            />
            <ValueCard
              icon={<Zap className="w-8 h-8 text-purple-600" />}
              title="AI Resume Bot"
              description="Generate, refine, and optimize your resume with smart, step-by-step AI guidance."
            />
          </div>
        </div>

        {/* Features */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-12 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Key Features</h3>
          <div className="space-y-4">
            <FeatureItem
              icon={<CheckCircle className="w-5 h-5 text-green-500" />}
              title="Modern, Customizable Templates"
              description="Choose from a variety of beautiful designs to match your style and profession"
            />
            <FeatureItem
              icon={<CheckCircle className="w-5 h-5 text-green-500" />}
              title="Resume Bot Assistance"
              description="Get step-by-step help from our AI-powered bot to write and optimize your resume in real time."
            />

            <FeatureItem
              icon={<CheckCircle className="w-5 h-5 text-green-500" />}
              title="One-Click PDF Download"
              description="Instantly export your resume in high-quality PDF format"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="mb-6 text-blue-100">
           Join people who’ve landed their dream jobs with our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-white cursor-pointer text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              onClick={() => window.location.href = '/builder'}>
              Start Building Now
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="border-2 border-white cursor-pointer text-white font-semibold py-3 px-6 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
             onClick={() => window.location.href = '/templates'}>
              View Templates
            </button>
          </div>
        </div>

        
      </div>
         {/* Footer Section */}
      <footer className="bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100  ">   
        <div className="border-t border-gray-100 mt-8 pt-6 pb-6 text-lg text-center text-gray-500 ">
          &copy; {new Date().getFullYear()} Resume Builder. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

interface ValueCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function ValueCard({ icon, title, description }: ValueCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 text-center">
      <div className="mb-3 p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl inline-block">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}

interface FeatureItemProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureItem({ icon, title, description }: FeatureItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  )
}

