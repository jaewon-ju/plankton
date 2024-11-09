import { fetchAPI } from "@/utils/fetch_api";

export const sendQuestion = async (query) => {
  const endpoint = `/mainQuestionId`;
  const data = { query };
  return await fetchAPI("post", endpoint, data);
};

export const getAnswer = async (query) => {
  const endpoint = `/mainQuestionId`;
  const data = { query };
  return await fetchAPI("post", endpoint, data);
};
