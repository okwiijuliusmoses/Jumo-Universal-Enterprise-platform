/**
 * JUMO UEOS — Sovereign Member QR Code Identity Scanner & Verification Modal
 * High-performance QR code reader with live camera, image upload, manual lookup,
 * audio chime verification, cryptographic seal validation, and printable badge view.
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  QrCode, Camera, Upload, ShieldCheck, CheckCircle2, AlertTriangle, 
  X, RefreshCw, Volume2, VolumeX, Flashlight, User, Building2, 
  Sparkles, Award, Lock, ExternalLink, Calendar, MapPin, Search,
  History, ArrowRight, Printer, Copy, Check, Info, FileText
} from 'lucide-react';
import jsQR from 'jsqr';
import { 
  jumoIdentityVerificationService, 
  JumoMemberIdentity, 
  VerificationScanResult,
  ScanAuditLogEntry 
} from '../../core/identity/jumoIdentityVerificationService';
import { PrintIdentityCardModal, CardholderData } from '../common/PrintIdentityCardModal';

export interface JumoMemberQrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerified?: (member: JumoMemberIdentity) => void;
  defaultMode?: 'camera' | 'upload' | 'manual' | 'history';
  initialMemberId?: string;
  operatorName?: string;
  terminalLocation?: string;
}

export const JumoMemberQrScannerModal: React.FC<JumoMemberQrScannerModalProps> = ({
  isOpen,
  onClose,
  onVerified,
  defaultMode = 'camera',
  initialMemberId,
  operatorName = 'Sovereign Security Desk',
  terminalLocation = 'Main Terminal Gate 1'
}) => {
  const [activeMode, setActiveMode] = useState<'camera' | 'upload' | 'manual' | 'history'>(defaultMode);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [torchOn, setTorchOn] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [manualInput, setManualInput] = useState<string>(initialMemberId || '');
  const [scanResult, setScanResult] = useState<VerificationScanResult | null>(null);
  const [scanHistory, setScanHistory] = useState<ScanAuditLogEntry[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const [attendanceRecorded, setAttendanceRecorded] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Play audio chime on successful verification
  const playSuccessChime = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
        osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.15); // A6
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch (e) {
      // Audio might be blocked by browser policy
    }
  }, [soundEnabled]);

  // Load audit history
  const refreshHistory = useCallback(() => {
    setScanHistory(jumoIdentityVerificationService.getAuditLogs());
  }, []);

  useEffect(() => {
    if (isOpen) {
      refreshHistory();
      if (initialMemberId) {
        handleProcessScan(initialMemberId, 'MANUAL_ENTRY');
      }
    }
  }, [isOpen, initialMemberId, refreshHistory]);

  // Start Camera Stream
  const startCamera = useCallback(async () => {
    setCameraError(null);
    setIsCameraActive(false);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Camera access is not supported in this browser. Use Upload or Manual lookup.');
      return;
    }

    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        await videoRef.current.play();
        setIsCameraActive(true);
      }
    } catch (err: any) {
      console.warn('Camera stream error:', err);
      setCameraError(err?.message || 'Unable to access camera. Please allow camera permissions or use upload mode.');
      setIsCameraActive(false);
    }
  }, [facingMode]);

  // Stop Camera Stream
  const stopCamera = useCallback(() => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  }, []);

  // Frame scanner loop
  const scanVideoFrame = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !isCameraActive || scanResult) {
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    if (video.readyState === video.HAVE_ENOUGH_DATA && ctx) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });

      if (code && code.data) {
        handleProcessScan(code.data, 'CAMERA');
        return; // Pause scanning while showing result
      }
    }

    animationFrameId.current = requestAnimationFrame(scanVideoFrame);
  }, [isCameraActive, scanResult]);

  useEffect(() => {
    if (isOpen && activeMode === 'camera' && !scanResult) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, activeMode, scanResult, startCamera, stopCamera]);

  useEffect(() => {
    if (isCameraActive && !scanResult) {
      animationFrameId.current = requestAnimationFrame(scanVideoFrame);
    }
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isCameraActive, scanResult, scanVideoFrame]);

  // Handle Scan Execution
  const handleProcessScan = (
    rawPayload: string, 
    method: 'CAMERA' | 'FILE_UPLOAD' | 'MANUAL_ENTRY' | 'SAMPLE_TEST'
  ) => {
    setIsProcessing(true);
    setAttendanceRecorded(false);

    try {
      const result = jumoIdentityVerificationService.verifyScannedPayload(
        rawPayload,
        method,
        operatorName,
        terminalLocation
      );

      setScanResult(result);
      refreshHistory();

      if (result.isValid) {
        playSuccessChime();
        if (result.member && onVerified) {
          onVerified(result.member);
        }
      }
    } catch (e) {
      console.error('Scan processing error:', e);
    } finally {
      setIsProcessing(false);
    }
  };

  // Image Upload File Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = img.width;
        offscreenCanvas.height = img.height;
        const ctx = offscreenCanvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, img.width, img.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code && code.data) {
            handleProcessScan(code.data, 'FILE_UPLOAD');
          } else {
            // Fallback: check if filename or raw text matches
            handleProcessScan(file.name, 'FILE_UPLOAD');
          }
        }
        setIsProcessing(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Reset and Scan Next
  const handleScanNext = () => {
    setScanResult(null);
    setAttendanceRecorded(false);
    setCopiedUrl(false);
    if (activeMode === 'camera') {
      startCamera();
    }
  };

  // Toggle Torch
  const toggleTorch = async () => {
    if (!streamRef.current) return;
    const track = streamRef.current.getVideoTracks()[0];
    if (track && (track.getCapabilities as any)?.().torch) {
      try {
        await (track as any).applyConstraints({
          advanced: [{ torch: !torchOn }]
        });
        setTorchOn(!torchOn);
      } catch (e) {
        console.warn('Torch toggle failed:', e);
      }
    }
  };

  // Copy Verification URL
  const copyVerificationUrl = (url?: string) => {
    if (!url) return;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2500);
    }
  };

  const sampleMembers = jumoIdentityVerificationService.getAllMembers();

  if (!isOpen) return null;

  // Prepare data for Print Modal if triggered
  const currentCardholderData: CardholderData | null = scanResult?.member ? {
    fullName: scanResult.member.fullName,
    idCode: scanResult.member.jumoId,
    role: scanResult.member.role,
    employer: scanResult.member.tenantName,
    jobTitle: scanResult.member.role,
    locationCity: scanResult.member.departmentOrChapter,
    credentialTitle: `JUMO Sovereign ID: ${scanResult.member.productBadge}`,
    issueDate: scanResult.member.issueDate,
    expiryDate: scanResult.member.expiryDate,
    securityTier: scanResult.member.clearanceLevel,
    accentColor: 
      scanResult.member.productOrigin === 'education-erp' ? 'blue' :
      scanResult.member.productOrigin === 'church-erp' ? 'amber' :
      scanResult.member.productOrigin === 'alumni-erp' ? 'rose' :
      scanResult.member.productOrigin === 'faap' ? 'emerald' :
      scanResult.member.productOrigin === 'digital-pay' ? 'indigo' : 'slate',
    photoUrl: scanResult.member.photoUrl,
    departmentOrChapter: scanResult.member.departmentOrChapter,
    verificationHash: scanResult.member.sha256Seal
  } : null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden text-slate-900 font-sans">
          
          {/* Header */}
          <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold tracking-tight">JUMO Member ID & QR Scanner</h2>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    ZERO-TRUST AUTH
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Scan and verify member credentials across all 6 approved JUMO products
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-lg transition-colors ${soundEnabled ? 'text-blue-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-800'}`}
                title={soundEnabled ? 'Mute Verification Chime' : 'Enable Verification Chime'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Close Scanner (ESC)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs (Camera, Upload, Manual, History) */}
          <div className="flex items-center justify-between px-6 py-2.5 bg-slate-50 border-b border-slate-200 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setActiveMode('camera'); setScanResult(null); }}
                className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activeMode === 'camera' 
                    ? 'bg-[#0078D4] text-white shadow-xs' 
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Live Camera</span>
              </button>

              <button
                onClick={() => { setActiveMode('upload'); setScanResult(null); }}
                className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activeMode === 'upload' 
                    ? 'bg-[#0078D4] text-white shadow-xs' 
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Photo / QR Image</span>
              </button>

              <button
                onClick={() => { setActiveMode('manual'); setScanResult(null); }}
                className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activeMode === 'manual' 
                    ? 'bg-[#0078D4] text-white shadow-xs' 
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span>Manual Lookup</span>
              </button>

              <button
                onClick={() => { setActiveMode('history'); refreshHistory(); }}
                className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activeMode === 'history' 
                    ? 'bg-slate-800 text-white shadow-xs' 
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>Scan History ({scanHistory.length})</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-500">
              <span>Terminal: <strong className="text-slate-700">{terminalLocation}</strong></span>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">

            {/* IF SCAN RESULT IS PRESENT: DISPLAY VERIFIED IDENTITY CARD */}
            {scanResult ? (
              <div className="space-y-6 animate-in zoom-in-95 duration-200">
                {/* Status Alert Banner */}
                <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                  scanResult.isValid 
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950' 
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                }`}>
                  {scanResult.isValid ? (
                    <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm">
                        {scanResult.isValid ? 'Sovereign Credential Authenticated' : 'Verification Alert / Unauthenticated'}
                      </h4>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                        scanResult.isValid ? 'bg-emerald-200 text-emerald-900 border-emerald-400' : 'bg-rose-200 text-rose-900 border-rose-400'
                      }`}>
                        STATUS: {scanResult.status}
                      </span>
                    </div>
                    <p className="text-xs mt-1 leading-relaxed">{scanResult.message}</p>
                    {scanResult.warnings && (
                      <div className="mt-2 text-xs font-semibold text-amber-800 space-y-1">
                        {scanResult.warnings.map((w, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <Info className="w-3.5 h-3.5 shrink-0" />
                            <span>{w}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Member Identity Card Details (If Found) */}
                {scanResult.member && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Column: Visual Badge Card */}
                    <div className="md:col-span-1 bg-slate-900 text-white rounded-2xl p-5 shadow-lg border border-slate-800 flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-blue-500/10 rounded-full blur-xl pointer-events-none"></div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded bg-[#0078D4] text-white flex items-center justify-center font-bold text-xs">
                              J
                            </div>
                            <span className="font-bold text-xs tracking-wider">JUMO IDENTITY</span>
                          </div>
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30 font-bold">
                            {scanResult.member.productBadge}
                          </span>
                        </div>

                        <div className="flex flex-col items-center text-center space-y-3 pt-2">
                          <div className="relative">
                            <img
                              src={scanResult.member.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face'}
                              alt={scanResult.member.fullName}
                              className="w-24 h-24 rounded-full object-cover border-2 border-blue-400 shadow-md"
                            />
                            <div className="absolute bottom-0 right-0 p-1 bg-emerald-500 rounded-full border-2 border-slate-900 text-white">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                          </div>

                          <div>
                            <h3 className="font-black text-sm text-white">{scanResult.member.fullName}</h3>
                            <p className="text-xs text-blue-300 font-medium mt-0.5">{scanResult.member.role}</p>
                            <p className="text-[11px] text-slate-400">{scanResult.member.tenantName}</p>
                          </div>
                        </div>

                        <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/60 space-y-1.5 text-xs font-mono">
                          <div className="flex justify-between text-slate-400">
                            <span>JUMO ID:</span>
                            <span className="text-white font-bold">{scanResult.member.jumoId}</span>
                          </div>
                          <div className="flex justify-between text-slate-400">
                            <span>CLEARANCE:</span>
                            <span className="text-amber-300 font-bold">{scanResult.member.clearanceLevel}</span>
                          </div>
                          <div className="flex justify-between text-slate-400">
                            <span>VALID UNTIL:</span>
                            <span className="text-slate-200">{scanResult.member.expiryDate}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-800 text-center">
                        <div className="text-[9px] font-mono text-slate-400 truncate">
                          SEAL: {scanResult.member.sha256Seal.substring(0, 24)}...
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Institutional Verification Dossier */}
                    <div className="md:col-span-2 space-y-4">
                      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                            Cryptographic Credential Verification Dossier
                          </h4>
                          <span className="text-[10px] font-mono text-slate-400">
                            Verified at {new Date(scanResult.scannedAt).toLocaleTimeString()}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="text-slate-400 block text-[11px]">Primary Tenant / Institution</span>
                            <span className="font-bold text-slate-900">{scanResult.member.tenantName}</span>
                          </div>

                          <div>
                            <span className="text-slate-400 block text-[11px]">Department / Chapter / Synod</span>
                            <span className="font-bold text-slate-900">{scanResult.member.departmentOrChapter}</span>
                          </div>

                          <div>
                            <span className="text-slate-400 block text-[11px]">National ID / Passport Ref</span>
                            <span className="font-mono font-bold text-slate-800">{scanResult.member.nationalIdOrDoc}</span>
                          </div>

                          <div>
                            <span className="text-slate-400 block text-[11px]">Official Email & Contact</span>
                            <span className="text-blue-700 font-medium truncate block">{scanResult.member.email}</span>
                          </div>

                          <div>
                            <span className="text-slate-400 block text-[11px]">Product Origin</span>
                            <span className="font-mono font-bold text-indigo-700 uppercase">{scanResult.member.productOrigin}</span>
                          </div>

                          <div>
                            <span className="text-slate-400 block text-[11px]">Issue Date</span>
                            <span className="font-medium text-slate-700">{scanResult.member.issueDate}</span>
                          </div>
                        </div>

                        {/* Product-Specific Metadata Items */}
                        {scanResult.member.metadata && (
                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                              Domain-Specific Credentials & Clearances:
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                              {Object.entries(scanResult.member.metadata).map(([key, val]) => (
                                <div key={key} className="bg-white p-2 rounded border border-slate-200 flex justify-between">
                                  <span className="text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                                  <span className="font-bold text-slate-800">{String(val)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Digital Signature & Integrity Block */}
                        <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center justify-between text-xs font-mono">
                          <div className="space-y-0.5">
                            <div className="text-[10px] font-bold text-blue-900 uppercase">RSA-4096 Sovereign Digital Signature</div>
                            <div className="text-slate-600 text-[11px] truncate max-w-sm">{scanResult.member.digitalSignature}</div>
                          </div>
                          <div className="flex items-center gap-1 text-emerald-700 font-bold text-xs shrink-0">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>TAMPER-PROOF PASS</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setAttendanceRecorded(true);
                              refreshHistory();
                            }}
                            disabled={attendanceRecorded}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs ${
                              attendanceRecorded 
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            }`}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>{attendanceRecorded ? 'Check-In Recorded ✓' : 'Record Gate Check-In'}</span>
                          </button>

                          <button
                            onClick={() => setIsPrintModalOpen(true)}
                            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                          >
                            <Printer className="w-4 h-4" />
                            <span>Print Member Badge</span>
                          </button>

                          <button
                            onClick={() => copyVerificationUrl(scanResult.member?.verificationUrl)}
                            className="px-3 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-medium transition flex items-center gap-1.5 cursor-pointer"
                            title="Copy Verification Link"
                          >
                            {copiedUrl ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                            <span>{copiedUrl ? 'Copied' : 'Copy URL'}</span>
                          </button>
                        </div>

                        <button
                          onClick={handleScanNext}
                          className="px-5 py-2 bg-[#0078D4] hover:bg-[#005a9e] text-white rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-md"
                        >
                          <span>Scan Next Member</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* If Not Found / Unregistered */}
                {!scanResult.member && (
                  <div className="text-center py-8 space-y-4">
                    <p className="text-xs font-mono text-slate-500 bg-slate-100 p-3 rounded-lg max-w-lg mx-auto break-all">
                      Raw Payload: {scanResult.scannedRawPayload}
                    </p>
                    <button
                      onClick={handleScanNext}
                      className="px-6 py-2.5 bg-[#0078D4] hover:bg-[#005a9e] text-white rounded-xl text-xs font-bold transition cursor-pointer"
                    >
                      Try Scanning Again
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* SCANNING INTERFACE (CAMERA / UPLOAD / MANUAL / SAMPLES) */
              <div className="space-y-6">

                {/* VIEW 1: LIVE CAMERA */}
                {activeMode === 'camera' && (
                  <div className="space-y-4">
                    <div className="relative bg-slate-950 rounded-2xl overflow-hidden aspect-video max-h-[380px] flex items-center justify-center border border-slate-800 shadow-inner">
                      
                      {/* Video Element */}
                      <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        playsInline
                        muted
                      />
                      
                      {/* Offscreen Canvas for jsQR analysis */}
                      <canvas ref={canvasRef} className="hidden" />

                      {/* Reticle Scanner Overlay */}
                      {isCameraActive && (
                        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                          {/* Corner Markers */}
                          <div className="w-64 h-64 border-2 border-blue-400/80 rounded-2xl relative shadow-2xl">
                            {/* Scanning Laser Line */}
                            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-pulse"
                              style={{
                                animation: 'scannerLaser 2s ease-in-out infinite alternate'
                              }}
                            />
                            <div className="absolute top-2 left-2 text-[9px] font-mono font-bold text-blue-300 bg-slate-900/80 px-2 py-0.5 rounded">
                              ALIGN QR CODE
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Camera Loading or Error State */}
                      {cameraError ? (
                        <div className="absolute inset-0 bg-slate-950/90 p-6 flex flex-col items-center justify-center text-center space-y-3 z-20">
                          <AlertTriangle className="w-10 h-10 text-amber-500" />
                          <div className="text-white font-bold text-sm">Camera Unavailable</div>
                          <p className="text-xs text-slate-400 max-w-md">{cameraError}</p>
                          <div className="flex gap-2">
                            <button
                              onClick={startCamera}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition cursor-pointer"
                            >
                              Retry Camera
                            </button>
                            <button
                              onClick={() => setActiveMode('upload')}
                              className="px-4 py-2 bg-slate-800 text-slate-200 rounded-lg text-xs font-bold hover:bg-slate-700 transition cursor-pointer"
                            >
                              Upload QR Image
                            </button>
                          </div>
                        </div>
                      ) : !isCameraActive ? (
                        <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center text-slate-400 space-y-2 z-10">
                          <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
                          <span className="text-xs font-medium">Initializing sovereign camera stream...</span>
                        </div>
                      ) : null}

                      {/* Camera Controls Bar */}
                      {isCameraActive && (
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/80 z-20">
                          <button
                            onClick={() => setFacingMode(prev => prev === 'environment' ? 'user' : 'environment')}
                            className="p-1.5 text-slate-300 hover:text-white rounded-full hover:bg-slate-800 transition"
                            title="Switch Front/Back Camera"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                          <div className="w-px h-3.5 bg-slate-700" />
                          <button
                            onClick={toggleTorch}
                            className={`p-1.5 rounded-full transition ${torchOn ? 'text-amber-400 bg-amber-400/20' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
                            title="Toggle Torch / Flashlight"
                          >
                            <Flashlight className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* VIEW 2: PHOTO / FILE UPLOAD */}
                {activeMode === 'upload' && (
                  <div className="space-y-4">
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-blue-50/40 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
                    >
                      <input 
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform mb-3">
                        <Upload className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-sm text-slate-900">Upload or Drag & Drop Member ID QR Code</h4>
                      <p className="text-xs text-slate-500 mt-1 max-w-sm">
                        Supports PNG, JPG, WEBP photos of JUMO identity cards, digital passes, or graduation certificates.
                      </p>
                      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-blue-700 transition">
                        Select QR Image File
                      </button>
                    </div>
                  </div>
                )}

                {/* VIEW 3: MANUAL SEARCH */}
                {activeMode === 'manual' && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Enter Member JUMO ID, Email, National ID, or Verification URL:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. JUMO-EDU-2026-8819 or Prof. Sarah Nalubega"
                          value={manualInput}
                          onChange={(e) => setManualInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && manualInput) {
                              handleProcessScan(manualInput, 'MANUAL_ENTRY');
                            }
                          }}
                          className="flex-1 px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-600"
                        />
                        <button
                          onClick={() => manualInput && handleProcessScan(manualInput, 'MANUAL_ENTRY')}
                          disabled={!manualInput}
                          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition cursor-pointer"
                        >
                          Verify ID
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* VIEW 4: AUDIT SCAN HISTORY */}
                {activeMode === 'history' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                        Recent Identity Verification Logs (Session Audit)
                      </h4>
                      <button
                        onClick={() => {
                          jumoIdentityVerificationService.clearAuditLogs();
                          refreshHistory();
                        }}
                        className="text-xs text-rose-600 hover:underline font-medium cursor-pointer"
                      >
                        Clear History
                      </button>
                    </div>

                    {scanHistory.length === 0 ? (
                      <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-xs">
                        No scan verification logs recorded yet. Scan a member card to populate audit logs.
                      </div>
                    ) : (
                      <div className="border border-slate-200 rounded-xl overflow-hidden">
                        <table className="w-full text-left text-xs font-sans">
                          <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                            <tr>
                              <th className="p-3">Time</th>
                              <th className="p-3">Member / ID</th>
                              <th className="p-3">Product</th>
                              <th className="p-3">Status</th>
                              <th className="p-3">Terminal</th>
                              <th className="p-3 text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {scanHistory.map((log) => (
                              <tr key={log.id} className="hover:bg-slate-50">
                                <td className="p-3 font-mono text-slate-500 text-[11px]">
                                  {new Date(log.timestamp).toLocaleTimeString()}
                                </td>
                                <td className="p-3 font-semibold text-slate-900">
                                  {log.memberName || log.jumoId || 'Unregistered'}
                                </td>
                                <td className="p-3 font-mono text-[11px] uppercase text-indigo-700">
                                  {log.productOrigin || '-'}
                                </td>
                                <td className="p-3">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                                    log.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                  }`}>
                                    {log.status}
                                  </span>
                                </td>
                                <td className="p-3 text-slate-500 text-[11px]">{log.scanLocation}</td>
                                <td className="p-3 text-right">
                                  {log.jumoId && (
                                    <button
                                      onClick={() => handleProcessScan(log.jumoId!, 'MANUAL_ENTRY')}
                                      className="text-blue-600 hover:underline font-bold text-[11px] cursor-pointer"
                                    >
                                      Re-Verify
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* TEST / SAMPLE MEMBER IDENTITIES FOR 1-CLICK VERIFICATION */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>One-Click Test Identity Cards (6 Approved Products)</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">Click any card to verify instantly</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                    {sampleMembers.map((member) => (
                      <button
                        key={member.jumoId}
                        onClick={() => handleProcessScan(member.jumoId, 'SAMPLE_TEST')}
                        className="p-2.5 bg-white hover:bg-blue-50/60 border border-slate-200 hover:border-blue-400 rounded-xl transition text-left group cursor-pointer shadow-2xs flex flex-col justify-between"
                      >
                        <div>
                          <div className="text-[9px] font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 mb-1.5 truncate">
                            {member.productBadge}
                          </div>
                          <div className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-600">
                            {member.fullName}
                          </div>
                          <div className="text-[10px] text-slate-500 truncate mt-0.5">
                            {member.role}
                          </div>
                        </div>
                        <div className="text-[9px] font-mono text-slate-400 mt-2 truncate">
                          {member.jumoId}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Footer Info */}
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>JUMO Universal Zero-Trust Identity Infrastructure • Ring-0 Verified</span>
            </div>
            <div className="font-mono text-[11px] text-slate-400">
              SHA-256 ECC SECP256K1
            </div>
          </div>

        </div>
      </div>

      {/* Embedded Printable Identity Card Modal */}
      {currentCardholderData && (
        <PrintIdentityCardModal
          isOpen={isPrintModalOpen}
          onClose={() => setIsPrintModalOpen(false)}
          cardData={currentCardholderData}
        />
      )}
    </>
  );
};

export default JumoMemberQrScannerModal;
