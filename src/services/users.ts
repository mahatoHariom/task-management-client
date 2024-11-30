/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/axios-instance";
import { LoginFormData } from "@/schemas/users/login-schema";
import { SignUpFormData } from "@/schemas/users/signup-schema";

import { BaseUser } from "@/types";

import { AxiosResponse } from "axios";

export default async function registerUser(
  values: SignUpFormData
): Promise<AxiosResponse<BaseUser>> {
  return await api.post("/auth/register", values);
}
interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: BaseUser;
}

export async function loginUser(data: LoginFormData): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/auth/login", data);
  return response.data;
}

export async function getProfile(): Promise<BaseUser> {
  const response = await api.get<BaseUser>("/auth/profile");
  console.log(response, "pose");
  return response.data;
}
