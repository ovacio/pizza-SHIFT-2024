import { instance } from '@/api/instanse';

interface CardsGeneralApiProps {
  onDataLoaded?: (data: Pizza[]) => void;
}

export interface ApiResponse {
  catalog: Pizza[];
}

const getPizzaCatalog = async ({ onDataLoaded }: CardsGeneralApiProps) => {
  const response = await instance.get<ApiResponse>(`/pizza/catalog`);
  if (onDataLoaded) {
    onDataLoaded(response.data.catalog);
  }
};

export default getPizzaCatalog;
