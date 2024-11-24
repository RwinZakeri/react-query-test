import { AXIOS } from "@/setting/axiosInterceptor";

export async function queryFetcher(endPoint: string) {
  const { data } = await AXIOS.get(endPoint);
  return data;
}
