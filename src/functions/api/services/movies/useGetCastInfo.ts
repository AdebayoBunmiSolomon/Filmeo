import { useState } from "react";
import { useCastInfoStore } from "../../store";
import { GetRequest } from "@src/api/request";
import { endpoint } from "@src/api/endpoints/endpoints";
import { header } from "@src/api/configuration/header";

export const useGetCastInformation = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const { castInfoData, setCastInfoData } = useCastInfoStore();

  const getCastInfoData = async (castId: number) => {
    setLoading(true);
    setIsError(false);
    try {
      const { data, status } = await GetRequest(
        `${endpoint.GET_CAST_INFO}${castId}`,
        header,
        {}
      );
      if (status === 200) {
        // console.log(data);
        setCastInfoData(data);
        setIsError(false);
      } else {
        console.log("Error getting cast information");
        setCastInfoData(data);
        setIsError(true);
      }
    } catch (err: any) {
      console.log("Error", err);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    getCastInfoData,
    castInfoData,
    loading,
    isError,
  };
};
