
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  BookOpen, Check, Download, FileSpreadsheet, LineChart, PieChart, 
  Database, SparklesIcon, Zap, CheckCircle, XCircle, 
  ClipboardList, Pencil, PlusCircle, Save, Award
} from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

// Mock data for modules
const modulesData = {
  "python": {
    id: "python",
    name: "Python",
    icon: BookOpen,
    description: "Learn Python programming basics and advanced concepts",
    progress: 75,
    topics: [
      {
        id: "p1",
        title: "Introduction to Python",
        complete: true,
        subtopics: [
          { id: "p1-1", title: "History and Features", complete: true },
          { id: "p1-2", title: "Setting Up Python Environment", complete: true },
          { id: "p1-3", title: "Basic Syntax", complete: true },
        ]
      },
      {
        id: "p2",
        title: "Data Types and Variables",
        complete: true,
        subtopics: [
          { id: "p2-1", title: "Numbers and Strings", complete: true },
          { id: "p2-2", title: "Lists, Tuples and Dictionaries", complete: true },
          { id: "p2-3", title: "Type Conversion", complete: true },
        ]
      },
      {
        id: "p3",
        title: "Control Flow",
        complete: true,
        subtopics: [
          { id: "p3-1", title: "Conditional Statements", complete: true },
          { id: "p3-2", title: "Loops", complete: true },
          { id: "p3-3", title: "Exception Handling", complete: true },
        ]
      },
      {
        id: "p4",
        title: "Functions",
        complete: true,
        subtopics: [
          { id: "p4-1", title: "Defining Functions", complete: true },
          { id: "p4-2", title: "Arguments and Return Values", complete: true },
          { id: "p4-3", title: "Lambda Functions", complete: true },
        ]
      },
      {
        id: "p5",
        title: "Object-Oriented Programming",
        complete: true,
        subtopics: [
          { id: "p5-1", title: "Classes and Objects", complete: true },
          { id: "p5-2", title: "Inheritance", complete: true },
          { id: "p5-3", title: "Polymorphism", complete: true },
        ]
      },
      {
        id: "p6",
        title: "Modules and Packages",
        complete: false,
        subtopics: [
          { id: "p6-1", title: "Creating Modules", complete: false },
          { id: "p6-2", title: "Using Packages", complete: false },
          { id: "p6-3", title: "Standard Library", complete: false },
        ]
      },
    ],
    notes: "Python is a versatile language good for web development, data science, and automation. Remember to use virtual environments for separate projects."
  },
  "excel": {
    id: "excel",
    name: "Excel",
    icon: FileSpreadsheet,
    description: "Master Excel functions, formulas and data analysis",
    progress: 42,
    topics: [
      {
        id: "e1",
        title: "Excel Basics",
        complete: true,
        subtopics: [
          { id: "e1-1", title: "Interface and Navigation", complete: true },
          { id: "e1-2", title: "Data Entry and Editing", complete: true },
          { id: "e1-3", title: "Basic Formatting", complete: true },
        ]
      },
      {
        id: "e2",
        title: "Formulas and Functions",
        complete: true,
        subtopics: [
          { id: "e2-1", title: "Basic Arithmetic Formulas", complete: true },
          { id: "e2-2", title: "SUM, AVERAGE, COUNT Functions", complete: true },
          { id: "e2-3", title: "Cell References", complete: true },
        ]
      },
      {
        id: "e3",
        title: "Intermediate Functions",
        complete: false,
        subtopics: [
          { id: "e3-1", title: "VLOOKUP and HLOOKUP", complete: true },
          { id: "e3-2", title: "IF, AND, OR Functions", complete: false },
          { id: "e3-3", title: "Date and Time Functions", complete: false },
        ]
      },
      {
        id: "e4",
        title: "Data Analysis Tools",
        complete: false,
        subtopics: [
          { id: "e4-1", title: "Sorting and Filtering", complete: false },
          { id: "e4-2", title: "PivotTables", complete: false },
          { id: "e4-3", title: "Data Validation", complete: false },
        ]
      },
    ],
    notes: "Remember to use absolute references ($A$1) when creating formulas that shouldn't change when copied to different cells."
  },
  "powerbi": {
    id: "powerbi",
    name: "Power BI",
    icon: PieChart,
    description: "Create interactive dashboards and business intelligence reports",
    progress: 25,
    topics: [
      {
        id: "pb1",
        title: "Power BI Basics",
        complete: true,
        subtopics: [
          { id: "pb1-1", title: "Interface Overview", complete: true },
          { id: "pb1-2", title: "Data Import Methods", complete: true },
          { id: "pb1-3", title: "Creating Your First Report", complete: true },
        ]
      },
      {
        id: "pb2",
        title: "Data Modeling",
        complete: false,
        subtopics: [
          { id: "pb2-1", title: "Relationships", complete: true },
          { id: "pb2-2", title: "DAX Basics", complete: false },
          { id: "pb2-3", title: "Calculated Columns", complete: false },
        ]
      },
      {
        id: "pb3",
        title: "Visualizations",
        complete: false,
        subtopics: [
          { id: "pb3-1", title: "Chart Types", complete: false },
          { id: "pb3-2", title: "Custom Visuals", complete: false },
          { id: "pb3-3", title: "Formatting Options", complete: false },
        ]
      },
    ],
    notes: ""
  },
  "numpy-pandas": {
    id: "numpy-pandas",
    name: "NumPy & Pandas",
    icon: Database,
    description: "Data manipulation and analysis with Python libraries",
    progress: 58,
    topics: [
      {
        id: "np1",
        title: "NumPy Basics",
        complete: true,
        subtopics: [
          { id: "np1-1", title: "Arrays and Vectorized Operations", complete: true },
          { id: "np1-2", title: "Array Indexing and Slicing", complete: true },
          { id: "np1-3", title: "Universal Functions", complete: true },
        ]
      },
      {
        id: "np2",
        title: "Pandas Fundamentals",
        complete: true,
        subtopics: [
          { id: "np2-1", title: "Series and DataFrames", complete: true },
          { id: "np2-2", title: "Data Selection and Manipulation", complete: true },
          { id: "np2-3", title: "Handling Missing Data", complete: true },
        ]
      },
      {
        id: "np3",
        title: "Data Cleaning",
        complete: true,
        subtopics: [
          { id: "np3-1", title: "Removing Duplicates", complete: true },
          { id: "np3-2", title: "Data Type Conversion", complete: true },
          { id: "np3-3", title: "Handling Outliers", complete: false },
        ]
      },
      {
        id: "np4",
        title: "Data Analysis",
        complete: false,
        subtopics: [
          { id: "np4-1", title: "Grouping and Aggregation", complete: true },
          { id: "np4-2", title: "Merging and Joining DataFrames", complete: false },
          { id: "np4-3", title: "Time Series Analysis", complete: false },
        ]
      },
    ],
    notes: "pandas.read_csv() for CSV files, pandas.read_excel() for Excel files. Use .head() to preview data."
  },
  "matplotlib-seaborn": {
    id: "matplotlib-seaborn",
    name: "Matplotlib & Seaborn",
    icon: LineChart,
    description: "Data visualization with Python's leading libraries",
    progress: 10,
    topics: [
      {
        id: "ms1",
        title: "Matplotlib Basics",
        complete: true,
        subtopics: [
          { id: "ms1-1", title: "Creating Basic Plots", complete: true },
          { id: "ms1-2", title: "Customizing Plots", complete: false },
          { id: "ms1-3", title: "Saving and Exporting", complete: false },
        ]
      },
      {
        id: "ms2",
        title: "Advanced Matplotlib",
        complete: false,
        subtopics: [
          { id: "ms2-1", title: "Subplots", complete: false },
          { id: "ms2-2", title: "3D Plotting", complete: false },
          { id: "ms2-3", title: "Animation", complete: false },
        ]
      },
      {
        id: "ms3",
        title: "Seaborn Introduction",
        complete: false,
        subtopics: [
          { id: "ms3-1", title: "Statistical Data Visualization", complete: false },
          { id: "ms3-2", title: "Seaborn Themes", complete: false },
          { id: "ms3-3", title: "Complex Data Relationships", complete: false },
        ]
      },
    ],
    notes: ""
  },
  "machine-learning": {
    id: "machine-learning",
    name: "Machine Learning",
    icon: Zap,
    description: "Fundamentals of machine learning algorithms and techniques",
    progress: 5,
    topics: [
      {
        id: "ml1",
        title: "Introduction to ML",
        complete: true,
        subtopics: [
          { id: "ml1-1", title: "What is Machine Learning", complete: true },
          { id: "ml1-2", title: "Types of ML", complete: false },
          { id: "ml1-3", title: "ML Workflow", complete: false },
        ]
      },
      {
        id: "ml2",
        title: "Supervised Learning",
        complete: false,
        subtopics: [
          { id: "ml2-1", title: "Linear Regression", complete: false },
          { id: "ml2-2", title: "Logistic Regression", complete: false },
          { id: "ml2-3", title: "Decision Trees", complete: false },
        ]
      },
    ],
    notes: ""
  },
  "generative-ai": {
    id: "generative-ai",
    name: "Generative AI",
    icon: SparklesIcon,
    description: "Learn about transformers, LLMs, and generative AI concepts",
    progress: 0,
    topics: [
      {
        id: "gai1",
        title: "Introduction to Generative AI",
        complete: false,
        subtopics: [
          { id: "gai1-1", title: "History of Generative Models", complete: false },
          { id: "gai1-2", title: "Types of Generative Models", complete: false },
          { id: "gai1-3", title: "Applications", complete: false },
        ]
      },
      {
        id: "gai2",
        title: "Transformers and LLMs",
        complete: false,
        subtopics: [
          { id: "gai2-1", title: "Transformer Architecture", complete: false },
          { id: "gai2-2", title: "Large Language Models", complete: false },
          { id: "gai2-3", title: "Fine-tuning", complete: false },
        ]
      },
    ],
    notes: ""
  }
};

const getModuleIcon = (moduleId: string) => {
  switch (moduleId) {
    case "python": return BookOpen;
    case "excel": return FileSpreadsheet;
    case "powerbi": return PieChart;
    case "numpy-pandas": return Database;
    case "matplotlib-seaborn": return LineChart;
    case "machine-learning": return Zap;
    case "generative-ai": return SparklesIcon;
    default: return BookOpen;
  }
};

const ModulePage = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { toast } = useToast();
  
  const [notes, setNotes] = useState("");
  const [editingNotes, setEditingNotes] = useState(false);
  const [topics, setTopics] = useState<any[]>([]);
  const [module, setModule] = useState<any>(null);
  
  // Initialize module data
  useState(() => {
    if (moduleId && modulesData[moduleId as keyof typeof modulesData]) {
      const moduleData = modulesData[moduleId as keyof typeof modulesData];
      setModule(moduleData);
      setTopics(moduleData.topics);
      setNotes(moduleData.notes || "");
    }
  });

  if (!module) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Module not found</h2>
        <p className="mb-4">The module you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/">Return to Dashboard</Link>
        </Button>
      </div>
    );
  }

  const ModuleIcon = getModuleIcon(moduleId || "");
  const completedTopics = module.topics.filter((t: any) => t.complete).length;
  const totalTopics = module.topics.length;
  const progress = Math.round((completedTopics / totalTopics) * 100) || 0;
  
  const completedSubtopics = module.topics.flatMap((t: any) => t.subtopics).filter((s: any) => s.complete).length;
  const totalSubtopics = module.topics.flatMap((t: any) => t.subtopics).length;
  
  const handleSaveNotes = () => {
    toast({
      title: "Notes saved",
      description: "Your notes have been saved successfully",
    });
    setEditingNotes(false);
  };

  const handleToggleComplete = (topicId: string, subtopicId?: string) => {
    // In a real app, this would update the database
    toast({
      title: "Progress updated",
      description: "Your progress has been updated successfully",
    });
  };
  
  const downloadReport = () => {
    toast({
      title: "Report downloading",
      description: "Your progress report is being prepared for download",
    });
  };

  return (
    <div className="container mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Button variant="outline" size="icon" asChild>
              <Link to="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">{module.name}</h1>
            <div className="bg-primary/10 p-2 rounded-full">
              <ModuleIcon className="h-6 w-6 text-primary" />
            </div>
          </div>
          <p className="text-muted-foreground">{module.description}</p>
        </div>
        
        <div>
          <Button variant="outline" size="sm" className="mr-2" onClick={downloadReport}>
            <Download className="h-4 w-4 mr-1" />
            Export Progress
          </Button>
        </div>
      </div>

      {/* Module Progress Overview */}
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle>Progress Overview</CardTitle>
          <CardDescription>
            {completedTopics} of {totalTopics} topics completed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Topics Progress</span>
                <span className="text-sm font-medium">{progress}%</span>
              </div>
              <Progress
                value={progress}
                className="h-2"
                indicatorClassName={progress === 100 ? "bg-skillup-green" : ""}
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Subtopics Progress</span>
                <span className="text-sm font-medium">{Math.round((completedSubtopics / totalSubtopics) * 100)}%</span>
              </div>
              <Progress
                value={(completedSubtopics / totalSubtopics) * 100}
                className="h-2"
              />
            </div>
            
            <div className="pt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/50">
                <span className="text-2xl font-bold">{completedTopics}</span>
                <span className="text-xs text-muted-foreground">Topics Completed</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/50">
                <span className="text-2xl font-bold">{totalTopics - completedTopics}</span>
                <span className="text-xs text-muted-foreground">Topics Remaining</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/50">
                <span className="text-2xl font-bold">{completedSubtopics}</span>
                <span className="text-xs text-muted-foreground">Subtopics Completed</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/50">
                <span className="text-2xl font-bold">{totalSubtopics - completedSubtopics}</span>
                <span className="text-xs text-muted-foreground">Subtopics Remaining</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Module Content Tabs */}
      <Tabs defaultValue="topics" className="mb-8">
        <TabsList>
          <TabsTrigger value="topics">
            <ClipboardList className="h-4 w-4 mr-2" />
            Topics
          </TabsTrigger>
          <TabsTrigger value="notes">
            <Pencil className="h-4 w-4 mr-2" />
            Notes
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="topics">
          <Card>
            <CardHeader>
              <CardTitle>Module Topics</CardTitle>
              <CardDescription>Mark topics as complete as you progress through your learning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {topics.map((topic) => (
                  <div key={topic.id} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id={`topic-${topic.id}`} 
                        checked={topic.complete}
                        onCheckedChange={() => handleToggleComplete(topic.id)}
                      />
                      <label 
                        htmlFor={`topic-${topic.id}`}
                        className={cn(
                          "text-lg font-medium cursor-pointer",
                          topic.complete && "line-through text-muted-foreground"
                        )}
                      >
                        {topic.title}
                      </label>
                      {topic.complete && (
                        <span className="ml-auto text-skillup-green">
                          <CheckCircle className="h-5 w-5" />
                        </span>
                      )}
                    </div>
                    
                    <div className="ml-6 space-y-2">
                      {topic.subtopics.map((subtopic: any) => (
                        <div key={subtopic.id} className="flex items-center gap-2">
                          <Checkbox 
                            id={`subtopic-${subtopic.id}`} 
                            checked={subtopic.complete}
                            onCheckedChange={() => handleToggleComplete(topic.id, subtopic.id)}
                          />
                          <label 
                            htmlFor={`subtopic-${subtopic.id}`}
                            className={cn(
                              "text-sm cursor-pointer",
                              subtopic.complete && "line-through text-muted-foreground"
                            )}
                          >
                            {subtopic.title}
                          </label>
                          {subtopic.complete ? (
                            <CheckCircle className="ml-auto h-4 w-4 text-skillup-green" />
                          ) : (
                            <XCircle className="ml-auto h-4 w-4 text-muted-foreground/30" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notes">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Notes</CardTitle>
                <CardDescription>Keep track of important information</CardDescription>
              </div>
              {editingNotes ? (
                <Button onClick={handleSaveNotes} size="sm">
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </Button>
              ) : (
                <Button onClick={() => setEditingNotes(true)} variant="outline" size="sm">
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {editingNotes ? (
                <Textarea 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add your notes about this module..."
                  className="min-h-[200px]"
                />
              ) : (
                <div className="bg-muted/30 rounded-md p-4 min-h-[200px]">
                  {notes ? (
                    <p>{notes}</p>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                      <Pencil className="h-8 w-8 mb-2 opacity-20" />
                      <p>No notes yet. Click edit to add some.</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Achievements Section */}
      {progress > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className={cn("border", progress >= 25 ? "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-amber-200 dark:border-amber-800" : "opacity-50")}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Beginner</span>
                  <Award className={cn("h-6 w-6", progress >= 25 ? "text-amber-500" : "text-muted-foreground")} />
                </CardTitle>
                <CardDescription>Complete 25% of the module</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className={cn("border", progress >= 50 ? "bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 border-slate-200 dark:border-slate-800" : "opacity-50")}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Intermediate</span>
                  <Award className={cn("h-6 w-6", progress >= 50 ? "text-slate-500" : "text-muted-foreground")} />
                </CardTitle>
                <CardDescription>Complete 50% of the module</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className={cn("border", progress >= 100 ? "bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-yellow-950 dark:to-amber-900 border-yellow-200 dark:border-yellow-800" : "opacity-50")}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Master</span>
                  <Award className={cn("h-6 w-6", progress >= 100 ? "text-yellow-500" : "text-muted-foreground")} />
                </CardTitle>
                <CardDescription>Complete 100% of the module</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModulePage;
