"use client";

import { IconButton } from "@radix-ui/themes";
import { ArrowUpDown, CalendarArrowDown, CalendarArrowUp, ClockArrowDown, ClockArrowUp } from "lucide-react";

export type SortOption = "0" | "1" | "2" | "3" | "4";

interface SortControlsProps {
    sortOpen: boolean;
    sortOption: SortOption;
    onToggleOpen: () => void;
    onSortChange: (option: SortOption) => void;
}

const sortButtons: { option: SortOption; icon: React.ReactNode; label: string }[] = [
    { option: "1", icon: <CalendarArrowDown className="h-4 w-4" />, label: "Release date descending" },
    { option: "2", icon: <CalendarArrowUp className="h-4 w-4" />, label: "Release date ascending" },
    { option: "3", icon: <ClockArrowDown className="h-4 w-4" />, label: "Last watched descending" },
    { option: "4", icon: <ClockArrowUp className="h-4 w-4" />, label: "Last watched ascending" },
];

export default function SortControls({ sortOpen, sortOption, onToggleOpen, onSortChange }: SortControlsProps) {
    return (
        <div className="flex gap-2 items-center">
            <div className={`flex gap-2 transition-all duration-500 ease-in-out overflow-hidden ${sortOpen ? "max-w-xs opacity-100" : "max-w-0 opacity-0 pointer-events-none"
                }`}>
                {sortButtons.map(({ option, icon, label }, i) => (
                    <IconButton
                        key={option}
                        aria-label={label}
                        variant={sortOption === option ? "solid" : "outline"}
                        onClick={() => onSortChange(sortOption === option ? "0" : option)}
                        className={`transition-all duration-500 ${i === sortButtons.length - 1 && !sortOpen ? "translate-x-full" : "translate-x-0"
                            }`}
                    >
                        {icon}
                    </IconButton>
                ))}
            </div>
            <IconButton variant="outline" onClick={onToggleOpen} aria-label="Toggle sort">
                <ArrowUpDown className="h-4 w-4" />
            </IconButton>
        </div>
    );
}