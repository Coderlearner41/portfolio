"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SearchBar } from "@/components/search-bar"
import { search, SearchResult } from "./api/search"
import { Button } from "@/components/ui/button"

export default function SearchPage() {
  const [results, setResults] = useState<SearchResult[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [query, setQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["all"])

  const handleSearch = async (searchQuery: string, filters = selectedFilters) => {
    setQuery(searchQuery)
    setHasSearched(true)
    try {
      const activeTypes = filters.includes("all")
        ? []
        : filters // backend supports ?type=project,experience,por
      const foundResults = await search(searchQuery, activeTypes)
      setResults(foundResults)
    } catch (err) {
      console.error(err)
      setResults([])
    }
  }

  const toggleFilter = (type: string) => {
    if (type === "all") {
      setSelectedFilters(["all"])
      if (query) handleSearch(query, ["all"])
      return
    }

    let updated = selectedFilters.includes(type)
      ? selectedFilters.filter((f) => f !== type)
      : [...selectedFilters.filter((f) => f !== "all"), type]

    // if all 3 individual filters are selected → select "all"
    const allTypes = ["project", "experience", "por"]
    if (allTypes.every((t) => updated.includes(t))) {
      updated = ["all"]
    }

    setSelectedFilters(updated)
    if (query) handleSearch(query, updated)
  }

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      project: "badge-primary",
      por: "badge-gold",
      experience: "badge-accent",
    }
    return colors[type] || "badge-primary"
  }

  return (
    <div className="container-max py-12">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Search</h1>
        <p className="text-muted-foreground">
          Search across projects, experiences, and positions of responsibility.
        </p>
      </motion.div>

      <SearchBar onSearch={(q) => handleSearch(q)} />

      {/* --- Filter Section --- */}
      <motion.div
        className="flex flex-wrap gap-3 pb-6 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {["all", "project", "experience", "por"].map((type) => {
          const isActive = selectedFilters.includes(type)
          return (
            <Button
              key={type}
              variant={isActive ? "default" : "outline"}
              className={`rounded-full transition-all px-6 py-2 text-sm ${
                isActive ? "bg-primary text-white" : "text-muted-foreground"
              }`}
              onClick={() => toggleFilter(type)}
            >
              {type === "all"
                ? "All"
                : type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          )
        })}
      </motion.div>

      {/* --- Results Section --- */}
      {hasSearched && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-12">
          {results.length > 0 ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                Found {results.length} result{results.length !== 1 ? "s" : ""} for{" "}
                <span className="text-foreground font-semibold">"{query}"</span>
              </p>

              {results.map((result, index) => (
                <motion.div
                  key={`${result.type}-${result.title}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="card-base"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={getTypeColor(result.type)}>
                          {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                        </span>
                        {result.category && (
                          <span className="text-xs text-muted-foreground">• {result.category}</span>
                        )}
                      </div>
                      <h3 className="font-bold text-foreground mb-1">{result.title}</h3>
                      <p className="text-sm text-muted-foreground">{result.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-base text-center py-12">
              <p className="text-muted-foreground">
                No results found for <span className="text-foreground font-semibold">"{query}"</span>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Try searching for different projects, experiences, or PORs.
              </p>
            </motion.div>
          )}
        </motion.div>
      )}

      {!hasSearched && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-base text-center py-12">
          <p className="text-muted-foreground">Start typing to search across all content.</p>
        </motion.div>
      )}
    </div>
  )
}
