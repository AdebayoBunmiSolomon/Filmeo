import { useEffect, useState } from "react";
import countries from "@src/assets/countries.json";

export const useCountryCodeSelection = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<any>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");

  const fetchCountries = async (
    page: number,
    queryValue: string
  ): Promise<any[]> => {
    // Simulating API call with delay
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay of 1 second

    // Assuming countries data is fetched from an API
    if (queryValue) {
      const response = countries.filter((item) =>
        item.name.toLowerCase().includes(queryValue?.toLowerCase())
      );
      // console.log(response);
      return response;
    } else {
      return countries;
    }
  };

  const fetchData = async (queryValue: string) => {
    setIsLoading(true);
    try {
      const response = await fetchCountries(page, queryValue);
      // setData(response);
      // // Simulating API call with delay // Implement fetchCountries function to fetch data from API
      const newData = response.slice((page - 1) * 10, page * 10);
      setData((prevData: any) => [...prevData, ...newData]); // Update data with filtered response
      setTotalPages(Math.ceil(response.length / 10));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(searchValue);
  }, [page, searchValue]);

  const handleLoadMore = () => {
    if (!isLoading && page < totalPages) {
      setPage(page + 1);
    }
  };

  return {
    fetchData,
    handleLoadMore,
    isLoading,
    page,
    data,
    searchValue,
    setSearchValue,
  };
};
