"use server";
import { headers } from "next/headers";
import { auth } from "../auth";

export const GetSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    return session?.user || null;
};

export const GetSessionToken = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    return session?.session?.token || null;
};