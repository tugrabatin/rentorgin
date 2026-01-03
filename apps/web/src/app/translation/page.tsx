/**
 * Translation Engine Page
 * Premium Glassmorphic Design
 * Çeviri Motoru Sayfası
 */

'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ProtectedRoute } from '../../components/protected-route';
import { Navigation } from '../../components/navigation';
import { 
  Languages, 
  Upload,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  X,
  Sparkles,
  Loader
} from 'lucide-react';
import apiClient from '../../lib/api';

function TranslationContent() {
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sourceLang, setSourceLang] = useState('tr');
  const [targetLang, setTargetLang] = useState('en');
  const [uploading, setUploading] = useState(false);

  const { data: jobs, isLoading } = useQuery({
    queryKey: ['translation-jobs'],
    queryFn: async () => {
      // This would fetch jobs from API when implemented
      return [];
    },
  });

  const startTranslationMutation = useMutation({
    mutationFn: async (data: { documentUrl: string; sourceLang: string; targetLang: string }) => {
      const response = await apiClient.post('/translation/start', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['translation-jobs'] });
      setSelectedFile(null);
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    try {
      // In production, upload file first, then start translation
      // For now, simulate with a mock URL
      const documentUrl = `/uploads/${selectedFile.name}`;
      
      await startTranslationMutation.mutateAsync({
        documentUrl,
        sourceLang,
        targetLang,
      });
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-500/20 border-green-500/30 text-green-400';
      case 'IN_PROGRESS': return 'bg-blue-500/20 border-blue-500/30 text-blue-400';
      case 'PENDING': return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400';
      case 'FAILED': return 'bg-red-500/20 border-red-500/30 text-red-400';
      default: return 'bg-gray-500/20 border-gray-500/30 text-gray-400';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      PENDING: 'Bekliyor',
      IN_PROGRESS: 'Devam Ediyor',
      COMPLETED: 'Tamamlandı',
      FAILED: 'Başarısız',
      CANCELLED: 'İptal Edildi',
    };
    return labels[status] || status;
  };

  return (
    <div className="min-h-screen relative">
      <Navigation />
      
      <main className="md:ml-64 pt-16 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Hero Section */}
          <div className="hero-gradient glass-strong rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#00d4ff]/20 to-transparent rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl" style={{ animationDelay: '1s' }} />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="badge-glass flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-[#00d4ff]" />
                  <span>Çeviri Motoru</span>
                </div>
              </div>
              
              <div>
                <h1 className="text-4xl font-bold text-white mb-3 text-shadow flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl">
                    <Languages className="w-7 h-7 text-white" />
                  </div>
                  Çeviri Motoru
                </h1>
                <p className="text-white/70 text-lg">
                  Sözleşme ve belgeleri otomatik olarak çevirin
                </p>
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div className="glass-strong rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-shadow">
              Yeni Çeviri İşi Başlat
            </h2>

            <div className="space-y-6">
              {/* File Upload */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Belge Yükle <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center w-full h-32 glass-card rounded-xl cursor-pointer hover:glass-strong transition-all border-2 border-dashed border-white/20 hover:border-[#00d4ff]/50"
                  >
                    {selectedFile ? (
                      <div className="text-center">
                        <FileText className="w-8 h-8 text-[#00d4ff] mx-auto mb-2" />
                        <p className="text-white font-medium">{selectedFile.name}</p>
                        <p className="text-white/50 text-sm mt-1">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-white/40 mx-auto mb-2" />
                        <p className="text-white/60">Dosya seçmek için tıklayın</p>
                        <p className="text-white/40 text-sm mt-1">PDF, DOC, DOCX</p>
                      </div>
                    )}
                  </label>
                </div>
                {selectedFile && (
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="mt-2 text-sm text-red-400 hover:text-red-300 flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    Dosyayı Kaldır
                  </button>
                )}
              </div>

              {/* Language Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Kaynak Dil <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={sourceLang}
                    onChange={(e) => setSourceLang(e.target.value)}
                    className="w-full px-4 py-3 glass rounded-xl text-white focus-glass transition-smooth"
                  >
                    <option value="tr">Türkçe</option>
                    <option value="en">İngilizce</option>
                    <option value="de">Almanca</option>
                    <option value="fr">Fransızca</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Hedef Dil <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={targetLang}
                    onChange={(e) => setTargetLang(e.target.value)}
                    className="w-full px-4 py-3 glass rounded-xl text-white focus-glass transition-smooth"
                  >
                    <option value="en">İngilizce</option>
                    <option value="tr">Türkçe</option>
                    <option value="de">Almanca</option>
                    <option value="fr">Fransızca</option>
                  </select>
                </div>
              </div>

              {/* Start Button */}
              <button
                onClick={handleUpload}
                disabled={!selectedFile || uploading || startTranslationMutation.isPending}
                className="btn-glass !bg-gradient-to-r from-purple-500 to-pink-500 glow-primary w-full flex items-center justify-center gap-2"
              >
                {uploading || startTranslationMutation.isPending ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Yükleniyor...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Çeviri İşini Başlat
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Jobs List */}
          <div className="glass-strong rounded-3xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white text-shadow">
                  Çeviri İşleri
                </h2>
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00d4ff]"></div>
              </div>
            ) : jobs && jobs.length > 0 ? (
              <div className="space-y-4">
                {jobs.map((job: any) => (
                  <div key={job.id} className="group glass-card p-6 relative overflow-hidden hover:glass-strong transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-white group-hover:gradient-text transition-all">
                            {job.sourceLanguage.toUpperCase()} → {job.targetLanguage.toUpperCase()}
                          </h3>
                          <span className={`badge-glass ${getStatusColor(job.status)}`}>
                            {getStatusLabel(job.status)}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-white/50 text-xs mb-1">İlerleme</p>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 glass-light rounded-full h-2 overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-[#00d4ff] to-[#00e5cc] transition-all"
                                  style={{ width: `${job.progress || 0}%` }}
                                />
                              </div>
                              <span className="text-white text-sm font-semibold">
                                {job.progress?.toFixed(0) || 0}%
                              </span>
                            </div>
                          </div>
                          <div>
                            <p className="text-white/50 text-xs mb-1">Toplam Segment</p>
                            <p className="text-white font-semibold">{job.totalSegments || 0}</p>
                          </div>
                          <div>
                            <p className="text-white/50 text-xs mb-1">Tamamlanan</p>
                            <p className="text-white font-semibold">{job.completedSegments || 0}</p>
                          </div>
                          <div>
                            <p className="text-white/50 text-xs mb-1">Oluşturulma</p>
                            <p className="text-white text-sm">
                              {new Date(job.createdAt).toLocaleDateString('tr-TR')}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {job.status === 'COMPLETED' && job.translatedDocumentUrl && (
                          <a
                            href={job.translatedDocumentUrl}
                            download
                            className="btn-glass !p-2 w-10 h-10 flex items-center justify-center"
                          >
                            <Download className="w-5 h-5 text-white/80" />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Languages className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/60 mb-4">Henüz çeviri işi yok</p>
                <p className="text-white/40 text-sm">
                  Yukarıdaki formu kullanarak yeni bir çeviri işi başlatın
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function TranslationPage() {
  return (
    <ProtectedRoute>
      <TranslationContent />
    </ProtectedRoute>
  );
}







