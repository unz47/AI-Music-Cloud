export type Track = {
  id: string;
  title: string;
  artist: string;
  genre: string;
  artworkColor: string;
  artworkKey?: string;
  audioUrl: string;
  duration: number;
  playCount: number;
  likeCount: number;
  aiTool: string;
  createdAt: string;
  artistImage?: string;
};

export const mockTracks: Track[] = [];
