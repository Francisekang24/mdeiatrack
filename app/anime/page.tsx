import PageDisplay from "@/components/page-display";
import { anime as animeList } from "@/lib/movies";


export default function AnimePage() {

    return (
        <>
            <PageDisplay title="Anime" description="Discover your next favorite anime series!" movies={animeList} />
        </>
    )
}