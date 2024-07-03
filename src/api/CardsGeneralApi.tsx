import axios from "axios";
import { useState, useEffect } from "react";
import { ApiResponse, Pizza } from '@/constants/interfaces';
import { ApiUrlCatalog } from "@/constants/constants";

interface CardsGeneralApiProps {
  onDataLoaded?: (data: Pizza[]) => void;
}

const CardsGeneralApi = ({ onDataLoaded }: CardsGeneralApiProps) => {
  const [, setLoading] = useState<boolean>(true);
  const [, setPizza] = useState<Pizza[]>([]);

  useEffect(() => {
    axios.get<ApiResponse>(ApiUrlCatalog).then((response) => {
      const allPagesPizza = response.data.catalog;
      setLoading(false);
      setPizza(allPagesPizza);
      if (onDataLoaded) {
        onDataLoaded(allPagesPizza);
      }
    });
  }, [onDataLoaded]);

  return null;
};

export default CardsGeneralApi;