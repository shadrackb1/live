export interface StreamConfig {
  username: string;
  avatarUrl: string;
  initialViewers: number;
  backgroundMode: 'camera' | 'gradient' | 'image';
  streamTitle?: string;
}

export interface Comment {
  id: string;
  username: string;
  avatarUrl: string; // Placeholder color or URL
  text: string;
  isSystem?: boolean;
}

export interface FloatingHeart {
  id: number;
  color: string;
  left: number; // percentage
  speed: number; // animation duration in seconds
}
