import { fetchAPI } from "@/utils/fetch_api";

export const getCongestionData = async (hotspotName) => {
  const encodedHotspot = encodeURIComponent(hotspotName);
  const endpoint = `/mainQuestionId=${encodedHotspot}`;
  return await fetchAPI("get", endpoint);
};
