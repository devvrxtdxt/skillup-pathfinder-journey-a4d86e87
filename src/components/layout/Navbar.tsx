
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, Search } from "lucide-react";
import { useCallback, useState } from "react";
import { ThemeToggle } from "../theme/theme-toggle";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SidebarTrigger } from "../ui/sidebar";
import UserAvatar from "./UserAvatar";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = useCallback(() => {
    setShowSearch((prev) => !prev);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {isMobile && (
            <SidebarTrigger>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SidebarTrigger>
          )}
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-skillup-teal to-skillup-purple p-[2px]">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-gray-950">
                <span className="font-bold text-lg text-gradient">S</span>
              </div>
            </div>
            <span className="hidden md:block font-semibold text-xl">
              Skill<span className="text-skillup-teal">Up</span>
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {!isMobile && (
            <div className="relative w-40 md:w-64 lg:w-80">
              <Input 
                type="search" 
                placeholder="Search modules..." 
                className="pl-9"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          )}

          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSearch}>
              <Search className="h-5 w-5" />
            </Button>
          )}

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <UserAvatar />
          </div>
        </div>
      </div>
      
      {isMobile && showSearch && (
        <div className="p-2 pb-3 px-4">
          <div className="relative">
            <Input 
              type="search" 
              placeholder="Search modules..." 
              className="pl-9 w-full"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
