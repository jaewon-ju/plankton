import { fetchAPI } from "@/utils/fetch_api";

export const getSubQuestion = async ({ topic, id }) => {
  const encodedTopic = encodeURIComponent(topic);
  const endpoint = `/question/sub?topic=${encodedTopic}&mainQuestionId=${id}`;
  return await fetchAPI("get", endpoint);
};

export const getFeedback = async ({
  topic,
  currentQuestion,
  answerInput,
  questionClass,
}) => {
  const endpoint = `/feedback`;
  const data = { topic, currentQuestion, answerInput, questionClass };
  return await fetchAPI("post", endpoint, data);
};

export const uploadImage = async (formData) => {
  const endpoint = `/upload/image`;
  const additionalHeaders = {
    "Content-Type": "multipart/form-data",
  };
  return await fetchAPI("post", endpoint, formData, null, additionalHeaders);
};
