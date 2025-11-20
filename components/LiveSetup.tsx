import React, { useState } from 'react';
import { Camera, Image, Radio, Play, Sliders } from 'lucide-react';
import { StreamConfig } from '../types';

interface LiveSetupProps {
  onStart: (config: StreamConfig) => void;
}

export const LiveSetup: React.FC<LiveSetupProps> = ({ onStart }) => {
  const [username, setUsername] = useState('my_account');
  const [viewers, setViewers] = useState(1250);
  const [backgroundMode, setBackgroundMode] = useState<'camera' | 'gradient' | 'image'>('gradient');

  const handleStart = () => {
    onStart({
      username,
      avatarUrl: '',
      initialViewers: viewers,
      backgroundMode
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 relative overflow-hidden bg-zinc-950">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none"></div>
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -left-20 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl"></div>

      <div className="w-full max-w-xs z-10 flex flex-col space-y-8">
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[2px]">
            <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                <Radio className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Live Simulator</h1>
          <p className="text-zinc-400 text-sm">Create a realistic broadcast simulation</p>
        </div>

        <div className="space-y-5">
          
          {/* Username Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400 ml-1 uppercase tracking-wider">Handle</label>
            <input 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-zinc-900/80 border border-zinc-800 text-white rounded-lg py-3 px-4 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all placeholder-zinc-600"
              placeholder="username"
            />
          </div>

          {/* Viewer Count Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium text-zinc-400 ml-1">
              <span className="uppercase tracking-wider">Starting Viewers</span>
              <span className="text-white font-mono bg-zinc-800 px-2 py-0.5 rounded">{viewers.toLocaleString()}</span>
            </div>
            <input 
              type="range"
              min="0"
              max="10000"
              step="50"
              value={viewers}
              onChange={(e) => setViewers(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
          </div>

          {/* Background Source Selection */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-400 ml-1 uppercase tracking-wider">Background</label>
            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={() => setBackgroundMode('gradient')}
                className={`flex flex-col items-center justify-center py-3 rounded-lg border transition-all ${backgroundMode === 'gradient' ? 'bg-zinc-800 border-pink-500 text-white shadow-sm shadow-pink-500/20' : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:bg-zinc-900'}`}
              >
                <Sliders className="w-5 h-5 mb-1.5" />
                <span className="text-[10px] font-medium">Color</span>
              </button>
              <button 
                onClick={() => setBackgroundMode('image')}
                className={`flex flex-col items-center justify-center py-3 rounded-lg border transition-all ${backgroundMode === 'image' ? 'bg-zinc-800 border-pink-500 text-white shadow-sm shadow-pink-500/20' : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:bg-zinc-900'}`}
              >
                <Image className="w-5 h-5 mb-1.5" />
                <span className="text-[10px] font-medium">Photo</span>
              </button>
               <button 
                onClick={() => setBackgroundMode('camera')}
                className={`flex flex-col items-center justify-center py-3 rounded-lg border transition-all ${backgroundMode === 'camera' ? 'bg-zinc-800 border-pink-500 text-white shadow-sm shadow-pink-500/20' : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:bg-zinc-900'}`}
              >
                <Camera className="w-5 h-5 mb-1.5" />
                <span className="text-[10px] font-medium">Camera</span>
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={handleStart}
          className="w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-pink-500/20 active:scale-[0.98] transition-transform flex items-center justify-center gap-2 mt-4"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>Go Live</span>
        </button>

      </div>
    </div>
  );
};