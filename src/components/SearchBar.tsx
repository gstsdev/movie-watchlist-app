import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
} from "./ui/command";
import { cn } from "@/lib/utils";
import useThrottledValue from "@/hooks/useThrottledValue";
import { Button } from "./ui/button";
import { useOnClickOutside } from "usehooks-ts";

interface SearchBarProps extends React.ComponentProps<typeof Command> {
  isLoading: boolean;
  isEmpty: boolean;
  items: {
    id: string;
    label: string;
  }[];
  itemActions: {
    icon: React.ReactNode;
    label: string;
    onClick(item: { id: string; label: string }): void;
    className?: string;
  }[];
  onSearchQueryUpdated?(search: string): void;
  onClose?(): void;
}

const SearchBar: FunctionComponent<SearchBarProps> = ({
  isLoading,
  isEmpty,
  items,
  itemActions,
  onSearchQueryUpdated: onSearch,
  onClose,
  ...props
}) => {
  const container = useRef<HTMLDivElement>(null);
  const [_searchQuery, setSearchQuery] = useState("");

  const searchQuery = useThrottledValue(_searchQuery, 500);

  const isActive = isLoading || isEmpty || items.length > 1;

  function handleFocus() {
    if (!_searchQuery || isActive) {
      return;
    }

    onSearch?.(_searchQuery);
  }

  function handleBlur() {
    onClose?.();
  }

  useEffect(() => {
    onSearch?.(searchQuery);
  }, [searchQuery, onSearch]);

  useOnClickOutside(container, handleBlur);

  return (
    <Command
      ref={container}
      {...props}
      shouldFilter={false}
      className={cn(
        "rounded-xl border",
        isActive && "shadow-md",
        props.className
      )}
    >
      <CommandInput
        placeholder="Search for a movie..."
        value={_searchQuery}
        onValueChange={setSearchQuery}
        onFocus={handleFocus}
      />
      <CommandList>
        {isLoading && (
          <CommandLoading className="justify-center">Loading...</CommandLoading>
        )}
        {isEmpty && <CommandEmpty>No results found</CommandEmpty>}
        {items.map((item) => {
          return (
            <CommandItem
              key={item.id}
              value={item.id}
              className="justify-between"
            >
              <span className="whitespace-nowrap text-ellipsis overflow-hidden max-w-[15rem]">
                {item.label}
              </span>
              <div className="flex items-center gap-1.5">
                {itemActions.map((action) => (
                  <Button
                    key={action.label}
                    variant="icon"
                    size="icon"
                    className={action.className}
                    onClick={() => {
                      action.onClick(item);
                      handleBlur();
                      setSearchQuery("");
                    }}
                  >
                    <span className="sr-only">{action.label}</span>
                    {action.icon}
                  </Button>
                ))}
              </div>
            </CommandItem>
          );
        })}
      </CommandList>
    </Command>
  );
};

export default SearchBar;
