import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
    Star, Play, Calendar, Clock, ChevronLeft, MessageSquare, Eye, RefreshCcw, Globe, Film, Users, Edit,
} from "lucide-react";
import { getMovieById, getSimilarMovies, getContentOrigins, getPersonById } from "@/lib/movies";
import { Button, IconButton, Badge, Blockquote } from "@radix-ui/themes";
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
const PersonalReviewPlaceHolder = "I really enjoyed this movie! The plot was engaging and the performances were outstanding. Highly recommend it to anyone looking for a great film to watch."

interface MoviePageProps {
    params: Promise<{ id: string }>
}

export default async function MoviePage({ params }: MoviePageProps) {

    const { id } = await params
    const movie = getMovieById(id)

    if (!movie) {
        notFound()
    }

    const isSeries = movie.episodes && movie.episodes > 0;
    const backHref = isSeries
        ? "/series"
        : movie.type === "anime"
            ? "/anime"
            : "/movies";

    const similarMovies = getSimilarMovies(movie);

    const cast = movie.credits.filter(person => person.role.includes("actor"));
    const castPeople = cast.map(person => getPersonById(person.personId));
    const directors = movie.credits.filter(person => person.role.includes("director"));
    const directorPeople = directors.map(person => getPersonById(person.personId));
    const producers = movie.credits.filter(person => person.role.includes("producer"));
    const producerPeople = producers.map(person => getPersonById(person.personId));

    function displayCredits(people: (ReturnType<typeof getPersonById> | null)[], role: string) {
        if (people.length === 0) return null;

        return (
            <div className="container p-8">
                <h1 className="text-2xl md:text-3xl font-bold text-accent-9 mb-4">
                    {role}:
                </h1>
                <div className="flex flex-wrap gap-4">
                    {people.map((person) => (
                        <Link
                            key={person?.id}
                            href={`/people/${person?.id}`}
                            className="group flex flex-col items-center gap-2 p-2"
                        >
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted">
                                <Image
                                    src={person?.image || "/placeholder-profile.png"}
                                    alt={person?.name || "Unknown"}
                                    fill
                                    className="object-cover transition-transform group-hover:scale-105"
                                    sizes="(max-width: 768px) 64px, 64px"
                                />
                            </div>
                            <p className="text-sm font-medium text-accent-12 group-hover:text-accent-9 font-mono transition-colors">
                                {person?.name}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        )
    }

    return (

        <section className="min-h-screen bg-background">
            <div className="relative h-[70vh] md:h-[60vh] w-full overflow-visible">
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
                        <Link href={backHref}>
                            <ChevronLeft className="h-4 w-4" />
                            Back to {movie.type}
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
                                {isSeries ?
                                    <p className="text-accent-9">
                                        Episodes: <span className="text-accent-12">{movie.episodes}</span>
                                    </p>
                                    :
                                    <p className="text-accent-9">
                                        Runtime: <span className="text-accent-12">{movie.runtime || "Unknown"}</span>
                                    </p>
                                }
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
            {/* Personal Opinion */}
            <div className="container p-8">
                <h2 className="text-xl font-bold text-accent-9 mb-2">My thoughts </h2>
                <Blockquote className="font-mono">
                    {movie.personalReview || PersonalReviewPlaceHolder}
                </Blockquote>
            </div>

            {/* Movie credits */}
            {displayCredits(castPeople, "Cast")}
            {displayCredits(directorPeople, "Directors")}
            {displayCredits(producerPeople, "Producers")}
            {/* Similar Movies */}
            <div>
                <MovieRow title="Similar Movies" movies={similarMovies} />
            </div>
        </section>
    )
}