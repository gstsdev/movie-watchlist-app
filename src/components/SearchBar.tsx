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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

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

  return (
    <Command
      ref={container}
      {...props}
      shouldFilter={false}
      onBlur={(ev) =>
        (!ev.relatedTarget || !container.current?.contains(ev.relatedTarget)) &&
        handleBlur()
      }
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
              <span>{item.label}</span>
              <div className="flex items-center gap-1.5">
                {itemActions.map((action) => (
                  <TooltipProvider key={action.label}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-fit h-fit border-0 rounded-sm shrink-0",
                            action.className
                          )}
                        >
                          <span className="sr-only">{action.label}</span>
                          {action.icon}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{action.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
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
