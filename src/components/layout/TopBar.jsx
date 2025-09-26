import { Bell, Search, ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../../hooks/use-notifications";


export function TopBar({ onOpenCommandPalette, onToggleSidebar }) {
  const navigate = useNavigate();
  const { notifications, isLoading } = useNotifications();
  return (
    <header className="glass-nav h-14 flex items-center justify-between px-4 md:px-6">
      {/* Mobile Menu & Title */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={onToggleSidebar}
        >
          <Menu className="h-4 w-4" />
        </Button>
        <h1 className="text-lg font-semibold text-foreground">Morning Brief</h1>
      </div>

      {/* Center - Search Bar */}
      <div className="flex-1 max-w-md mx-4 md:mx-8 hidden sm:block">
        <Button
          variant="outline"
          className="w-full justify-start text-muted-foreground bg-input/50 border-border/30 hover:bg-input"
          onClick={onOpenCommandPalette}
        >
          <Search className="h-4 w-4 mr-2" />
          <span className="hidden md:inline">Search or type a command...</span>
          <span className="md:hidden">Search...</span>
          <div className="ml-auto flex items-center gap-1">
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border/40 bg-border/20 px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              ⌘K
            </kbd>
          </div>
        </Button>
      </div>

      {/* Mobile Search Button */}
      <Button
        variant="ghost"
        size="sm"
        className="sm:hidden"
        onClick={onOpenCommandPalette}
      >
        <Search className="h-4 w-4" />
      </Button>

      {/* Right Side Actions */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Organization Switcher */}
        <Button variant="ghost" size="sm" className="gap-2 text-sm hidden md:flex">
          <span className="hidden lg:inline">Acme Ventures</span>
          <span className="lg:hidden">Acme</span>
          <ChevronDown className="h-3 w-3" />
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative" onClick={() => navigate('/notifications')}>
          <Bell className="h-4 w-4" />
          {!isLoading && notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-warning rounded-full text-[10px] font-medium flex items-center justify-center text-warning-foreground">
              {notifications.length}
            </span>
          )}

        </Button>

        {/* Profile */}
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-success to-warning flex items-center justify-center cursor-pointer" onClick={() => navigate('/profile')}>
          <span className="text-xs font-medium text-white">AM</span>
        </div>
      </div>
    </header>
  );
}