"use client";

import { useRef, useState } from "react";
import { useAutocomplete } from "../hooks/useAutocomplete";
import { useRouter } from "next/navigation";

export default function Searcher() {
  const { handleChangeInput, results } = useAutocomplete("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const ulRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) => {
        const nextIndex = prev + 1 > results.length - 1 ? 0 : prev + 1;
        scrollToItem(nextIndex);
        return nextIndex;
      });
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => {
        const nextIndex = prev - 1 < 0 ? results.length - 1 : prev - 1;
        scrollToItem(nextIndex);
        return nextIndex;
      });
    }

    if (e.key === "Enter" && focusedIndex >= 0) {
      const selected = results[focusedIndex];
      handleSelection(selected.id);
    }
  };

  const scrollToItem = (index: number) => {
    const ul = ulRef.current;
    if (!ul) return;

    const li = ul.children[index] as HTMLElement;
    li?.scrollIntoView({ block: "nearest" });
  };

  const handleListClick = () => {
    inputRef.current?.focus();
  };

  const handleSelection = (id: string) => {
    router.push(`/flights/${id}`);

  };

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        autoComplete="off"
        id="search-navbar"
        className="block w-full h-12 p-2 ps-10  text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-[#2E2B2B] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search..."
        onChange={handleChangeInput}
        onKeyDown={handleKeyDown}
      />
      <ul
        ref={ulRef}
        className="bg-zinc-100/80 dark:bg-zinc-700 rounded-lg max-h-132 overflow-y-scroll"
        onClick={handleListClick}
      >
        {results.map((result: any, i: number) => (
          <li
            className={`p-3 cursor-pointer ${
              i === focusedIndex ? "bg-blue-300 dark:bg-blue-600" : ""
            }`}
            key={result.id}
            onClick={() => handleSelection(result.id)}
            onMouseEnter={() => setFocusedIndex(i)}
          >
            {result.label} • {result.detail.route}
          </li>
        ))}
      </ul>
    </>
  );
}
