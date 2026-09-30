import React, { useRef, useState } from 'react';
import { X, Copy, Check, Download, Share2, Sparkles } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { DAYS_DATA, getPhaseByDay } from '../data/roadmapData';

export const ShareModal: React.FC = () => {
  const { triggerShareModal, setTriggerShareModal, currentActiveDay, totalCompletedDays, overallPercentage } = useProgress();
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  if (!triggerShareModal) return null;

  const currentDayInfo = DAYS_DATA.find(d => d.day === currentActiveDay) || DAYS_DATA[0];
  const phaseInfo = getPhaseByDay(currentActiveDay);

  const shareText = `🚀 I completed Day ${currentActiveDay} of the AI with Jeevan 90-Day AI/ML Journey!

📈 Progress: ${overallPercentage}% Complete (${totalCompletedDays}/90 Days)
🎯 Today's Skill: ${currentDayInfo.title}
🔥 Phase: ${phaseInfo?.title || 'Foundations'}

Building real projects from Python to AI Agents with @AIwithJeevan!
#AIwithJeevan #MachineLearning #ArtificialIntelligence #Python #100DaysOfCode`;

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AI with Jeevan — 90-Day AI/ML Journey',
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share dismissed', err);
      }
    } else {
      handleCopyText();
    }
  };

  const handleDownloadCard = () => {
    // Render high quality canvas representation
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920; // 9:16 Instagram Story aspect ratio
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 1080, 1920);
    gradient.addColorStop(0, '#0F172A');
    gradient.addColorStop(0.5, '#1E293B');
    gradient.addColorStop(1, '#0284C7');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1920);

    // Subtle ambient glow
    const radial = ctx.createRadialGradient(540, 600, 50, 540, 600, 600);
    radial.addColorStop(0, 'rgba(37, 99, 235, 0.4)');
    radial.addColorStop(1, 'rgba(15, 23, 42, 0)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, 1080, 1920);

    // Card background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(100, 260, 880, 1400, 48);
    ctx.fill();
    ctx.stroke();

    // Brand Tag
    ctx.font = 'bold 36px Inter, sans-serif';
    ctx.fillStyle = '#60A5FA';
    ctx.textAlign = 'center';
    ctx.fillText('AI WITH JEEVAN', 540, 380);

    ctx.font = '500 28px Inter, sans-serif';
    ctx.fillStyle = '#94A3B8';
    ctx.fillText('90-DAY AI/ML JOURNEY', 540, 430);

    // Large Progress Circle or Metric
    ctx.font = 'bold 120px Inter, sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(`DAY ${currentActiveDay}`, 540, 640);

    ctx.font = 'bold 44px Inter, sans-serif';
    ctx.fillStyle = '#F4B400';
    ctx.fillText(`${overallPercentage}% COMPLETE`, 540, 720);

    // Progress bar inside canvas
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.roundRect(240, 780, 600, 24, 12);
    ctx.fill();

    ctx.fillStyle = '#16A34A';
    ctx.beginPath();
    const fillWidth = Math.max(24, Math.round((overallPercentage / 100) * 600));
    ctx.roundRect(240, 780, fillWidth, 24, 12);
    ctx.fill();

    // Day Details
    ctx.font = '600 32px Inter, sans-serif';
    ctx.fillStyle = '#94A3B8';
    ctx.fillText(`PHASE ${phaseInfo?.numberStr || '01'}: ${phaseInfo?.title || 'Foundations'}`, 540, 920);

    ctx.font = 'bold 52px Inter, sans-serif';
    ctx.fillStyle = '#FFFFFF';
    // Wrap title if needed
    const words = currentDayInfo.title.split(' ');
    if (words.length > 4) {
      const half = Math.ceil(words.length / 2);
      ctx.fillText(words.slice(0, half).join(' '), 540, 1020);
      ctx.fillText(words.slice(half).join(' '), 540, 1090);
    } else {
      ctx.fillText(currentDayInfo.title, 540, 1040);
    }

    // Key quote / philosophy
    ctx.font = 'italic 34px Inter, sans-serif';
    ctx.fillStyle = '#CBD5E1';
    ctx.fillText('"Learn → Practice → Build → Portfolio"', 540, 1240);

    // Footer hashtag and handle
    ctx.font = 'bold 40px Inter, sans-serif';
    ctx.fillStyle = '#38BDF8';
    ctx.fillText('#AIwithJeevan', 540, 1420);

    ctx.font = '500 30px Inter, sans-serif';
    ctx.fillStyle = '#94A3B8';
    ctx.fillText('90days.aiwithjeevan.com', 540, 1490);

    // Convert to image download
    const link = document.createElement('a');
    link.download = `AI_with_Jeevan_Day_${currentActiveDay}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto p-5 sm:p-6 text-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-50 text-brand-blue rounded-lg">
              <Share2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900">Share Your Progress</h3>
          </div>
          <button
            onClick={() => setTriggerShareModal(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Story Card Preview (Instagram Story 9:16 aesthetic) */}
        <div className="my-4 flex justify-center">
          <div 
            ref={cardRef}
            className="w-full max-w-[280px] aspect-[9/14] bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 rounded-2xl p-5 text-white shadow-xl flex flex-col justify-between border border-slate-700/60 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-36 h-36 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-36 h-36 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-wider uppercase font-bold text-blue-400 bg-blue-900/60 px-2 py-0.5 rounded-full border border-blue-500/30">
                  AI with Jeevan
                </span>
                <span className="text-[10px] text-slate-400">90-Day Plan</span>
              </div>
            </div>

            <div className="relative text-center py-2 space-y-2">
              <span className="text-3xl sm:text-4xl font-black tracking-tight text-white block">
                DAY {currentActiveDay}
              </span>
              <div className="inline-block px-3 py-1 bg-amber-500/20 border border-amber-400/40 rounded-full">
                <p className="text-xs font-bold text-brand-yellow">
                  {overallPercentage}% Complete
                </p>
              </div>

              {/* Mini progress bar */}
              <div className="w-full bg-slate-700/80 rounded-full h-2 overflow-hidden mx-auto max-w-[180px]">
                <div 
                  className="bg-brand-green h-full rounded-full transition-all"
                  style={{ width: `${Math.max(6, overallPercentage)}%` }}
                />
              </div>

              <div className="pt-2 text-center">
                <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                  {phaseInfo?.title || 'Foundations'}
                </p>
                <p className="text-xs font-bold text-slate-100 line-clamp-2 px-1">
                  {currentDayInfo.title}
                </p>
              </div>
            </div>

            <div className="relative border-t border-slate-700/60 pt-2.5 text-center space-y-1">
              <p className="text-[10px] italic text-slate-300">
                Learn → Practice → Build → Portfolio
              </p>
              <p className="text-[11px] font-bold text-sky-400 tracking-wide">
                #AIwithJeevan
              </p>
            </div>
          </div>
        </div>

        {/* Share buttons */}
        <div className="space-y-2 pt-1">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleDownloadCard}
              className="py-2.5 px-3 bg-brand-blue hover:bg-blue-700 text-white font-bold rounded-xl shadow text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Story
            </button>
            <button
              onClick={handleNativeShare}
              className="py-2.5 px-3 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl shadow text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share Direct
            </button>
          </div>

          <button
            onClick={handleCopyText}
            className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-brand-green" />
                <span className="text-brand-green font-bold">Copied Caption to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Caption for Instagram / LinkedIn</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
