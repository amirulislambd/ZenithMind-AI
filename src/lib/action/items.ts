"use server";

import { ServerMutation } from "../core/servermutaion";

export const CreateItem = async (data: any) => {
  return SaveItem(data);
};

export const SaveItem = async (data: any, itemId?: string) => {
  try {
    const endpoint = itemId ? `/items/${itemId}` : "/add/item";
    const method = itemId ? "PUT" : "POST";
    const res = await ServerMutation(endpoint, data, method);
    return res;
  } catch (error: any) {
    return { success: false, error: error.message || "Something went wrong" };
  }
};