import { Star } from "lucide-react";

type FixedRatingStarsProps = {
    rating?: number | null; // /10 scale, e.g. 7.5
};

export function DisplayRating({ rating }: FixedRatingStarsProps) {
    const rating10 = rating ?? null;
    const rating5 = (rating10 ?? 0) / 2; // convert 0..10 to 0..5
    const percentage = rating10 === null ? 0 : (rating10 / 10) * 100;

    return (
        <>
            <div className="flex items-center gap-1" aria-label={`${percentage.toFixed(0)} percent rating`}>
                {[1, 2, 3, 4, 5].map((star) => {
                    const fillPercent = Math.max(0, Math.min(1, rating5 - (star - 1))) * 100;

                    return (
                        <span key={star} className="relative block h-5 w-5" aria-hidden="true">
                            <Star className="h-5 w-5 text-muted-foreground/40" />
                            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fillPercent}%` }}>
                                <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                            </span>
                        </span>
                    );
                })}
            </div>
        </>
    );
}