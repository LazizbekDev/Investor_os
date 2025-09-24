import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { 
  Home, 
  GitBranch, 
  FileSearch, 
  Briefcase, 
  Network, 
  Inbox, 
  Settings,
  Plus,
  Filter,
  Download
} from "lucide-react";

const commands = [
  // Navigation
  { id: "home", label: "Go to Morning Brief", icon: Home, action: "/", group: "Navigation" },
  { id: "pipeline", label: "Go to Pipeline", icon: GitBranch, action: "/pipeline", group: "Navigation" },
  { id: "diligence", label: "Go to Diligence", icon: FileSearch, action: "/diligence", group: "Navigation" },
  { id: "portfolio", label: "Go to Portfolio", icon: Briefcase, action: "/portfolio", group: "Navigation" },
  { id: "network", label: "Go to Network", icon: Network, action: "/network", group: "Navigation" },
  { id: "inbox", label: "Go to Inbox & Library", icon: Inbox, action: "/inbox", group: "Navigation" },
  { id: "settings", label: "Go to Settings", icon: Settings, action: "/settings", group: "Navigation" },
  
  // Actions
  { id: "new-deal", label: "Add New Deal", icon: Plus, action: "new-deal", group: "Actions" },
  { id: "filter-portfolio", label: "Filter Portfolio", icon: Filter, action: "filter", group: "Actions" },
  { id: "export-data", label: "Export Data", icon: Download, action: "export", group: "Actions" },
];

export function CommandPalette({ open, onClose }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onClose();
        setTimeout(() => onClose(), 100); // Toggle behavior
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [onClose]);

  const handleCommand = (command) => {
    if (command.action.startsWith("/")) {
      navigate(command.action);
    } else {
      // Handle other actions here
      console.log("Execute action:", command.action);
    }
    onClose();
    setQuery("");
  };

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.group]) acc[cmd.group] = [];
    acc[cmd.group].push(cmd);
    return acc;
  }, {});

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="cmd-palette p-0 max-w-2xl">
        <Command>
          <CommandInput
            placeholder="Search commands or navigate..."
            value={query}
            onValueChange={setQuery}
            className="border-none focus:ring-0"
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            
            {Object.entries(groupedCommands).map(([group, commands]) => (
              <CommandGroup key={group} heading={group}>
                {commands.map((command) => (
                  <CommandItem
                    key={command.id}
                    onSelect={() => handleCommand(command)}
                    className="flex items-center gap-3 p-3 cursor-pointer"
                  >
                    <command.icon className="h-4 w-4" />
                    <span>{command.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}