import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const filename = searchParams.get("filename")

    if (!filename) {
      return NextResponse.json({ error: "Filename is required" }, { status: 400 })
    }

    // Validate filename to prevent directory traversal
    const sanitizedFilename = path.basename(filename)
    const filePath = path.join(process.cwd(), "files", sanitizedFilename)

    console.log("Attempting to download file:", {
      requestedFilename: filename,
      sanitizedFilename,
      filePath,
    })

    // Check if file exists
    try {
      await fs.access(filePath)
    } catch (error) {
      console.error("File not found:", {
        filePath,
        error: error instanceof Error ? error.message : "Unknown error",
      })
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    // Read file
    const fileBuffer = await fs.readFile(filePath)
    console.log("File read successfully:", {
      filename: sanitizedFilename,
      size: fileBuffer.length,
    })

    // Determine content type based on file extension
    const ext = path.extname(sanitizedFilename).toLowerCase()
    let contentType = "application/octet-stream" // default content type

    switch (ext) {
      case ".pdf":
        contentType = "application/pdf"
        break
      case ".jpeg":
      case ".jpg":
        contentType = "image/jpeg"
        break
      case ".png":
        contentType = "image/png"
        break
      case ".gif":
        contentType = "image/gif"
        break
    }

    console.log("Setting content type:", {
      filename: sanitizedFilename,
      extension: ext,
      contentType,
    })

    // Set appropriate headers
    const headers = new Headers()
    headers.set("Content-Type", contentType)
    headers.set("Content-Disposition", `attachment; filename="${sanitizedFilename}"`)

    return new NextResponse(fileBuffer, {
      headers,
    })
  } catch (error) {
    console.error("Error downloading file:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    })
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 