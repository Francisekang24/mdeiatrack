"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@radix-ui/themes";
import MovieCard from "./movie-card";
import type { Movie } from "@/lib/movies";

interface MovieRowProps {
    title: string;
    movies: Movie[];
    showSeeAll?: boolean;
    href?: string;
}

export default function MovieRow({
    title,
    movies,
    showSeeAll = true,
    href,
}: MovieRowProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateScrollState = useCallback(() => {
        const container = scrollRef.current;
        if (!container) return;

        const maxScrollLeft = Math.max(0, container.scrollWidth - container.clientWidth);
        const tolerance = 1;

        setCanScrollLeft(container.scrollLeft > tolerance);
        setCanScrollRight(maxScrollLeft > tolerance && container.scrollLeft < maxScrollLeft - tolerance);
    }, []);

    const scroll = (direction: "left" | "right") => {
        const container = scrollRef.current;
        if (!container) return;

        const amount = Math.round(container.clientWidth * 0.2) * (direction === "left" ? -1 : 1);

        container.scrollBy({
            left: amount,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        updateScrollState();

        const onScroll = () => updateScrollState();
        container.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);

        return () => {
            container.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [movies.length, updateScrollState]);

    useEffect(() => {
        const container = scrollRef.current;
        const track = trackRef.current;
        if (!container) return;

        const observer = new ResizeObserver(() => updateScrollState());
        observer.observe(container);
        if (track) observer.observe(track);

        // Run once more after paint to capture final layout/image sizes.
        const rafId = window.requestAnimationFrame(updateScrollState);

        return () => {
            window.cancelAnimationFrame(rafId);
            observer.disconnect();
        };
    }, [movies.length, updateScrollState]);

    return (
        <section className="w-full max-w-full space-y-4 p-1 px-4 sm:px-6 lg:px-8 py-8 max-w-8xl mx-auto">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-accent-11">{title}</h2>
                <div className="flex items-center gap-2">
                    {showSeeAll && href && (
                        <Link href={href} className="text-sm text-accent-10 hover:text-accent-11">
                            See all
                        </Link>
                    )}

                    <Button
                        variant="soft"
                        size="2"
                        color="gray"
                        onClick={() => scroll("left")}
                        disabled={!canScrollLeft}
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="soft"
                        size="2"
                        color="gray"
                        onClick={() => scroll("right")}
                        disabled={!canScrollRight}
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="w-full">
                <div
                    ref={scrollRef}
                    className="w-full overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    onScroll={updateScrollState}
                >
                    <div ref={trackRef} className="flex w-max gap-1">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} size="md" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}