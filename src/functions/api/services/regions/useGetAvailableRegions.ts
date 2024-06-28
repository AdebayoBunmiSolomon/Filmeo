import { useEffect, useState } from "react";
import { GetRequest } from "@src/api/request";
import { endpoint } from "@src/api/endpoints/endpoints";
import { header } from "@src/api/configuration/header";

type availableRegionDataType = {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
}[];

export const useGetAvailableRegions = () => {
  const [availableRegionData, setAvailableRegionData] =
    useState<availableRegionDataType>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);

  const getAvailableRegion = async () => {
    setLoading(true);
    setIsError(false);
    try {
      const { status, data } = await GetRequest(
        `${endpoint.GET_AVAILABLE_REGIONS}`,
        header,
        {}
      );
      if (status === 200) {
        const result = data.results;
        setAvailableRegionData((prevData: availableRegionDataType) => [
          ...prevData,
          ...result,
        ]);
        if (result.length === 0) {
          setHasMoreData(false); // No more data to load
        }
      } else {
        console.log("Error getting regions");
        setIsError(true);
      }
    } catch (err: any) {
      console.log("Error", err);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreData = () => {
    if (!loading && hasMoreData) {
      getAvailableRegion();
    }
  };

  useEffect(() => {
    getAvailableRegion();
  }, []);

  return {
    isError,
    loading,
    availableRegionData,
    getAvailableRegion,
    loadMoreData,
  };
};
