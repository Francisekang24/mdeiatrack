import PageDisplay from "@/components/page-display";
import { moviesList } from "@/lib/movies";


export default function MoviesPage() {

    return (
        <div className="min-h-screen container p-8">
            <PageDisplay title="Movies" description="Here are all the movies I have watch since I stated tracking!" movies={moviesList} />
        </div>
    )
}