import { useQueryClient, useMutation, useQuery } from "react-query";
import { SpeedLimit } from "../pages/MapView";
import { addResource, getResource } from "./fetcher";

const getVehicles = async () => {
  const data = await getResource("/vehicles/");
  return data;
};

const addVehicle = async (speedLimit: SpeedLimit | null) => {
  const { data } = await addResource("/vehicles/", {
    section_name: speedLimit?.sectionName,
    speed_limit: speedLimit?.speedLimit,
    geom: speedLimit?.section,
  });
  return data;
};

export const useSpeedLimits = () => {
  return useQuery("vehicles", getVehicles);
};

export const useAddSpeedLimit = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(addVehicle, {
    onSuccess: () => {
      queryClient.invalidateQueries("vehicles");
      alert("vehicles added");
    },
    onError: () => {
      // snack bar
      alert("Error adding vehicles");
    },
  });
  return mutation;
};
