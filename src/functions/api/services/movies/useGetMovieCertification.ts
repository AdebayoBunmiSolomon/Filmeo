import { header } from "@src/api/configuration/header";
import { endpoint } from "@src/api/endpoints/endpoints";
import { GetRequest } from "@src/api/request";
import { useState } from "react";
import { useMovieCertificationsStore } from "../../store";
import { dataStructure } from "@src/types/types";
import { extractCertification } from "@src/helper/helper";

export const useGetMovieCertification = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const { movieCertificationsData, setMovieCertificationsData } =
    useMovieCertificationsStore();

  const getMovieCertifications = async (): Promise<
    dataStructure | undefined
  > => {
    try {
      const { status, data } = await GetRequest(
        `${endpoint.GET_MOVIE_CERTIFICATIONS}`,
        header,
        {}
      );
      if (status === 200) {
        return data as dataStructure;
      } else {
        console.log("Error getting movies certifications");
        return undefined;
      }
    } catch (err: any) {
      console.log(err);
      return undefined;
    }
  };

  const displayCertifications = async () => {
    setLoading(true);
    setIsError(false);
    try {
      const data = await getMovieCertifications();
      if (data) {
        const certifications = extractCertification(data);
        console.log(certifications);
        setMovieCertificationsData(certifications);
        setIsError(false);
      } else {
        console.log("Data is undefined or API fetch is failed");
        setIsError(true);
      }
    } catch (err: any) {
      console.log("Error displaying certifications:", err);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    displayCertifications,
    movieCertificationsData,
    isError,
    loading,
  };
};
