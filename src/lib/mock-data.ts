export type Track = {
  id: string;
  title: string;
  artist: string;
  genre: string;
  artworkColor: string;
  audioUrl: string;
  duration: number;
  playCount: number;
  likeCount: number;
  aiTool: string;
};

export const mockTracks: Track[] = [
  { id: "1", title: "Neon Dreams", artist: "CyberWave", genre: "Synthwave", artworkColor: "#2D1B69", audioUrl: "/audio/1.mp3", duration: 222, playCount: 12400, likeCount: 890, aiTool: "Suno" },
  { id: "2", title: "Midnight Rain", artist: "LoFiBot", genre: "Lo-Fi", artworkColor: "#1B3D2D", audioUrl: "/audio/2.mp3", duration: 187, playCount: 8300, likeCount: 620, aiTool: "Udio" },
  { id: "3", title: "Digital Fury", artist: "BeatForge AI", genre: "Dubstep", artworkColor: "#3D1B1B", audioUrl: "/audio/3.mp3", duration: 245, playCount: 15600, likeCount: 1100, aiTool: "Suno" },
  { id: "4", title: "Cloud Walker", artist: "AetherSound", genre: "Trance", artworkColor: "#1B2D3D", audioUrl: "/audio/4.mp3", duration: 198, playCount: 22100, likeCount: 1800, aiTool: "Udio" },
  { id: "5", title: "Pulse Code", artist: "NeuralBeat", genre: "Drum & Bass", artworkColor: "#3D2D1B", audioUrl: "/audio/5.mp3", duration: 176, playCount: 6700, likeCount: 430, aiTool: "Suno" },
];
