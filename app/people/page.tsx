import Link from "next/link"
import Image from "next/image"
import { Separator } from "@radix-ui/themes"
import { people, getPeopleByRole } from "@/lib/movies"
import type { Person } from "@/lib/movies"
import { Film, Video, Users } from "lucide-react"

const actors = getPeopleByRole("actor")
const directors = getPeopleByRole("director")
const producers = getPeopleByRole("producer")

interface PeopleRowProps {
    title: string;
    size: number;
    people: Person[];
}

function PeopleRow({ title, size, people }: PeopleRowProps) {

    return (
        <section className="mb-12">
            <div className="flex items-center gap-2 mb-4">
                <Video className="h-6 w-6 text-accent-9" />
                <h2 className="text-xl font-semibold text-gray-9">{title}</h2>
                <span className="text-accent-9 text-sm">({people.length})</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {people.map((person) => (
                    <Link
                        key={person.id}
                        href={`/people/${person.id}`}
                        className="group"
                    >
                        <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                            <Image
                                src={person.image}
                                alt={person.name}
                                fill
                                className="object-cover transition-transform group-hover:scale-105"
                                sizes="(max-width: 768px) 50vw, 16vw"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="mt-2 text-sm font-medium text-accent-9 group-hover:text-primary transition-colors text-center">
                            {person.name}
                        </p>
                        {person.nationality && (
                            <p className="text-xs text-muted-foreground text-center">{person.nationality}</p>
                        )}
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default function PeoplePage() {

    return (
        <div className="min-h-screen bg-background">
            <main className="container p-4">
                <h1 className="text-4xl text-accent-9">People</h1>
                <p className="text-md font-mono">Directors, producers, and actors I have seen since I started tracking</p>
                <div className="mb-12">
                    <Separator my="3" size="4" />
                </div>
                {/* Actors Section */}
                <PeopleRow title="Actors" size={6} people={actors} />
                {/* Directors Section */}
                <PeopleRow title="Directors" size={4} people={directors} />
                {/* Producers Section */}
                <PeopleRow title="Producers" size={4} people={producers} />
            </main>
        </div>
    )
}