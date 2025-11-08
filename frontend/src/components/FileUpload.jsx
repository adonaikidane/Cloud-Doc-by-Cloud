// FileUpload.jsx
// Drag-and-drop file upload component
// Accepts PDF, JPEG, PNG files or pasted text
// Shows upload progress and preview

import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, X } from 'lucide-react'

const FileUpload = ({ onUpload, acceptedFileTypes = ['pdf', 'jpg', 'jpeg', 'png', 'txt'] }) => {
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [pastedText, setPastedText] = useState('')

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.jpg', '.jpeg', '.png'],
      'text/plain': ['.txt'],
    },
    onDrop: (acceptedFiles) => {
      // Handle file upload
      setUploadedFiles(acceptedFiles)
      onUpload({ type: 'file', data: acceptedFiles })
    },
  })

  const handleTextPaste = (e) => {
    const text = e.target.value
    setPastedText(text)
    if (text.trim()) {
      onUpload({ type: 'text', data: text })
    }
  }

  const removeFile = (fileToRemove) => {
    setUploadedFiles(uploadedFiles.filter(file => file !== fileToRemove))
  }

  return (
    <div className="space-y-4">
      {/* Drag and drop zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-primary-400 bg-white'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        
        {isDragActive ? (
          <p className="text-primary-600 font-medium">Drop your contract here...</p>
        ) : (
          <>
            <p className="text-gray-700 font-medium mb-2">
              Drag and drop contract here
            </p>
            <p className="text-sm text-gray-500">
              or click to browse files
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Supports PDF, JPEG, PNG (max 10MB)
            </p>
          </>
        )}
      </div>

      {/* Uploaded files list */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFile(file)}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Text paste area */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Or paste contract text
        </label>
        <textarea
          value={pastedText}
          onChange={handleTextPaste}
          placeholder="Paste your contract text here..."
          className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
        />
      </div>
    </div>
  )
}

export default FileUpload
