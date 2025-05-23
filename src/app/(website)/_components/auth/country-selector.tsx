"use client";

import { useState, useMemo, useEffect } from "react";
import countryList from "react-select-country-list";
import { Check, ChevronDown, Globe } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CountryOption {
  label: string;
  value: string;
}

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function CountrySelect({
  value,
  onChange,
  className,
}: CountrySelectProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const options = useMemo(() => countryList().getData() as CountryOption[], []);
  const [selected, setSelected] = useState<CountryOption | null>(null);

  // When the component mounts, find the country by value if it exists
  useEffect(() => {
    if (value) {
      const country = options.find((option) => option.value === value);
      if (country) {
        setSelected(country);
      }
    }
  }, [value, options]);

  // Filter countries based on search query
  const filteredCountries = useMemo(() => {
    if (!searchQuery) return options;
    return options.filter((country) =>
      country.label.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [options, searchQuery]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between bg-transparent text-white border-gray-700 hover:bg-gray-800",
            className,
          )}
        >
          {selected ? (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 opacity-70" />
              <span>{selected.label}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 opacity-70" />
              <span>Select country</span>
            </div>
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-70" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 bg-gray-900 border-gray-700 text-white">
        <Command className="bg-transparent">
          <CommandInput
            placeholder="Search country..."
            value={searchQuery}
            onValueChange={setSearchQuery}
            className="border-none focus:ring-0"
          />
          <CommandEmpty className="py-6 text-center text-sm">
            No country found.
          </CommandEmpty>
          <CommandList className="max-h-[300px]">
            <CommandGroup>
              {filteredCountries.map((country) => (
                <CommandItem
                  key={country.value}
                  value={country.value}
                  onSelect={(currentValue) => {
                    const selectedCountry = options.find(
                      (c) => c.value === currentValue,
                    );
                    if (selectedCountry) {
                      setSelected(selectedCountry);
                      onChange(selectedCountry.value);
                    }
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span className="text-lg">
                    {getCountryFlag(country.value)}
                  </span>
                  <span>{country.label}</span>
                  {selected?.value === country.value && (
                    <Check className="ml-auto h-4 w-4" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// Function to get country flag emoji from country code
function getCountryFlag(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));

  return String.fromCodePoint(...codePoints);
}
