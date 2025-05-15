"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileIcon, LockIcon, Calendar, HardDrive } from "lucide-react"

interface FileProps {
  file: {
    id: string
    name: string
    description: string
    password: string
    type: string
    size: string
    lastModified: string
  }
  onClick: () => void
}

export default function FileCard({ file, onClick }: FileProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{file.name}</CardTitle>
          <LockIcon className="h-4 w-4 text-amber-500" />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-gray-600 mb-4">{file.description}</p>
        <div className="space-y-2 text-xs text-gray-500">
          <div className="flex items-center">
            <FileIcon className="h-3.5 w-3.5 mr-2" />
            <span>{file.type}</span>
          </div>
          <div className="flex items-center">
            <HardDrive className="h-3.5 w-3.5 mr-2" />
            <span>{file.size}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-2" />
            <span>Modified: {file.lastModified}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={onClick}>
          Access File
        </Button>
      </CardFooter>
    </Card>
  )
}
