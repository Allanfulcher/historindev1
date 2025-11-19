'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Scanner } from '@yudiel/react-qr-scanner';
import { FiCamera, FiMap, FiAward, FiX, FiCheck } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import { qrService } from '@/services/qr.service';
import type { QrCode } from '@/types/database.types';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Menu from '@/components/Menu';

// Dynamically import map to avoid SSR issues with Leaflet
const QrHuntMap = dynamic(() => import('./_components/QrHuntMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Carregando mapa...</p>
    </div>
  ),
});

function QrHuntContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, signInWithGoogle } = useAuth();
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [qrCodes, setQrCodes] = useState<QrCode[]>([]);
  const [scannedIds, setScannedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    message: string;
    qrCode?: QrCode;
  } | null>(null);

  // Check if user came from external QR scan
  const externalQrId = searchParams?.get('qr');

  // Load QR codes and user progress
  useEffect(() => {
    loadData();
  }, [user]);

  // Handle external QR scan (from camera app)
  useEffect(() => {
    if (externalQrId && user) {
      handleExternalScan(externalQrId);
    }
  }, [externalQrId, user]);

  const loadData = async () => {
    setLoading(true);
    try {
      const allQrCodes = await qrService.getAllQrCodes();
      setQrCodes(allQrCodes);

      if (user) {
        const progress = await qrService.getUserProgress(user.id);
        setScannedIds(progress.scannedIds);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExternalScan = async (qrId: string) => {
    if (!user) return;

    try {
      const qrCode = await qrService.validateQrCode(qrId);
      if (!qrCode) {
        setScanResult({
          success: false,
          message: 'QR Code inválido',
        });
        return;
      }

      const alreadyScanned = await qrService.hasUserScanned(user.id, qrId);
      if (alreadyScanned) {
        setScanResult({
          success: false,
          message: 'Você já escaneou este QR Code!',
          qrCode,
        });
        return;
      }

      const scan = await qrService.saveScan(user.id, qrId);
      if (scan) {
        setScanResult({
          success: true,
          message: `Parabéns! Você escaneou: ${qrCode.name}`,
          qrCode,
        });
        await loadData(); // Refresh progress
      }
    } catch (error) {
      console.error('Error handling external scan:', error);
    }
  };

  const handleScan = async (result: any) => {
    if (scanning || !user) return;

    setScanning(true);
    try {
      const scannedValue = result?.[0]?.rawValue || result;
      
      // Validate QR code
      const qrCode = await qrService.validateQrCode(scannedValue);
      if (!qrCode) {
        setScanResult({
          success: false,
          message: 'QR Code inválido. Escaneie um QR Code do Historin!',
        });
        setScanning(false);
        setTimeout(() => setScanResult(null), 3000);
        return;
      }

      // Check if already scanned
      const alreadyScanned = await qrService.hasUserScanned(user.id, scannedValue);
      if (alreadyScanned) {
        setScanResult({
          success: false,
          message: 'Você já escaneou este QR Code!',
          qrCode,
        });
        setScanning(false);
        setTimeout(() => setScanResult(null), 3000);
        return;
      }

      // Save scan
      const scan = await qrService.saveScan(user.id, scannedValue);
      if (scan) {
        setScanResult({
          success: true,
          message: `Parabéns! Você escaneou: ${qrCode.name}`,
          qrCode,
        });
        await loadData(); // Refresh progress
        setShowScanner(false);
        setTimeout(() => setScanResult(null), 5000);
      }
    } catch (error) {
      console.error('Error scanning QR code:', error);
      setScanResult({
        success: false,
        message: 'Erro ao processar QR Code. Tente novamente.',
      });
    } finally {
      setScanning(false);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Error signing in:', error);
      alert('Erro ao fazer login. Tente novamente.');
    }
  };

  const progress = {
    scanned: scannedIds.length,
    total: qrCodes.length,
    percentage: qrCodes.length > 0 ? Math.round((scannedIds.length / qrCodes.length) * 100) : 0,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4ede0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B4513] mx-auto mb-4"></div>
          <p className="text-[#6B5B4F]">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4ede0]">
      <Header setMenuOpen={setMenuOpen} setShowFeedback={() => {}} setShowQuiz={() => {}} />
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* Page Title */}
      <div className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white py-8 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Caça ao QR Code</h1>
          <p className="text-white/90">
            Encontre e escaneie todos os QR Codes espalhados pela cidade!
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4">
        {/* Not Logged In */}
        {!user && (
          <div className="bg-white rounded-lg p-6 shadow-md mb-6 text-center">
            <FiAward className="w-16 h-16 text-[#8B4513] mx-auto mb-4" />
            <h2 className="text-xl font-bold text-[#4A3F35] mb-2">
              Faça login para participar!
            </h2>
            <p className="text-[#6B5B4F] mb-4">
              Entre com sua conta Google para começar a caçar QR Codes e ganhar prêmios.
            </p>
            <button
              onClick={handleLogin}
              className="bg-[#8B4513] hover:bg-[#A0522D] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Entrar com Google
            </button>
          </div>
        )}

        {/* Logged In */}
        {user && (
          <>
            {/* Progress Card */}
            <div className="bg-white rounded-lg p-6 shadow-md mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-[#4A3F35]">Seu Progresso</h2>
                <FiAward className="w-6 h-6 text-[#8B4513]" />
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-[#6B5B4F] mb-2">
                  <span>{progress.scanned} de {progress.total} QR Codes</span>
                  <span>{progress.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] h-4 rounded-full transition-all duration-500"
                    style={{ width: `${progress.percentage}%` }}
                  />
                </div>
              </div>

              {progress.percentage === 100 && (
                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 text-center">
                  <FiCheck className="w-12 h-12 text-green-500 mx-auto mb-2" />
                  <p className="text-green-700 font-bold">
                    🎉 Parabéns! Você completou a caça ao QR Code!
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => {
                  setShowScanner(!showScanner);
                  setShowMap(false);
                }}
                className={`${
                  showScanner
                    ? 'bg-[#8B4513] text-white'
                    : 'bg-white text-[#8B4513] border-2 border-[#8B4513]'
                } p-4 rounded-lg font-semibold transition-all hover:shadow-lg flex flex-col items-center gap-2`}
              >
                <FiCamera className="w-8 h-8" />
                <span>{showScanner ? 'Fechar Câmera' : 'Escanear QR'}</span>
              </button>

              <button
                onClick={() => {
                  setShowMap(!showMap);
                  setShowScanner(false);
                }}
                className={`${
                  showMap
                    ? 'bg-[#8B4513] text-white'
                    : 'bg-white text-[#8B4513] border-2 border-[#8B4513]'
                } p-4 rounded-lg font-semibold transition-all hover:shadow-lg flex flex-col items-center gap-2`}
              >
                <FiMap className="w-8 h-8" />
                <span>{showMap ? 'Fechar Mapa' : 'Ver Mapa'}</span>
              </button>
            </div>

            {/* Scanner */}
            {showScanner && (
              <div className="bg-white rounded-lg p-4 shadow-md mb-6">
                <div className="relative">
                  <Scanner
                    onScan={handleScan}
                    styles={{
                      container: {
                        width: '100%',
                        maxWidth: '500px',
                        margin: '0 auto',
                      },
                    }}
                  />
                  {scanning && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-[#4A3F35] font-semibold">Processando...</p>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-center text-sm text-[#6B5B4F] mt-4">
                  Aponte a câmera para um QR Code do Historin
                </p>
              </div>
            )}

            {/* Map */}
            {showMap && (
              <div className="bg-white rounded-lg p-4 shadow-md mb-6">
                <QrHuntMap qrCodes={qrCodes} scannedIds={scannedIds} />
              </div>
            )}

            {/* Scan Result Popup */}
            {scanResult && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        scanResult.success ? 'bg-green-100' : 'bg-red-100'
                      }`}
                    >
                      {scanResult.success ? (
                        <FiCheck className="w-6 h-6 text-green-600" />
                      ) : (
                        <FiX className="w-6 h-6 text-red-600" />
                      )}
                    </div>
                    <button
                      onClick={() => setScanResult(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <FiX className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <h3
                    className={`text-xl font-bold mb-2 ${
                      scanResult.success ? 'text-green-700' : 'text-red-700'
                    }`}
                  >
                    {scanResult.success ? 'Sucesso!' : 'Ops!'}
                  </h3>
                  
                  <p className="text-[#6B5B4F] mb-4">{scanResult.message}</p>
                  
                  {scanResult.qrCode && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <p className="text-sm text-[#6B5B4F]">
                        <strong>Local:</strong> {scanResult.qrCode.name}
                      </p>
                      {scanResult.qrCode.description && (
                        <p className="text-sm text-[#6B5B4F] mt-1">
                          {scanResult.qrCode.description}
                        </p>
                      )}
                    </div>
                  )}
                  
                  <button
                    onClick={() => setScanResult(null)}
                    className="w-full bg-[#8B4513] hover:bg-[#A0522D] text-white py-2 rounded-lg font-semibold transition-colors"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            )}

            {/* QR Code List */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-xl font-bold text-[#4A3F35] mb-4">
                QR Codes ({progress.scanned}/{progress.total})
              </h2>
              <div className="space-y-3">
                {qrCodes.map((qr) => {
                  const isScanned = scannedIds.includes(qr.id);
                  return (
                    <div
                      key={qr.id}
                      className={`p-4 rounded-lg border-2 ${
                        isScanned
                          ? 'bg-green-50 border-green-500'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#4A3F35]">{qr.name}</h3>
                          {qr.description && (
                            <p className="text-sm text-[#6B5B4F] mt-1">{qr.description}</p>
                          )}
                        </div>
                        {isScanned && (
                          <FiCheck className="w-6 h-6 text-green-600 ml-2" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function QrHuntPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f4ede0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B4513] mx-auto mb-4"></div>
          <p className="text-[#6B5B4F]">Carregando...</p>
        </div>
      </div>
    }>
      <QrHuntContent />
    </Suspense>
  );
}
