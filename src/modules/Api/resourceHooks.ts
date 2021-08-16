import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import {
  AbilityHistory,
  AbilityHistoryResponse,
  CourseList,
  Matrix,
  MatrixCommentHistory,
  MatrixCommentHistoryField,
  Message,
  MessageList,
  MessagesResponse,
} from "api/schoolsoft/definitions";
import { useAppSelector } from "store";
import { selectSession } from "modules/login/session.slice";
import { SCHOOLSOFT_API } from "api/apis";
import { HttpError } from "./httpMiddleware";
import { resourceStatus } from "./resourceStatus";

export interface ApiResourceValue<T> {
  status: resourceStatus;
  data: T | null;
  error: HttpError | null;
}

export async function fetchResource<ResponseType>(
  path: string,
  token: string
): Promise<AxiosResponse<ResponseType>> {
  return axios.get(SCHOOLSOFT_API + path, {
    headers: {
      jsessionid: token,
    },
  });
}

export function useResource<Resource>(url: string): ApiResourceValue<Resource> {
  const [status, setStatus] = useState<resourceStatus>("loading");
  const [data, setData] = useState<Resource | null>(null);
  const [error, setError] = useState<HttpError | null>(null);

  const token = useAppSelector(selectSession).session;
  useEffect(() => {
    fetchResource<any>(url, token as string)
      .then((response) => {
        setData(response.data.data);
        setStatus("succeeded");
        setError(null);
      })
      .catch((error) => {
        setStatus("failed");
        setError({
          message: error.message,
          status: error?.response?.status || 500,
        });
      });
  }, [url, token]);

  return { status, data, error };
}

export function useCommentHistoryResource(
  ability: number
): ApiResourceValue<MatrixCommentHistory> {
  return useResource(`/comments/${ability}`);
}

export function useMatrixResource(course: number): ApiResourceValue<Matrix> {
  return useResource(`/courses/${course}/matrix`);
}

export function useAbilityResource(
  ability: number
): ApiResourceValue<AbilityHistory> {
  return useResource(`/abilities/${ability}`);
}
