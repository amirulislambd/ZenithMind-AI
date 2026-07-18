"use server";
import { ServerMutation } from "../core/servermutaion"

export const CreateItem = async (data: any) => {
    try {
        const res = await ServerMutation('/add/item', data, 'POST')
        return res
    } catch (error: any) {
        return { success: false, error: error.message || "Something went wrong" };
    }

}