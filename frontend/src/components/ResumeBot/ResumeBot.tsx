import { Webchat } from "@botpress/webchat"
import { useState, useEffect } from "react"
import { MessageCircle, X } from "lucide-react"

interface ResumeBotProps {
  clientId?: string
}

function ResumeBot({ clientId = import.meta.env.VITE_BOT_CLIENT_ID }: ResumeBotProps) {
  const [isWebchatOpen, setIsWebchatOpen] = useState(false)

  const toggleWebchat = () => {
    setIsWebchatOpen(!isWebchatOpen)
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isWebchatOpen) {
        toggleWebchat()
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isWebchatOpen])

  return (
    <>
      {/* Floating toggle button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={toggleWebchat}
          className="w-12 h-12 rounded-full cursor-pointer bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition"
          aria-label={isWebchatOpen ? "Close Chat" : "Open Chat"}
        >
          {isWebchatOpen ? <X className="w-5 h-5 cursor-pointer " /> : <MessageCircle className="w-5 h-5 cursor-pointer" />}
        </button>
      </div>

      {/* Minimal Chat Window */}
      {isWebchatOpen && (
        <div
          className="fixed bottom-20 right-4 z-40 w-[320px] h-[480px] bg-white border border-gray-300 rounded-md shadow-md"
        >
          <div className="flex justify-between items-center p-2 border-b bg-gray-100">
            <span className="text-sm font-medium">Resume Assistant</span>
            <button onClick={toggleWebchat} className="text-gray-500 hover:text-gray-700">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="h-full">
            <Webchat
              clientId={clientId}
              className="w-full h-full"
              style={{
               width: "100%",
                height: "calc(100% - 40px)", 
                borderRadius: "0 0 0.375rem 0.375rem"
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default ResumeBot
