import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
    Star, Play, Calendar, Clock, ChevronLeft, MessageSquare, Eye, RefreshCcw, Globe, Film, Users, Edit,
} from "lucide-react";
import { getMovieById, getSimilarMovies, getContentOrigins, getPersonById } from "@/lib/movies";
import { Button, IconButton, Badge } from "@radix-ui/themes";
import MovieRow from "@/components/movie-row";
import { RatingSlider } from "@/components/rating-slider";
import { DisplayRating } from "@/components/display-stars-rating";

const originLabels: Record<string, string> = {
    ...Object.fromEntries(getContentOrigins().map(origin => [origin, origin.toUpperCase()]))
}

const DescriptionPlaceHolder = "An enthralling film that captivates audiences with its compelling narrative and stunning cinematography. This movie delivers an unforgettable viewing experience that will leave you thinking long after the credits roll."
const CountryPlaceHolder = "Spain"
const ReleaseDatePlaceHolder = "January 30, 2007"
const Imdb = "https://www.imdb.com/title/tt4631532/"
const CharacterPlaceHolder = "John Doe"

interface MoviePageProps {
    params: Promise<{ id: string }>
}

export default async function MoviePage({ params }: MoviePageProps) {

    const { id } = await params
    const movie = getMovieById(id)

    if (!movie) {
        notFound()
    }

    const similarMovies = getSimilarMovies(movie);

    const cast = movie.credits.filter(person => person.role.includes("actor"));
    const directors = movie.credits.filter(person => person.role.includes("director"));
    const producers = movie.credits.filter(person => person.role.includes("producer"));

    return (

        <section className="min-h-screen bg-background">
            <div className="relative h-[50vh] md:h-[60vh] w-full overflow-visible">
                {/* Background image */}
                <div className="absolute inset-0">
                    <Image
                        src={movie.backdrop || movie.poster}
                        alt={movie.title}
                        fill
                        className="object-cover opacity-10"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-background/20" />
                </div>

                {/* Your actual content goes here, on top */}
                <div className="relative z-10 container p-4">
                    {/* Back button */}
                    <IconButton
                        variant="ghost"
                        size="2"
                        asChild
                        className="mb-6 gap-2 text-accent-9 hover:text-gray-9"
                    >
                        <Link href="/movies">
                            <ChevronLeft className="h-4 w-4" />
                            Back to People
                        </Link>
                    </IconButton>
                    {/* Person Info */}
                    <div className="flex flex-col md:flex-row gap-4 p-4 pt-9">
                        <div className="shrink-0">
                            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-lg overflow-hidden">
                                <Image
                                    src={movie.backdrop || movie.poster}
                                    alt={movie.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 192px, 256px"
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-3xl md:text-4xl font-bold text-accent-9">{movie.title}</h1>
                            <div className="flex flex-wrap gap-2">
                                {movie.tags.map((tag) => (
                                    <Badge>
                                        <span className="px-3 py-1 text-sm font-medium">
                                            {tag}
                                        </span>
                                    </Badge>
                                ))}
                            </div>

                            <div className="font-mono">
                                <p className=" flex gap-1 text-accent-9">
                                    Country: <span className="text-accent-12">{
                                        movie.country || CountryPlaceHolder
                                    }</span>
                                    <Badge size="2" variant="outline">{movie.origin}</Badge>
                                </p>
                                <p className="text-accent-9">
                                    Release: <span className="text-accent-12">{
                                        movie.year || ReleaseDatePlaceHolder
                                    }</span>
                                </p>
                                <p className="text-accent-9">
                                    Description: <span className="text-accent-12">{
                                        movie.description || DescriptionPlaceHolder
                                    }</span>
                                </p>
                                <p className="text-accent-9 truncate">
                                    Imdb: <a href={Imdb} target="_blank" className="text-gray-9 hover:underline">{Imdb}</a>
                                </p>
                                <div className="flex flex-wrap gap-1 mt-0.5">
                                    {movie.genres.map((genre) => (
                                        <Badge key={genre} variant="soft" size="2">
                                            {genre}
                                        </Badge>
                                    ))}
                                    {movie.subgenres?.map((subgenre) => (
                                        <Badge key={subgenre} variant="soft" size="2">
                                            {subgenre}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-2 items-center font-mono text-lg">
                                <p className="text-accent-9">Rating: </p>
                                <DisplayRating rating={movie.ratings.myRating || movie.ratings.imdb} />
                                <p>{movie.ratings.myRating || movie.ratings.imdb}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-accent-9 mb-4 mt-8 px-4">
                    Cast:
                </h1>
                <div className="flex flex-wrap gap-4 px-4">
                    {cast.map((person) => (
                        <Link
                            key={person.personId}
                            href={`/people/${person.personId}`}
                            className="group flex items-center gap-4"
                        >
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted">
                                <Image
                                    src={getPersonById(person.personId)?.image || "/placeholder-profile.png"}
                                    alt={person.name}
                                    fill
                                    className="object-cover transition-transform group-hover:scale-105"
                                    sizes="(max-width: 768px) 64px, 64px"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <p className="text-sm font-medium text-accent-9 group-hover:text-primary transition-colors">
                                {person.name}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
            <div>
                <MovieRow title="Similar Movies" movies={similarMovies} />
            </div>
        </section>
    )
}