import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import MovieRow from "@/components/movie-row"
import { getPeopleByRole, getPersonById, getMoviesByPerson, movies } from "@/lib/movies"
import { ChevronLeft } from "lucide-react"
import { Badge, IconButton } from "@radix-ui/themes"

const actors = getPeopleByRole("actor")
const directors = getPeopleByRole("director")
const producers = getPeopleByRole("producer")

const BioPlaceHolder = "A versatile and accomplished performer known for bringing depth and authenticity to every role. With a passion for storytelling and a commitment to excellence, this artist has made significant contributions to film and television."
const NationalityPlaceHolder = "Earthling"
const BirthDatePlaceHolder = "January 30, 2007"
const WkipageTemp = "https://en.wikipedia.org/wiki/Actor"

interface PersonPageProps {
    params: Promise<{ id: string }>
}

export default async function PersonPage({ params }: PersonPageProps) {

    const { id } = await params;

    const person = getPersonById(id);
    if (!person) notFound();

    const isDirector = person.roles.includes("director");
    const isProducer = person.roles.includes("producer");
    const isActor = person.roles.includes("actor");

    const { directed, produced, acted } = getMoviesByPerson(id);

    return (
        <div className="min-h-screen bg-background">
            <main className="container p-4">
                {/* Back button */}
                <IconButton
                    variant="ghost"
                    size="2"
                    asChild
                    className="mb-6 gap-2 text-accent-9 hover:text-gray-9"
                >
                    <Link href="/people">
                        <ChevronLeft className="h-4 w-4" />
                        Back to People
                    </Link>
                </IconButton>
                {/* Person Info */}
                <div className="flex flex-col md:flex-row gap-4 p-4 pt-9">
                    <div className="shrink-0">
                        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-lg overflow-hidden">
                            <Image
                                src={person.image}
                                alt={person.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 192px, 256px"
                            />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-3xl md:text-4xl font-bold text-accent-9">{person.name}</h1>
                        <div className="flex flex-wrap gap-2">
                            {isDirector && (
                                <Badge>
                                    <span className="px-3 py-1 text-sm font-medium">
                                        Director
                                    </span>
                                </Badge>
                            )}
                            {isProducer && (
                                <Badge>
                                    <span className="px-3 py-1 text-sm rounded-full bg-accent/20 text-accent font-medium">
                                        Producer
                                    </span>
                                </Badge>
                            )}
                            {isActor && (
                                <Badge>
                                    <span className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground font-medium">
                                        Actor
                                    </span>
                                </Badge>
                            )}
                        </div>

                        {/* 
                            birthDate?: string
                            nationality?: string
                            bio?: string
                            roles: PersonRole[]
                         */}

                        <div className="font-mono">
                            <p className="text-accent-9">
                                Nationality: <span className="text-accent-12">{
                                    person.nationality || NationalityPlaceHolder
                                }</span>
                            </p>
                            <p className="text-accent-9">
                                Born: <span className="text-accent-12">{
                                    person.birthDate || BirthDatePlaceHolder
                                }</span>
                            </p>
                            <p className="text-accent-9">
                                Bio: <span className="text-accent-12">{
                                    person.bio || BioPlaceHolder
                                }</span>
                            </p>
                            <p className="text-accent-9">
                                Wikipedia: <a href={WkipageTemp} target="_blank" className="text-gray-9 hover:underline">{WkipageTemp}</a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Directed Movies */}
                {directed.length > 0 && (
                    <section className="mb-12">
                        <MovieRow title="Directed movies" movies={directed} />
                    </section>
                )}

                {/* Produced Movies */}
                {produced.length > 0 && (
                    <section className="mb-12">
                        <MovieRow title="Produced movies" movies={produced} />
                    </section>
                )}

                {/* Acted In */}
                {acted.length > 0 && (
                    <section className="mb-12">
                        <MovieRow title="Acted in movies" movies={acted} />
                    </section>
                )}
            </main>
        </div>
    )
}