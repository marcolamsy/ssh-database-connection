"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, FileText, Loader2, Eye, EyeOff } from "lucide-react"

interface PasswordDialogProps {
  isOpen: boolean
  onClose: () => void
  file: {
    id: string
    name: string
    description: string
    password: string
    type: string
    size: string
    lastModified: string
    path: string
  }
}

export default function PasswordDialog({ isOpen, onClose, file }: PasswordDialogProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Simulate password verification
    setTimeout(() => {
      if (password === file.password) {
        setSuccess(true)
        setLoading(false)
      } else {
        setError("Incorrect password. Please try again.")
        setLoading(false)
      }
    }, 1000)
  }

  const handleDownload = async () => {
    try {
      // Show loading state
      setLoading(true)

      // Fetch the file from the API
      const response = await fetch(`/api/download?filename=${encodeURIComponent(file.path)}`)
      
      if (!response.ok) {
        throw new Error('Failed to download file')
      }

      // Get the blob from the response
      const blob = await response.blob()
      
      // Create download link
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = file.name
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error downloading file:', error)
      setError('Failed to download file. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose()
          setPassword("")
          setError("")
          setSuccess(false)
          setShowPassword(false)
        }
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-slate-700" />
            {file.name}
          </DialogTitle>
          <DialogDescription>
            This file is password protected. Please enter the file password to access.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-6">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
              <p className="text-lg font-medium">Access Granted</p>
              <Button onClick={handleDownload} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Downloading...
                  </>
                ) : (
                  "Download File"
                )}
              </Button>
              <Button variant="outline" onClick={onClose} disabled={loading}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2 mb-4">
              <Label htmlFor="file-password">File Password</Label>
              <div className="relative">
                <Input
                  id="file-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter file password"
                  autoComplete="off"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Access File"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
