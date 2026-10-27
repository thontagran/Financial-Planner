import React, { useState, useRef } from 'react';
import {
  Wifi,
  Battery,
  Maximize2,
  Minimize2,
  Moon,
  Sun,
  Settings,
  Download,
  Upload,
  FileSpreadsheet,
  RotateCcw,
  ShieldCheck,
  X,
  CheckCircle2,
} from 'lucide-react';
import { OfflineIndicator } from './OfflineIndicator';
import { PWAInstallBanner } from './PWAInstallBanner';
import { ConfirmBottomSheet } from './ConfirmBottomSheet';

interface MobileFrameProps {
  children: React.ReactNode;
  activeTabTitle: string;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onExportBackup: () => void;
  onExportCSV: () => void;
  onImportBackup: (file: File) => void;
  backupNotice: string | null;
  onResetData: () => void;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  children,
  activeTabTitle,
  isDarkMode,
  onToggleDarkMode,
  onExportBackup,
  onExportCSV,
  onImportBackup,
  backupNotice,
  onResetData,
}) => {
  const [isPhoneMockupMode, setIsPhoneMockupMode] = useState(true);
  const [showSettingsSheet, setShowSettingsSheet] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentTime = new Date().toLocaleTimeString('th-TH', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportBackup(file);
      e.target.value = '';
    }
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-start p-0 sm:p-4 md:p-6 select-none font-sans text-slate-800 dark:text-slate-100">
        {/* Desktop Controls Bar */}
        <header className="hidden sm:flex items-center justify-between gap-8 w-full max-w-md mb-3 px-2 text-slate-300 text-xs">
          <span className="font-bold text-white tracking-tight whitespace-nowrap shrink-0">
            WealthNavi Mobile
          </span>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsPhoneMockupMode(!isPhoneMockupMode)}
              className="min-h-[36px] flex items-center gap-1.5 text-xs bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/70 px-3 py-1.5 rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {isPhoneMockupMode ? (
                <Maximize2 className="w-3.5 h-3.5" />
              ) : (
                <Minimize2 className="w-3.5 h-3.5" />
              )}
              <span>{isPhoneMockupMode ? 'ขยายกว้าง' : 'กรอบมือถือ'}</span>
            </button>
          </div>
        </header>

        {/* Smartphone Viewport Chassis */}
        <div
          className={`w-full transition-colors duration-200 relative flex flex-col bg-slate-100 dark:bg-slate-950 ${
            isPhoneMockupMode
              ? 'sm:max-w-[425px] sm:h-[890px] sm:rounded-[48px] sm:border-[8px] sm:border-slate-800 sm:shadow-2xl sm:overflow-hidden'
              : 'max-w-3xl min-h-screen sm:rounded-3xl sm:border sm:border-slate-800 sm:shadow-2xl overflow-hidden'
          }`}
        >
          {/* Mobile Phone Status Bar */}
          <div className="bg-slate-900 text-white px-6 pt-3 pb-2 flex items-center justify-between text-[11px] font-semibold shrink-0 z-40">
            <span className="tracking-tight tabular-nums">{currentTime || '09:41'}</span>

            <div className="w-24 h-4 bg-black rounded-full flex items-center justify-end px-2 gap-1.5">
              <div className="w-2 h-2 rounded-full bg-slate-800" />
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono tracking-tighter text-slate-300">5G</span>
              <Wifi className="w-3 h-3 text-slate-300" />
              <Battery className="w-4 h-4 text-emerald-400 fill-emerald-400" />
            </div>
          </div>

          {/* Mobile App Top Bar */}
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 py-2 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2 shrink-0 z-30 transition-colors">
            <div className="min-w-0">
              <h1 className="text-sm font-black text-slate-900 dark:text-white tracking-tight leading-none whitespace-nowrap">
                Wealth<span className="text-indigo-600 dark:text-indigo-400">Navi</span>
              </h1>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-none mt-1 truncate">
                {activeTabTitle}
              </p>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <div className="mr-1">
                <OfflineIndicator />
              </div>

              <button
                type="button"
                onClick={onToggleDarkMode}
                className="min-h-[40px] min-w-[40px] flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                aria-label={isDarkMode ? 'สลับเป็นโหมดสว่าง' : 'สลับเป็นโหมดมืด'}
                title={isDarkMode ? 'โหมดสว่าง' : 'โหมดมืด'}
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => setShowSettingsSheet(true)}
                className="min-h-[40px] min-w-[40px] flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                aria-label="สำรองข้อมูลและตั้งค่า"
                title="สำรองข้อมูลและตั้งค่า"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* PWA Install Banner */}
          <PWAInstallBanner />

          {/* Scrollable Content View */}
          <main className="flex-1 overflow-y-auto px-3.5 pt-3 pb-24 bg-slate-100/80 dark:bg-slate-950 transition-colors">
            {children}
          </main>

          {/* Home Indicator Bar */}
          {isPhoneMockupMode && (
            <div className="hidden sm:block absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-400/40 dark:bg-slate-600/50 rounded-full pointer-events-none z-40" />
          )}
        </div>

        {/* Settings & Offline Backup Bottom Sheet */}
        {showSettingsSheet && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4"
            role="dialog"
            aria-modal="true"
          >
            <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border-t sm:border border-slate-200 dark:border-slate-800 space-y-4">
              {/* Drag Handle */}
              <div className="w-10 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto sm:hidden" />

              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 rounded-xl">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                      จัดการข้อมูล & สำรองออฟไลน์
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      ข้อมูลเก็บในเครื่องของคุณ 100% ปลอดภัย
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSettingsSheet(false)}
                  className="min-h-[36px] min-w-[36px] flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl cursor-pointer"
                  aria-label="ปิดหน้าต่าง"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {backupNotice && (
                <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{backupNotice}</span>
                </div>
              )}

              {/* Backup & Export Actions */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={onExportBackup}
                  className="w-full min-h-[48px] px-4 py-3 bg-slate-50 dark:bg-slate-800/80 hover:bg-indigo-50 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/70 rounded-2xl flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-100 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <Download className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>สำรองข้อมูลทั้งหมด (ไฟล์ JSON)</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal">ย้ายเครื่อง</span>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full min-h-[48px] px-4 py-3 bg-slate-50 dark:bg-slate-800/80 hover:bg-indigo-50 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/70 rounded-2xl flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-100 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <Upload className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>กู้คืนข้อมูลจากไฟล์สำรอง (Import JSON)</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal">เลือกไฟล์</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={onExportCSV}
                  className="w-full min-h-[48px] px-4 py-3 bg-slate-50 dark:bg-slate-800/80 hover:bg-indigo-50 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/70 rounded-2xl flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-100 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <FileSpreadsheet className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    <span>ส่งออกตารางรายรับ-รายจ่าย (ไฟล์ CSV)</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal">Excel / Sheets</span>
                </button>
              </div>

              {/* Footer Actions */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(true)}
                  className="min-h-[44px] flex items-center gap-1.5 px-3 py-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>รีเซ็ตข้อมูลตัวอย่าง</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowSettingsSheet(false)}
                  className="min-h-[44px] px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
                >
                  เสร็จสิ้น
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Custom Bottom Sheet Confirmation for Resetting Sample Data */}
        <ConfirmBottomSheet
          isOpen={showResetConfirm}
          title="รีเซ็ตกลับเป็นข้อมูลตัวอย่าง?"
          description="รายการรายรับ-รายจ่าย ค่าลดหย่อนภาษี และแผนการลงทุนที่คุณแก้ไขไว้จะถูกรีเซ็ตกลับเป็นค่าเริ่มต้นทั้งหมด (แนะนำให้กดสำรองไฟล์ JSON ก่อนหากต้องการเก็บข้อมูลเดิม)"
          confirmLabel="ยืนยันรีเซ็ตข้อมูล"
          cancelLabel="ยกเลิก"
          variant="danger"
          onCancel={() => setShowResetConfirm(false)}
          onConfirm={() => {
            onResetData();
            setShowResetConfirm(false);
            setShowSettingsSheet(false);
          }}
        />
      </div>
    </div>
  );
};
