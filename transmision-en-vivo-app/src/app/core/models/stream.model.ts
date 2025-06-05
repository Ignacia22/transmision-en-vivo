export interface Stream {
  id: string;
  title?: string;
  description?: string;
  thumbnailUrl: string;
  streamUrl: string;
  isLive: boolean;
  startTime?: Date;
  endTime?: Date;
  categories: string[];
}
