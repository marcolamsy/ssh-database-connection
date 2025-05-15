"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import FileCard from "@/components/file-card"
import PasswordDialog from "@/components/password-dialog"
import { Button } from "@/components/ui/button"
import { LogOut, Database } from "lucide-react"

export default function Dashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Files data with their passwords
  const files = [
    {
      id: "file1",
      name: "任務1提示 (1)",
      description: "",
      password: "@20100628ssh!",
      type: "PDF Document",
      size: "24 MB",
      lastModified: "2025-05-18",
      path: "member_list.pdf"
    },
    {
      id: "file2",
      name: "任務1提示 (2)",
      description: "",
      password: "@20100628ssh!",
      type: "PDF Document",
      size: "921 KB",
      lastModified: "2025-05-18",
      path: "18052025_Leo Club Shrson Hill Annual Dinner_Ballroom_11 tables.pdf"
    },
    {
      id: "file3",
      name: "任務2提示 (1)",
      description: "",
      password: "96583905",
      type: "PDF Document",
      size: "977 KB",
      lastModified: "2025-05-18",
      path: "調查報告.pdf"
    },
    {
      id: "file4",
      name: "任務2提示 (2)",
      description: "",
      password: "96583905",
      type: "Image Document",
      size: "977 KB",
      lastModified: "2025-05-18",
      path: "image.jpeg"
    },
  ]

  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem("isAuthenticated")
    if (authStatus !== "true") {
      router.push("/")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleFileClick = (fileId: string) => {
    setSelectedFile(fileId)
    setIsDialogOpen(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    router.push("/")
  }

  if (!isAuthenticated) {
    return null // Don't render anything until authentication check completes
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Database className="h-6 w-6 text-slate-700 mr-2" />
            <h1 className="text-xl font-bold text-slate-800">壽臣山青年獅子會資料庫</h1>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Disconnect
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">受保護資料庫</h2>
          <p className="text-gray-600">存取文件需要額外驗證</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file) => (
            <FileCard key={file.id} file={file} onClick={() => handleFileClick(file.id)} />
          ))}
        </div>
      </main>

      {selectedFile && (
        <PasswordDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          file={files.find((f) => f.id === selectedFile)!}
        />
      )}
    </div>
  )
}
