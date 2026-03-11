import PageDisplay from "@/components/page-display";
import { seriesList } from "@/lib/movies";


export default function MoviesPage() {

    return (
        <>
            <PageDisplay title="Series" description="Here are all the series I have watch since I stated tracking!" movies={seriesList} />
        </>
    )
}