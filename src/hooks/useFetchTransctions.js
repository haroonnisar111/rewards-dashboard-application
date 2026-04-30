import { useState, useEffect, useCallback } from "react";
import { DATA_URL } from "../constant/constant";
import logger from "../loggers/index";

const useFetchTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTransactions = useCallback(() => {
    setIsLoading(true);
    setError(null);

    fetch(DATA_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTransactions(data);
        logger.info("Transactions fetched successfully");
      })
      .catch((fetchError) => {
        setError(fetchError.message);
        logger.error("Error fetching transactions:", fetchError);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return { transactions, isLoading, error };
};

export default useFetchTransactions;
