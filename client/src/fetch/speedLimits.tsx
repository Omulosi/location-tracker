import { useQueryClient, useMutation, useQuery } from "react-query";
import { SpeedLimit } from "../pages/Map";
import { addResource, getResource } from "./fetcher";

const getSpeedLimits = async () => {
  const data = await getResource("/speed_limits/");
  return data;
};

const addSpeedLimit = async (speedLimit: SpeedLimit | null) => {
  const { data } = await addResource("/speed_limits/", {
    section_name: speedLimit?.sectionName,
    speed_limit: speedLimit?.speedLimit,
    geom: speedLimit?.section,
  });
  return data;
};

export const useSpeedLimits = () => {
  return useQuery("speedLimits", getSpeedLimits);
};

export const useAddSpeedLimit = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(addSpeedLimit, {
    onSuccess: () => {
      queryClient.invalidateQueries("speedLimits");
      alert("Speed limit added");
    },
    onError: () => {
      // snack bar
      alert("Error adding speed limit");
    },
  });
  return mutation;
};
