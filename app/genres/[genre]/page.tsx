import PageDisplay from "@/components/page-display";
import { getMoviesByGenre, movies } from "@/lib/movies";
import { IconButton } from "@radix-ui/themes";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";




interface GenrePageProps {
    params: Promise<{ genre: string }>
}

export default async function GenrePage({ params }: GenrePageProps) {

    const { genre } = await params
    const genreName = genre.charAt(0).toUpperCase() + genre.slice(1)
    const genreMovies = getMoviesByGenre(genreName)


    return (
        <div className="min-h-screen container p-8">
            <IconButton
                variant="ghost"
                size="2"
                asChild
                className="mb-8 gap-2 text-accent-9 hover:text-gray-9"
            >
                <Link href="/people">
                    <ChevronLeft className="h-4 w-4" />
                    Back to People
                </Link>
            </IconButton>
            <PageDisplay title={genreName} description={`Here are all the ${genreName} I have watched since I started tracking!`} movies={genreMovies} />
        </div>
    )
}