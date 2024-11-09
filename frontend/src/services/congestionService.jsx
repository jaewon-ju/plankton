import { fetchAPI } from "@/utils/fetch_api";

// 이태원역의 혼잡도와 인구 정보를 가져오는 함수
export const getCongestionData = async (hotspotName) => {
  const encodedHotspot = encodeURIComponent(hotspotName);

  // 첫 번째 API 호출: 실시간 혼잡도 예측 정보
  const congestionEndpoint = `https://data.seoul.go.kr/SeoulRtd/pop_congest?hotspotNm=${encodedHotspot}`;
  const congestionResponse = await fetchAPI("get", congestionEndpoint);

  // 두 번째 API 호출: 실시간 인구 정보
  const populationEndpoint = `https://data.seoul.go.kr/SeoulRtd/pop?hotspotNm=${encodedHotspot}`;
  const populationResponse = await fetchAPI("get", populationEndpoint);

  if (congestionResponse && populationResponse) {
    // 1. 현재 위치
    const location = populationResponse[0]?.hotspot_nm || "Unknown";

    // 2. 현재 실시간 인구
    const currentPopulation = populationResponse[0]?.RESIDENT_VALUE || "0";

    // 3. 인구에 대한 상황 설명
    const congestionText =
      populationResponse[0]?.congestion_instruction ||
      "현재 인구 밀집도에 대한 정보가 없습니다.";

    return { location, currentPopulation, congestionText };
  } else {
    throw new Error("Failed to fetch congestion or population data.");
  }
};
