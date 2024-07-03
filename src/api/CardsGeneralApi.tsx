import axios from "axios";
import { useState, useEffect } from "react";
import { ApiResponse, Pizza } from '@/constants/Interfaces.tsx';

const apiUrl = "https://shift-backend.onrender.com/pizza/catalog";

interface CardsGeneralApiProps {
  onDataLoaded?: (data: Pizza[]) => void;
}

const CardsGeneralApi = ({ onDataLoaded }: CardsGeneralApiProps) => {
  const [, setAppState] = useState<{
    loading: boolean;
    pizza: Pizza[];
  }>({
    loading: true,
    pizza: [],
  });

  useEffect(() => {
    axios.get<ApiResponse>(apiUrl).then((response) => {
      const allPagesPizza = response.data.catalog;
      setAppState({ loading:false, pizza: allPagesPizza });
      if (onDataLoaded) {
        onDataLoaded(allPagesPizza);
      }
    });
  }, [onDataLoaded]);

  return null;
};

export default CardsGeneralApi;