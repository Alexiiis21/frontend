"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import fetchTasks, { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Task } from "@/files/file";


export function Menu() {
  const [recentTasks, setRecentTasks] = useState<Task[]>([]);

  useEffect(() => {
    const getRecentTasks = async () => {
      const tasks = await fetchTasks();
      const sortedTasks = tasks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setRecentTasks(sortedTasks.slice(0, 3));
    };

    getRecentTasks();
  }, []);

  return (
    <NavigationMenu className="">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-base">Mis tareas</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[100px] lg:w-[200px] lg:grid-cols-[1fr]">
              <li className="row-span-3 flex items-center">
                <Link href="/dashboard" className="flex items-center text-primary font-semibold">
                  Ver todas
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </li>
              {recentTasks.map(task => (
                <ListItem key={task.id} title={task.title}>
                  <span className="font-semibold">
                  {task.description}
                  </span>
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";