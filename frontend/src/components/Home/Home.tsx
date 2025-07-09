"use client"

import type React from "react"
import { FileText, Download, Zap, ArrowRight, BotMessageSquare  } from "lucide-react"



export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      
      {/* Hero Section */}
      <div className="flex flex-col   items-center min-h-screen justify-center px-4 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full  filter blur-xl opacity-70"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-fullfilter blur-xl opacity-70 "></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-200 rounded-full opacity-70 blur-xl"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
         

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
            Build Your Dream
            <br />
            <span className="text-4xl md:text-6xl">Resume</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
       Create a standout resume effortlessly with professional, modern templates designed to help you shine and secure your next opportunity.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="/builder"
              className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Start Building Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>          
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <FeatureCard
              icon={<FileText className="w-8 h-8 text-blue-600" />}
              title="Professional Templates"
              description="Choose templates designed by experts"
            />
            <FeatureCard
              icon={<BotMessageSquare className="w-8 h-8 text-purple-600" />}
              title="AI Assistant"
              description="Get Help from our AI assistant to optimize your content"
            />
            <FeatureCard
              icon={<Download className="w-8 h-8 text-indigo-600" />}
              title="Instant Download"
              description="Download your resume in PDF format with one click"
            />
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

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

