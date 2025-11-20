import React, { useEffect, useRef, useState, useCallback } from 'react';
import { X, User, Heart, Send, Share2, Gift, MoreHorizontal, Camera, MessageCircle, Eye, HelpCircle, Zap } from 'lucide-react';
import { StreamConfig, Comment, FloatingHeart } from '../types';
import { MOCK_COMMENTS, MOCK_USERNAMES, MOCK_AVATAR_COLORS } from '../constants';
import { HeartAnimation } from './HeartAnimation';

interface LiveStreamProps {
  config: StreamConfig;
  onEnd: () => void;
}

export const LiveStream: React.FC<LiveStreamProps> = ({ config, onEnd }) => {
  const [viewers, setViewers] = useState(config.initialViewers);
  const [comments, setComments] = useState<Comment[]>([]);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [inputValue, setInputValue] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const commentsEndRef = useRef<HTMLDivElement>(null);
  const heartIdCounter = useRef(0);

  // --- Simulation Logic ---

  // Initialize Camera if selected
  useEffect(() => {
    if (config.backgroundMode === 'camera') {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.error("Camera access denied:", err));
    }
    
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [config.backgroundMode]);

  // Viewer Count Fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => {
        const change = Math.floor(Math.random() * 15) - 5; 
        return Math.max(0, prev + change);
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Random Comment Generator
  useEffect(() => {
    const addComment = () => {
      const randomUser = MOCK_USERNAMES[Math.floor(Math.random() * MOCK_USERNAMES.length)];
      const randomText = MOCK_COMMENTS[Math.floor(Math.random() * MOCK_COMMENTS.length)];
      const randomColor = MOCK_AVATAR_COLORS[Math.floor(Math.random() * MOCK_AVATAR_COLORS.length)];

      const newComment: Comment = {
        id: Math.random().toString(36).substr(2, 9),
        username: randomUser,
        avatarUrl: randomColor,
        text: randomText
      };

      setComments(prev => [...prev.slice(-15), newComment]); // Keep last 15
      
      if (Math.random() > 0.6) triggerHeartBurst();
    };

    // Initial comments
    addComment();

    const interval = setInterval(() => {
      if (Math.random() > 0.5) { 
        addComment();
      }
    }, 2000); 

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll comments
  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);

  // Manual Heart Trigger
  const triggerHeart = useCallback(() => {
    const id = heartIdCounter.current++;
    // Instagram style heart colors
    const colors = ['#ef4444', '#ec4899', '#f43f5e', '#e11d48', '#be123c'];
    const newHeart: FloatingHeart = {
      id,
      color: colors[Math.floor(Math.random() * colors.length)],
      left: 75 + Math.random() * 15, // Strictly on the right side
      speed: 2 + Math.random() * 1.5
    };
    setHearts(prev => [...prev, newHeart]);

    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== id));
    }, 3000);
  }, []);

  const triggerHeartBurst = () => {
    const count = Math.floor(Math.random() * 3) + 1;
    for(let i=0; i<count; i++) {
      setTimeout(triggerHeart, i * 150);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const myComment: Comment = {
      id: Date.now().toString(),
      username: config.username || 'Me',
      avatarUrl: 'bg-gradient-to-tr from-yellow-400 to-pink-600',
      text: inputValue
    };
    setComments(prev => [...prev, myComment]);
    setInputValue('');
    triggerHeartBurst();
  };

  const handleGift = () => {
    const gifts = ['Rose 🌹', 'Coffee ☕', 'Heart 💖', 'Pizza 🍕'];
    const randomGift = gifts[Math.floor(Math.random() * gifts.length)];
    const myComment: Comment = {
      id: Date.now().toString(),
      username: config.username || 'Me',
      avatarUrl: 'bg-gradient-to-tr from-yellow-400 to-pink-600',
      text: `Sent a ${randomGift}!`
    };
    setComments(prev => [...prev, myComment]);
    triggerHeartBurst();
  };

  const handleMore = () => {
    const systemMsg: Comment = {
      id: Date.now().toString(),
      username: 'System',
      avatarUrl: 'bg-zinc-700',
      text: 'More options menu accessed (Simulation)',
      isSystem: true
    };
    setComments(prev => [...prev, systemMsg]);
  };

  const handleRandomizeViewers = () => {
    setViewers(Math.floor(Math.random() * 50000) + 500);
  };

  return (
    <div className="relative h-full w-full bg-zinc-900 text-white overflow-hidden flex flex-col font-sans">
      {/* --- Background --- */}
      <div className="absolute inset-0 z-0">
        {config.backgroundMode === 'camera' ? (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="h-full w-full object-cover" 
          />
        ) : config.backgroundMode === 'gradient' ? (
          <div className="h-full w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" />
        ) : (
           <img 
             src="https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1000&auto=format&fit=crop" 
             alt="Stream Background" 
             className="h-full w-full object-cover"
           />
        )}
        {/* Subtle overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* --- Header (Instagram Style) --- */}
      <div className="absolute top-0 left-0 right-0 z-30 pt-12 px-4 pb-4 flex items-center justify-between">
        
        {/* Profile Section */}
        <div className="flex items-center gap-3">
          <div className="relative">
             <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
                <img 
                  src={config.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${config.username}`} 
                  className="w-full h-full rounded-full border-2 border-black object-cover bg-zinc-800"
                  alt="Profile"
                />
             </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
               <span className="font-semibold text-sm shadow-sm">{config.username}</span>
               <span className="text-white/80 text-[10px]">▼</span>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-rose-500 to-red-600 px-2 py-1 rounded-sm flex items-center shadow-sm">
             <span className="text-[10px] font-bold uppercase text-white tracking-wide">LIVE</span>
          </div>
          
          <button 
            onClick={handleRandomizeViewers}
            className="bg-black/40 backdrop-blur-md px-2 py-1 rounded-sm flex items-center gap-1.5 active:scale-95 transition-transform"
            title="Randomize Viewers (Simulation Only)"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold">{viewers.toLocaleString()}</span>
          </button>

          <button 
            onClick={onEnd}
            className="w-8 h-8 flex items-center justify-center text-white hover:text-red-500 transition-colors drop-shadow-md"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* --- Floating Hearts Animation --- */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <HeartAnimation hearts={hearts} />
      </div>

      {/* --- Bottom Section --- */}
      <div className="absolute bottom-0 left-0 right-0 z-30 pb-6 px-4 flex flex-col justify-end">
        
        {/* Comments Area */}
        <div className="w-full max-h-60 overflow-y-auto no-scrollbar flex flex-col space-y-2.5 mb-4 mask-image-gradient">
           {/* System Msg */}
           <div className="self-start bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 max-w-[85%] border border-white/5">
              <p className="text-xs text-white font-medium">
                 <span className="text-yellow-400">SimLive:</span> Educational simulation. No data is broadcast.
              </p>
           </div>

           {comments.map((comment) => (
             <div key={comment.id} className="flex items-start space-x-2.5 animate-in slide-in-from-bottom-2 fade-in duration-200">
                <div className={`w-7 h-7 rounded-full flex-shrink-0 p-[1px] ${comment.avatarUrl.startsWith('bg-') ? '' : 'bg-gradient-to-tr from-yellow-400 to-purple-600'} overflow-hidden`}>
                   <div className="w-full h-full rounded-full bg-black overflow-hidden">
                    {comment.avatarUrl.startsWith('bg-') ? (
                        <div className={`w-full h-full ${comment.avatarUrl}`} />
                    ) : (
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.username}`} className="w-full h-full object-cover" alt="av" />
                    )}
                   </div>
                </div>
                <div className="flex flex-col text-sm text-white drop-shadow-md">
                  <span className="leading-tight">
                    <span className="font-semibold mr-2 opacity-95">{comment.username}</span>
                    <span className="font-normal opacity-90">{comment.text}</span>
                  </span>
                </div>
             </div>
           ))}
           <div ref={commentsEndRef} />
        </div>

        {/* Controls Bar */}
        <div className="flex items-center gap-3">
           {/* Input */}
           <div className="flex-1 relative">
              <form onSubmit={handleSendMessage} className="w-full">
                <div className="relative group">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full bg-black/50 backdrop-blur-md text-white rounded-full py-3 px-5 border border-white/20 focus:outline-none focus:border-white/50 text-sm placeholder-white/60 transition-all"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-white/80 hover:text-white">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </form>
           </div>

           {/* Action Icons */}
           <div className="flex items-center gap-4 text-white pl-1">
              <button className="hover:opacity-80 transition active:scale-95" title="Multi-guest Request">
                <Camera className="w-7 h-7 stroke-[1.5]" />
              </button>
              <button className="hover:opacity-80 transition active:scale-95" title="Send DM">
                <Send className="w-7 h-7 stroke-[1.5] -rotate-12 mb-1" />
              </button>
              <button 
                onClick={handleGift}
                className="hover:opacity-80 transition active:scale-95"
                title="Send Gift"
              >
                 <Gift className="w-7 h-7 stroke-[1.5]" />
              </button>
              <button
                onClick={handleMore}
                className="hover:opacity-80 transition active:scale-95"
                title="More Options"
              >
                 <MoreHorizontal className="w-7 h-7 stroke-[1.5]" />
              </button>
              <button 
                onClick={triggerHeart}
                className="hover:opacity-80 transition active:scale-90"
                title="Like Stream"
              >
                 <Heart className="w-7 h-7 stroke-[1.5]" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};