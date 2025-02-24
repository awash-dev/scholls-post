"use client";

import * as React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { List, ListItem } from "@mui/material";
import { ChevronDown, User, ClipboardList, UserRound } from "lucide-react";

interface RovingIndexOptions {
  initialActiveIndex?: number;
  vertical?: boolean;
  handlers?: {
    onKeyDown?: (event: React.KeyboardEvent, fns: { setActiveIndex: React.Dispatch<React.SetStateAction<number>> }) => void;
  };
}

const useRovingIndex = (options?: RovingIndexOptions) => {
  const {
    initialActiveIndex = 0,
    vertical = false,
    handlers = { onKeyDown: () => {} },
  } = options || {};
  const [activeIndex, setActiveIndex] = React.useState<number>(initialActiveIndex);
  const targetRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const targets = targetRefs.current;

  const focusNext = () => {
    let newIndex = activeIndex + 1;
    if (newIndex >= targets.length) {
      newIndex = 0;
    }
    targets[newIndex]?.focus();
    setActiveIndex(newIndex);
  };

  const focusPrevious = () => {
    let newIndex = activeIndex - 1;
    if (newIndex < 0) {
      newIndex = targets.length - 1;
    }
    targets[newIndex]?.focus();
    setActiveIndex(newIndex);
  };

  const getTargetProps = (index: number) => ({
    ref: (ref: HTMLButtonElement | null) => {
      if (ref) {
        targets[index] = ref;
      }
    },
    tabIndex: activeIndex === index ? 0 : -1,
    onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === (vertical ? "ArrowDown" : "ArrowRight")) {
        focusNext();
      }
      if (event.key === (vertical ? "ArrowUp" : "ArrowLeft")) {
        focusPrevious();
      }
      handlers.onKeyDown?.(event, { setActiveIndex });
    },
    onClick: () => {
      setActiveIndex(index);
    },
  });

  return {
    activeIndex,
    setActiveIndex,
    targets,
    getTargetProps,
    focusNext,
    focusPrevious,
  };
};

interface MenuProps {
  focusNext: () => void;
  focusPrevious: () => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  label: string;
  items: { icon: React.ReactNode; label: string }[];
}

const Menu = React.forwardRef<HTMLButtonElement, MenuProps>(
  ({ focusNext, focusPrevious, label, items, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const { targets, setActiveIndex, getTargetProps } = useRovingIndex({
      initialActiveIndex: 0,
      vertical: true,
      handlers: {
        onKeyDown: (event, fns) => {
          if (event.key.match(/(ArrowDown|ArrowUp|ArrowLeft|ArrowRight)/)) {
            event.preventDefault();
          }
          if (event.key === "Tab") {
            setIsOpen(false);
            setActiveIndex(0);
          }
          if (event.key === "ArrowLeft") {
            setIsOpen(false);
            focusPrevious();
          }
          if (event.key === "ArrowRight") {
            setIsOpen(false);
            focusNext();
          }
        },
      },
    });

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key.match(/(ArrowLeft|ArrowRight|Tab)/)) {
        setIsOpen(false);
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        targets[0]?.focus();
        setActiveIndex(0);
      }
      props.onKeyDown?.(event);
    };

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            aria-haspopup
            aria-expanded={isOpen ? "true" : "false"}
            ref={ref}
            {...props}
            role="menuitem"
            onKeyDown={handleKeyDown}
            onFocus={(event) => setIsOpen(true)}
            onMouseEnter={(event) => {
              props.onMouseEnter?.(event);
              setIsOpen(true);
            }}
          >
            {label} <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-2">
          <List>
            {items.map((item, index) => (
              <ListItem key={index}>
                <Button
                  role="menuitem"
                  {...getTargetProps(index)}
                  className="w-full justify-start"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon} {item.label}
                </Button>
              </ListItem>
            ))}
          </List>
        </PopoverContent>
      </Popover>
    );
  }
);

export default function ExampleNavigationMenu() {
  const { getTargetProps, focusNext, focusPrevious } = useRovingIndex();

  return (
    <div className="flex justify-center w-full h-[80px]">
      <List className="flex gap-4">
        <ListItem>
          <Menu
            focusNext={focusNext}
            focusPrevious={focusPrevious}
            label="Student"
            items={[
              { icon: <User className="mr-2 h-4 w-4" />, label: "Add a student" },
              { icon: <ClipboardList className="mr-2 h-4 w-4" />, label: "Attendance" },
            ]}
          />
        </ListItem>
        <ListItem>
          <Menu
            focusNext={focusNext}
            focusPrevious={focusPrevious}
            label="Teacher"
            items={[
              { icon: <User className="mr-2 h-4 w-4" />, label: "Add a teacher" },
              { icon: <ClipboardList className="mr-2 h-4 w-4" />, label: "Attendance" },
            ]}
          />
        </ListItem>
        <ListItem>
          <Button
            role="menuitem"
            {...getTargetProps(2)}
            className="flex items-center"
          >
            <UserRound className="mr-2 h-4 w-4" />
            Profile
          </Button>
        </ListItem>
      </List>
    </div>
  );
}
