"use client"

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, Button, Card, Inset, Text, AspectRatio } from "@radix-ui/themes";
import { Star, Eye, Plus, Play } from "lucide-react";
import type { Movie } from "@/lib/movies";
import { DisplayRating } from "./display-stars-rating";

interface MovieCardProps {
    movie: Movie;
    size?: "tn" | "sm" | "md" | "lg";
}

const originLabels: Record<string, string> = {
    kdrama: "K-Drama",
    cdrama: "C-Drama",
    jdrama: "J-Drama",
    hollywood: "",
    anime: "Anime",
    other: "",
};

export default function MovieCard({ movie, size = "md" }: MovieCardProps) {

    return (
        <>
            {/* MD */}
            <Card asChild size="1" style={{ padding: '0' }}>
                <Link href={`/movies/${movie.id}`} className="group">
                    <div className={`${size === "md" ? "" : "hidden"} w-[184px] p-1`}>
                        <Image
                            src={movie.poster}
                            alt={movie.title}
                            width={180}
                            height={270}
                            className="object-cover pb-1 rounded-md"
                        />

                        <p className="truncate text-sm font-medium text-accent-9">{movie.title}</p>
                        <p className="truncate text-sm">{originLabels[movie.origin] || movie.origin}</p>
                    </div>
                </Link>
            </Card>

            {/* TN */}
            <Card asChild size="1" style={{ padding: '0' }}>
                <Link href={`/movies/${movie.id}`} className="group">
                    <div className={`${size === "tn" ? "" : "hidden"} flex p-1`}>
                        <Image
                            src={movie.poster}
                            alt={movie.title}
                            width={60}
                            height={90}
                            className="object-cover rounded-md"
                        />
                        <div className="ml-2 w-40">
                            <p className="truncate text-sm font-medium text-accent-9">{movie.title}</p>
                            <p className="truncate text-sm">{originLabels[movie.origin] || movie.origin}</p>
                            <p className="truncate text-sm">{movie.episodes ? `${movie.episodes} episodes` : `Runtime ${movie.runtime}`}</p>
                            <p className="truncate text-sm">{movie.year}</p>
                        </div>
                    </div>
                </Link>
            </Card>

            {/* SM */}
            <Card asChild size="1" style={{ padding: '0' }}>
                <Link href={`/movies/${movie.id}`} className="group">
                    <div className={`${size === "sm" ? "" : "hidden"} flex p-1`}>
                        <Image
                            src={movie.poster}
                            alt={movie.title}
                            width={90}
                            height={135}
                            className="object-cover rounded-md"
                        />
                        <div className="ml-2 w-60">
                            <p className="truncate text-sm font-medium text-accent-9">{movie.title}</p>
                            <p className="truncate text-sm">{originLabels[movie.origin] || movie.origin}</p>
                            <p className="text-sm">
                                <DisplayRating rating={movie.ratings.myRating ?? movie.ratings.imdb ?? 0} />
                            </p>
                            <p className="line-clamp-4 w-60 text-sm">{movie.description}</p>
                        </div>
                    </div>
                </Link>
            </Card>

            {/* LG */}
            <Card asChild size="1" style={{ padding: '0' }}>
                <Link href={`/movies/${movie.id}`} className="group">
                    <div className={`${size === "lg" ? "" : "hidden"} flex p-1`}>
                        <Image
                            src={movie.poster}
                            alt={movie.title}
                            width={150}
                            height={225}
                            className="object-cover rounded-md"
                        />
                        <div className="ml-2 w-80 flex flex-col gap-4">
                            <div>
                                <p className="truncate text-md font-medium text-accent-9">{movie.title}</p>
                                <p className="truncate text-md">{originLabels[movie.origin] || movie.origin} - {movie.year}</p>
                            </div>
                            <p className="text-sm">
                                <DisplayRating rating={movie.ratings.myRating ?? movie.ratings.imdb ?? 0} />
                            </p>
                            <p className="line-clamp-4 w-80 text-sm">{movie.description}</p>
                            <div>
                                {movie.trailerUrl && (
                                    <Button
                                        variant="outline"
                                        size="3"
                                        className="gap-2"
                                        asChild
                                        color="tomato"
                                    >
                                        <a href={movie.trailerUrl} target="_blank" rel="noopener noreferrer">
                                            <Play className="h-5 w-5" />
                                            Watch Trailer
                                        </a>
                                    </Button>
                                )}
                                <Button
                                    variant="outline"
                                    size="3"
                                    className="gap-2"
                                    color="tomato"
                                >
                                    <Plus className="h-5 w-5" />
                                    Watchlist
                                </Button>
                            </div>
                        </div>
                    </div>
                </Link>
            </Card>
        </>
    )
}