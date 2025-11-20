import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface DisclaimerModalProps {
  onAck: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ onAck }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-3 bg-yellow-500/20 rounded-full">
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
          <h2 className="text-xl font-bold text-white">Simulation Only</h2>
          <p className="text-zinc-300 text-sm leading-relaxed">
            This is an <strong>educational simulation</strong>. It creates a fake live stream interface locally on your device.
          </p>
          <ul className="text-zinc-400 text-xs text-left w-full list-disc pl-5 space-y-1">
            <li>No video is broadcast to the internet.</li>
            <li>All "viewers" and "comments" are AI/algorithmically generated.</li>
            <li>No connection to Instagram, TikTok, or Facebook.</li>
          </ul>
          <button
            onClick={onAck}
            className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-zinc-200 transition-colors mt-4"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
