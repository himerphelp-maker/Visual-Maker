import { Button } from "@/components/ui/button";
import { Zap, Shuffle, Grid3x3, ArrowRight, Database, Calendar, Users } from "lucide-react";

interface DiagramTypeSelectorProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

export function DiagramTypeSelector({
  selectedType,
  onTypeChange,
}: DiagramTypeSelectorProps) {
  const diagramTypes = [
    {
      id: "flowchart",
      name: "Flowchart",
      icon: Zap,
      description: "Sequential processes and decision flows",
    },
    {
      id: "sequence",
      name: "Sequence",
      icon: ArrowRight,
      description: "Interactions over time",
    },
    {
      id: "class",
      name: "Class",
      icon: Grid3x3,
      description: "Object-oriented structures",
    },
    {
      id: "state",
      name: "State",
      icon: Shuffle,
      description: "System states and transitions",
    },
    {
      id: "erd",
      name: "Entity-Relationship",
      icon: Database,
      description: "Database structures",
    },
    {
      id: "gantt",
      name: "Gantt",
      icon: Calendar,
      description: "Project timelines",
    },
  ];

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
        Diagram Type
      </label>
      <div className="grid grid-cols-2 gap-2">
        {diagramTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => onTypeChange(type.id)}
              className={`
                flex items-center gap-2 px-3 py-2.5 rounded-lg border-2 transition-all
                ${
                  selectedType === type.id
                    ? "border-primary bg-primary/10 text-primary dark:text-primary"
                    : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                }
              `}
              title={type.description}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{type.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
