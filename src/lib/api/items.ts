"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GetServer } from "../core/servermutaion";

const DEFAULT_CATEGORIES = ["All", "Stress Relief", "Sleep Optimization", "Executive Recovery", "Focus Boost"];

export const useGetKits = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlSearch = searchParams.get("search") ?? "";
  const urlCategory = searchParams.get("category") ?? "All";

  const [searchQuery, setSearchQueryState] = useState(urlSearch);
  const [selectedCategory, setSelectedCategoryState] = useState(urlCategory);

  useEffect(() => {
    setSearchQueryState(urlSearch);
    setSelectedCategoryState(urlCategory);
  }, [urlSearch, urlCategory]);

  const syncFilters = (nextSearch: string, nextCategory: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextSearch.trim()) {
      params.set("search", nextSearch.trim());
    } else {
      params.delete("search");
    }

    if (nextCategory && nextCategory !== "All") {
      params.set("category", nextCategory);
    } else {
      params.delete("category");
    }

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  };

  const setSearchQuery = (value: string) => {
    setSearchQueryState(value);
    syncFilters(value, selectedCategory);
  };

  const setSelectedCategory = (value: string) => {
    setSelectedCategoryState(value);
    syncFilters(searchQuery, value);
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["wellness-kits", searchQuery, selectedCategory],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams();
      params.set("page", String(pageParam));
      params.set("limit", "9");

      const trimmedSearch = searchQuery.trim();
      if (trimmedSearch) {
        params.set("search", trimmedSearch);
      }

      if (selectedCategory && selectedCategory !== "All") {
        params.set("category", selectedCategory);
      }

      const response = await GetServer(`/items?${params.toString()}`);
      if (!response || !response.success) {
        throw new Error(response?.error || "Failed to fetch kits");
      }
      return response.data?.items || response.data || [];
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : null;
    },
    staleTime: 1000 * 60 * 5,
  });

  const allKits = data ? data.pages.flatMap((page: unknown[]) => page) : [];

  const categories = useMemo(() => {
    const fromData = Array.from(new Set(allKits.map((kit: any) => kit.category).filter(Boolean)));
    return Array.from(new Set([...DEFAULT_CATEGORIES, ...fromData]));
  }, [allKits]);

  return {
    kits: allKits,
    categories,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    errorMessage: error?.message,
  };
};