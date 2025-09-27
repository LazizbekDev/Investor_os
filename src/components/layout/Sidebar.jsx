import { NavLink } from "react-router-dom";
import {
  Home,
  GitBranch,
  FileSearch,
  Briefcase,
  Network,
  Inbox,
  Settings,
} from "lucide-react";

const navigation = [
  { name: "Morning Brief", href: "/", icon: Home },
  { name: "Pipeline", href: "/pipeline", icon: GitBranch },
  { name: "Diligence", href: "/diligence", icon: FileSearch },
  { name: "Portfolio", href: "/portfolio", icon: Briefcase },
  { name: "Network", href: "/network", icon: Network },
  { name: "Inbox & Library", href: "/inbox", icon: Inbox },
];

const secondaryNavigation = [
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        glass-sidebar w-64 flex flex-col
        fixed md:relative inset-y-0 left-0 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="flex h-14 items-center px-6 border-b border-border/50">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <span className="text-xs font-bold text-white">IO</span>
            </div>
            <span className="text-lg font-semibold text-foreground">InvestorOS</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <div className="space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                end={item.href === "/"}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50 border border-transparent hover:border-border/30"
                  }`
                }
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Secondary Navigation */}
          <div className="mt-8 pt-6 border-t border-border/50">
            <div className="space-y-1">
              {secondaryNavigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `group flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200
    ${isActive
                      ? "bg-gradient-to-r from-primary/10 to-primary/20 text-primary border-l-4 border-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"}`
                  }
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </div>

                  {/* Example badge */}
                  {item.name === "Inbox & Library" && (
                    <span className="ml-auto rounded-full bg-primary text-white text-xs px-2 py-0.5">
                      12
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-border/50">
          <div className="flex items-center gap-3 rounded-lg p-3 hover:bg-accent/50 transition-colors cursor-pointer">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-success to-warning flex items-center justify-center">
              <span className="text-xs font-medium text-white">AM</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Alex Morgan</p>
              <p className="text-xs text-muted-foreground truncate">Partner, Acme Ventures</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}