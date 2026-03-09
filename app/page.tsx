import Image from "next/image";
import { DropdownMenu, Button, Flex } from "@radix-ui/themes";
import Hero from "@/components/hero";
import { cDrama, kDrama, movies, topRated, recentlyWatched, watchlist } from "@/lib/movies";
import MovieCard from "@/components/movie-card";
import MovieRow from "@/components/movie-row";

export default function Home() {
    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-between sm:items-start">
            <Hero movie={movies[0]} />
            <div className="mt-6">
                {watchlist.length > 0 && <MovieRow title="My Watchlist" movies={watchlist} href="/watchlist" />}
                <MovieRow title="Recently Watched" movies={recentlyWatched} />
                <MovieRow title="Top Rated" movies={topRated} />
                <MovieRow title="K-Drama" movies={kDrama} href="/dramas/kdrama" />
                <MovieRow title="C-Drama" movies={cDrama} href="/dramas/cdrama" />
            </div>
        </main>
    );
}
