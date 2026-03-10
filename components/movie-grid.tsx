"use client";

import { useState } from "react";
import { IconButton } from "@radix-ui/themes";
import { LayoutGrid, StretchHorizontal } from "lucide-react";
import type { Movie } from "@/lib/movies";
import MovieCard from "./movie-card";
import SortControls, { type SortOption } from "./sort-controls";
import { useIsSmallScreen } from "@/hooks/useIsSmallScreen";

interface MovieGridProps {
    movies: Movie[];
}

function sortMovies(movies: Movie[], sortOption: SortOption): Movie[] {
    return [...movies].sort((a, b) => {
        if (sortOption === "1") return new Date(b.releaseDate || 0).getTime() - new Date(a.releaseDate || 0).getTime();
        if (sortOption === "2") return new Date(a.releaseDate || 0).getTime() - new Date(b.releaseDate || 0).getTime();
        if (sortOption === "3") return new Date(b.lastWatchedDate || 0).getTime() - new Date(a.lastWatchedDate || 0).getTime();
        if (sortOption === "4") return new Date(a.lastWatchedDate || 0).getTime() - new Date(b.lastWatchedDate || 0).getTime();
        return 0;
    });
}

export default function MovieGrid({ movies }: MovieGridProps) {
    const [isGrid, setIsGrid] = useState(true);
    const [sortOpen, setSortOpen] = useState(false);
    const [sortOption, setSortOption] = useState<SortOption>("0");
    const isSmallScreen = useIsSmallScreen();

    const sortedMovies = sortMovies(movies, sortOption);

    return (
        <div>
            <div className="flex mt-6 gap-3 items-center justify-end">
                <SortControls
                    sortOpen={sortOpen}
                    sortOption={sortOption}
                    onToggleOpen={() => setSortOpen(!sortOpen)}
                    onSortChange={setSortOption}
                />
                <IconButton variant="outline" onClick={() => setIsGrid(!isGrid)} aria-label="Toggle layout">
                    {isGrid ? <LayoutGrid className="h-4 w-4" /> : <StretchHorizontal className="h-4 w-4" />}
                </IconButton>
            </div>
            <div className={`mt-8 ${isGrid ? "flex flex-wrap gap-0.5" : "flex flex-col gap-1"}`}>
                {sortedMovies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        size={isGrid ? "md" : isSmallScreen ? "sm" : "lg"}
                    />
                ))}
            </div>
        </div>
    );
}