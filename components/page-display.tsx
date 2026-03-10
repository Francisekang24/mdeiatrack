"use client";

import type { Movie } from "@/lib/movies";
import MovieGrid from "./movie-grid";

interface PageDisplayProps {
    title: string;
    description: string;
    movies: Movie[];
}

function Sidebar() {
    return (
        <aside className="hidden md:block w-1/4">
            Sidebar
        </aside>
    );
}

export default function PageDisplay({ title, description, movies }: PageDisplayProps) {
    return (
        <div className="flex p-4">
            <main className="w-full md:w-3/4">
                <h1 className="text-4xl text-accent-9">{title}</h1>
                <p className="text-md font-mono">{description}</p>
                <MovieGrid movies={movies} />
            </main>
            <Sidebar />
        </div>
    );
}