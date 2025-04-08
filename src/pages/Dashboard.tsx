
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, FileSpreadsheet, LineChart, BarChart3, PieChart, Database, Zap, SparklesIcon, CheckCircle, Clock, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

// Define mock data for the modules
const modules = [
  {
    id: "python",
    name: "Python",
    description: "Learn Python programming basics and advanced concepts",
    progress: 75,
    topics: 18,
    completedTopics: 14,
    icon: BookOpen,
    color: "bg-blue-500",
  },
  {
    id: "excel",
    name: "Excel",
    description: "Master Excel functions, formulas and data analysis",
    progress: 42,
    topics: 15,
    completedTopics: 6,
    icon: FileSpreadsheet,
    color: "bg-green-500",
  },
  {
    id: "powerbi",
    name: "Power BI",
    description: "Create interactive dashboards and business intelligence reports",
    progress: 25,
    topics: 12,
    completedTopics: 3,
    icon: PieChart,
    color: "bg-yellow-500",
  },
  {
    id: "numpy-pandas",
    name: "NumPy & Pandas",
    description: "Data manipulation and analysis with powerful Python libraries",
    progress: 58,
    topics: 14,
    completedTopics: 8,
    icon: Database,
    color: "bg-purple-500",
  },
  {
    id: "matplotlib-seaborn",
    name: "Matplotlib & Seaborn",
    description: "Data visualization with Python's leading libraries",
    progress: 10,
    topics: 10,
    completedTopics: 1,
    icon: LineChart,
    color: "bg-red-500",
  },
  {
    id: "machine-learning",
    name: "Machine Learning",
    description: "Fundamentals of machine learning algorithms and techniques",
    progress: 5,
    topics: 20,
    completedTopics: 1,
    icon: Zap,
    color: "bg-orange-500",
  },
  {
    id: "generative-ai",
    name: "Generative AI",
    description: "Learn about transformers, LLMs, and generative AI concepts",
    progress: 0,
    topics: 15,
    completedTopics: 0,
    icon: SparklesIcon,
    color: "bg-indigo-500",
  },
];

// Stats for the user
const stats = [
  {
    title: "Weekly Goal",
    value: "60%",
    description: "3/5 study days",
    icon: Calendar,
    color: "text-skillup-teal",
  },
  {
    title: "Total Learning",
    value: "32hrs",
    description: "+2.5hrs this week",
    icon: Clock,
    color: "text-skillup-purple",
  },
  {
    title: "Topics Completed",
    value: "33",
    description: "of 104 total topics",
    icon: CheckCircle,
    color: "text-skillup-green",
  },
  {
    title: "Consistency",
    value: "85%",
    description: "Last 30 days",
    icon: BarChart3,
    color: "text-skillup-yellow",
  },
];

const Dashboard = () => {
  return (
    <div className="container mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Ryan!</h1>
        <p className="text-muted-foreground">Track your progress and continue your learning journey</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="border">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{stat.title}</CardTitle>
                <stat.icon className={cn("h-5 w-5", stat.color)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <CardDescription>{stat.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Continue Learning Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Continue Learning</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules
            .filter((module) => module.progress > 0 && module.progress < 100)
            .slice(0, 3)
            .map((module) => (
              <Link to={`/module/${module.id}`} key={module.id} className="block group">
                <Card className="border h-full transition-all group-hover:shadow-md overflow-hidden">
                  <CardHeader className={cn("pb-2 relative", module.color)}>
                    <div className="absolute inset-0 opacity-20"></div>
                    <div className="relative z-10 flex justify-between">
                      <CardTitle className="text-lg text-white">{module.name}</CardTitle>
                      <module.icon className="h-5 w-5 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm font-medium">{module.progress}%</span>
                    </div>
                    <Progress value={module.progress} className="h-2 mb-3" />
                    <CardDescription className="text-xs">
                      {module.completedTopics} of {module.topics} topics completed
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="border-t pt-3 pb-3 bg-muted/30">
                    <Button variant="default" className="w-full" size="sm">
                      Continue
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
        </div>
      </div>
      
      {/* All Modules */}
      <h2 className="text-2xl font-semibold mb-4">All Modules</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((module) => (
          <Link to={`/module/${module.id}`} key={module.id} className="block group">
            <Card className="border h-full transition-all group-hover:shadow-md overflow-hidden">
              <CardHeader className={cn("pb-2", module.color)}>
                <div className="absolute inset-0 opacity-20"></div>
                <div className="flex justify-between">
                  <CardTitle className="text-lg text-white">{module.name}</CardTitle>
                  <module.icon className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <CardDescription className="mb-3">{module.description}</CardDescription>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm font-medium">{module.progress}%</span>
                </div>
                <Progress 
                  value={module.progress} 
                  className="h-2" 
                  indicatorClassName={
                    module.progress === 100 ? "bg-skillup-green" : ""
                  }
                />
                <div className="mt-3 text-xs text-muted-foreground">
                  {module.completedTopics} of {module.topics} topics completed
                </div>
              </CardContent>
              <CardFooter className="border-t pt-3 pb-3 bg-muted/30">
                <Button variant={module.progress > 0 ? "default" : "outline"} className="w-full" size="sm">
                  {module.progress > 0 ? "Continue" : "Start Learning"}
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Helper function imported from utils
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

export default Dashboard;
