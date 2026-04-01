import { useEffect, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";

interface UseRequestedTableSearchOptions {
  debounceMs?: number;
  initialPerPage?: number;
}

export function useRequestedTableSearch(
  options: UseRequestedTableSearchOptions = {},
) {
  const { debounceMs = 400, initialPerPage = 10 } = options;

  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, debounceMs);
  const [perPage, setPerPage] = useState(initialPerPage);

  useEffect(() => {
    const nextValue = debouncedSearch.trim();
    if (nextValue === searchQuery) return;
    setSearchQuery(nextValue);
  }, [debouncedSearch, searchQuery]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (!value.trim()) {
      setSearchQuery("");
    }
  };

  const handleSearch = (value: string) => {
    const nextValue = value.trim();
    setSearch(nextValue);
    setSearchQuery(nextValue);
  };

  return {
    search,
    searchQuery,
    perPage,
    setPerPage,
    handleSearch,
    handleSearchChange,
  };
}
