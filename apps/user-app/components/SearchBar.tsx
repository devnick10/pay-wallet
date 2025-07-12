"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Search } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  filterType?: string;
  onSearchChange: (value: string) => void;
  onFilterChange?: (value: string) => void;
}

export function SearchBar({
  searchTerm,
  filterType,
  onSearchChange,
  onFilterChange,
}: SearchBarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by name or transaction ID..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <Select value={filterType} onValueChange={onFilterChange}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Transactions</SelectItem>
            <SelectItem value="sent">Money Sent</SelectItem>
            <SelectItem value="received">Money Received</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
