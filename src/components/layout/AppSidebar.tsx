
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  BookOpen,
  CheckCircle,
  Database,
  FileSpreadsheet,
  Home,
  LineChart,
  MessagesSquare,
  PieChart,
  Plus,
  SparklesIcon,
  Zap,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuLabel,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Define the module data
const modules = [
  { id: "python", name: "Python", icon: BookOpen, progress: 75 },
  { id: "excel", name: "Excel", icon: FileSpreadsheet, progress: 42 },
  { id: "powerbi", name: "Power BI", icon: PieChart, progress: 25 },
  { id: "numpy-pandas", name: "NumPy & Pandas", icon: Database, progress: 58 },
  { id: "matplotlib-seaborn", name: "Matplotlib & Seaborn", icon: LineChart, progress: 10 },
  { id: "machine-learning", name: "Machine Learning", icon: Zap, progress: 5 },
  { id: "generative-ai", name: "Generative AI", icon: SparklesIcon, progress: 0 },
];

const AppSidebar = () => {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <Link 
          to="/" 
          className="flex items-center gap-2 px-4 py-3"
        >
          <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-skillup-teal to-skillup-purple p-[2px]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-gray-950">
              <span className="font-bold text-lg text-gradient">S</span>
            </div>
          </div>
          <span className="font-semibold text-xl">
            Skill<span className="text-skillup-teal">Up</span>
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="/"
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md",
                      location.pathname === "/"
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary/20"
                    )}
                  >
                    <Home className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="#"
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-secondary/20"
                  >
                    <CheckCircle className="h-5 w-5" />
                    <span>Completed</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="#"
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-secondary/20"
                  >
                    <BarChart3 className="h-5 w-5" />
                    <span>Statistics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-between items-center">
            <span>Learning Modules</span>
            <Button size="icon" variant="ghost" className="h-5 w-5">
              <Plus className="h-4 w-4" />
            </Button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {modules.map((module) => (
                <SidebarMenuItem key={module.id}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={`/module/${module.id}`}
                      className={cn(
                        "flex flex-col gap-1 px-3 py-2 rounded-md",
                        location.pathname === `/module/${module.id}`
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary/20"
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          <module.icon className="h-5 w-5" />
                          <span>{module.name}</span>
                        </div>
                        {module.progress === 100 && (
                          <CheckCircle className="h-4 w-4 text-skillup-green" />
                        )}
                      </div>
                      {module.progress > 0 && (
                        <Progress 
                          value={module.progress} 
                          className="h-1" 
                          indicatorClassName={cn(
                            module.progress === 100 ? "bg-skillup-green" : "bg-skillup-teal"
                          )}
                        />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="#"
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-secondary/20"
                  >
                    <MessagesSquare className="h-5 w-5" />
                    <span>Study Assistant</span>
                    <Badge className="ml-auto">New</Badge>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 mt-auto">
          <div className="rounded-lg bg-gradient-to-r from-skillup-teal/10 to-skillup-purple/10 p-4">
            <p className="text-sm font-medium mb-2">Study Streak</p>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <div className="flex justify-between text-xs mb-1">
                  <span>4 days</span>
                  <span>7 days</span>
                </div>
                <Progress value={57} className="h-2" />
              </div>
              <span className="text-lg font-bold">🔥</span>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
