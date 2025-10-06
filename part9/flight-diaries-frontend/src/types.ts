export enum VisibilityE {
  GREAT = 'great',
  GOOD = 'good',
  OK = 'ok',
  POOR = 'poor',
}

export enum WeatherE {
  SUNNY = 'sunny',
  RAINY = 'rainy',
  CLOUDY = 'cloudy',
  STORMY = 'stormy',
  WINDY = 'windy',
}

export interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment?: string;
}

export type DiaryFormValues = Omit<Diary, 'id'>;
