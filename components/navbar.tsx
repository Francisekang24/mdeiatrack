"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Film, Home, Tv, Tag, BarChart3, Menu, X, Sparkles, LayoutDashboard, Users, Search } from "lucide-react";
import { IconButton, TextField } from "@radix-ui/themes";
import ThemeToggle from "./theme-toggle";

const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/movies", label: "Movies", icon: Film },
    { href: "/series", label: "Series", icon: Tv },
    { href: "/anime", label: "Anime", icon: Sparkles },
    { href: "/people", label: "People", icon: Users },
    { href: "/genres", label: "Genres", icon: Tag },
    { href: "/stats", label: "Stats", icon: BarChart3 },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

export default function Navbar() {
    const pathname = usePathname();
    const [searchOpen, setSearchOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [intermediateMenuOpen, setIntermediateMenuOpen] = useState(false);

    const navLinkClass = (isActive: boolean) =>
        `flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${isActive
            ? "text-white/90 font-medium bg-accent-9"
            : "text-gray-12 hover:text-foreground hover:bg-accent-3"
        }`;

    const menuLinkClass = (isActive: boolean) =>
        `flex items-center gap-3 px-3 py-3 text-sm rounded-md transition-colors ${isActive
            ? "text-primary bg-accent-3 font-medium"
            : "text-muted-foreground hover:text-foreground hover:bg-accent-3"
        }`;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border backdrop-blur bg-background">
            <div className="container mx-auto flex h-16 items-center justify-between ">

                {/* Left: Logo + Nav */}
                <div className="flex items-center gap-6 min-w-0">
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shrink-0">
                            <Film className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <span className="font-bold text-xl text-gray-8 overflow-hidden whitespace-nowrap">
                            Media<span className="text-gray-12">Trak</span>
                        </span>
                    </Link>

                    {/* Full nav (≥ 1032px) */}
                    <nav className="hidden min-[1032px]:flex items-center gap-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link key={item.href} href={item.href} className={navLinkClass(pathname === item.href)}>
                                    <Icon className="h-4 w-4" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Intermediate nav (768px - 1031px): first 6 as icons */}
                    <nav className="hidden md:max-[1031px]:flex items-center gap-0.5">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={navLinkClass(pathname === item.href)}
                                    aria-label={item.label}
                                    title={item.label}
                                >
                                    <Icon className="h-4 w-4" />
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Right: Search + Menu + Theme */}
                <div className="flex items-center gap-2 shrink-0">

                    {/* Search field */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${searchOpen ? "w-28 md:w-48 opacity-100" : "w-0 opacity-0"
                        }`}>
                        <TextField.Root placeholder="Search…" autoFocus={searchOpen}>
                            <TextField.Slot>
                                <Search className="h-4 w-4" />
                            </TextField.Slot>
                        </TextField.Root>
                    </div>

                    {/* Search toggle */}
                    <IconButton
                        onClick={() => setSearchOpen(!searchOpen)}
                        aria-label="Toggle search"
                    >
                        {searchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
                    </IconButton>

                    {/* menu button — mobile (<768px)*/}
                    <div className="md:hidden flex items-center">
                        <IconButton
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {(mobileMenuOpen)
                                ? <X className="h-4 w-4" />
                                : <Menu className="h-4 w-4" />
                            }
                        </IconButton>
                    </div>

                    <ThemeToggle />
                </div>
            </div>

            {/* Mobile dropdown — all items */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-border bg-background">
                    <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={menuLinkClass(pathname === item.href)}
                                >
                                    <Icon className="h-4 w-4" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            )}
        </header>
    );
}