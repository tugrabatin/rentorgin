/**
 * File Upload Component
 * Reusable file upload component with drag & drop
 * 
 * Dosya Yükleme Bileşeni
 * Sürükle & bırak ile yeniden kullanılabilir dosya yükleme bileşeni
 */

'use client';

import { useState, useRef } from 'react';
import { Upload, File, X, CheckCircle } from 'lucide-react';
import apiClient from '../lib/api';

interface FileUploadProps {
  accept?: string;
  maxSize?: number; // in MB
  onUploadComplete?: (file: any) => void;
}

export function FileUpload({ 
  accept = '.pdf,.doc,.docx', 
  maxSize = 50,
  onUploadComplete 
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    setError('');
    setUploaded(false);

    // Validate file size
    if (selectedFile.size > maxSize * 1024 * 1024) {
      setError(`Dosya boyutu ${maxSize}MB'dan küçük olmalıdır`);
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await apiClient.post('/upload/contract', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploaded(true);
      onUploadComplete?.(response.data.file);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Yükleme başarısız oldu');
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  return (
    <div className="w-full">
      {/* Drag & Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition ${
          isDragging
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={(e) => {
            const selectedFile = e.target.files?.[0];
            if (selectedFile) handleFileSelect(selectedFile);
          }}
          className="hidden"
        />

        {!file ? (
          <div>
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-700 mb-2">
              Dosyayı sürükleyip bırakın veya
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
            >
              Dosya Seç
            </button>
            <p className="text-sm text-gray-500 mt-4">
              PDF, DOC, DOCX • Max {maxSize}MB
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-center gap-3 mb-4">
              <File className="w-8 h-8 text-primary-500" />
              <div className="text-left">
                <p className="font-medium text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-600">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              {!uploaded && (
                <button
                  onClick={() => setFile(null)}
                  className="p-1 rounded-full hover:bg-gray-200"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              )}
              {uploaded && (
                <CheckCircle className="w-6 h-6 text-green-500" />
              )}
            </div>

            {!uploaded && !uploading && (
              <button
                onClick={handleUpload}
                className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
              >
                Yükle
              </button>
            )}

            {uploading && (
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-500"></div>
                <span>Yükleniyor...</span>
              </div>
            )}

            {uploaded && (
              <p className="text-green-600 font-medium">
                ✓ Yükleme başarılı!
              </p>
            )}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}


















