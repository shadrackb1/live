import React from 'react';
import { Heart } from 'lucide-react';
import { FloatingHeart } from '../types';

interface HeartAnimationProps {
  hearts: FloatingHeart[];
}

export const HeartAnimation: React.FC<HeartAnimationProps> = ({ hearts }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute bottom-20 animate-float"
          style={{
            left: `${heart.left}%`,
            animationDuration: `${heart.speed}s`,
            color: heart.color
          }}
        >
          <Heart fill="currentColor" className="w-8 h-8 drop-shadow-md" />
        </div>
      ))}
    </div>
  );
};
