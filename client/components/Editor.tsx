import { useState, useRef } from "react";
import { DiagramRenderer } from "./DiagramRenderer";
import { DiagramTypeSelector } from "./DiagramTypeSelector";
import { Button } from "@/components/ui/button";
import { Download, Copy, RotateCcw } from "lucide-react";
import html2canvas from "html2canvas";

const EXAMPLE_DIAGRAMS: Record<string, string> = {
  flowchart: `flowchart TD
    A[Start] --> B{Is Valid?}
    B -->|Yes| C[Process Data]
    B -->|No| D[Show Error]
    C --> E[Save Result]
    D --> F[Retry]
    F --> B
    E --> G[End]`,
  sequence: `sequenceDiagram
    participant User
    participant Browser
    participant Server
    User->>Browser: Click Button
    Browser->>Server: Send Request
    Server->>Server: Process
    Server-->>Browser: Response
    Browser-->>User: Display Result`,
  class: `classDiagram
    class Animal {
      -int age
      -String name
      +void setAge()
      +void eat()
    }
    class Dog {
      +void bark()
    }
    Animal <|-- Dog`,
  state: `stateDiagram-v2
    [*] --> Idle
    Idle --> Loading: Load Data
    Loading --> Loaded: Success
    Loading --> Error: Failed
    Loaded --> Idle: Reset
    Error --> Idle: Retry`,
  erd: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER {
      int id
      string name
      string email
    }
    ORDER {
      int id
      int customer_id
      string status
    }`,
  gantt: `gantt
    title Project Timeline
    section Design
    Wireframes :des1, 2024-01-01, 10d
    Mockups :des2, after des1, 8d
    section Development
    Frontend :dev1, 2024-01-15, 20d
    Backend :dev2, 2024-01-20, 25d
    section Testing
    QA :test1, after dev1, 10d`,
};

export function Editor() {
  const [diagramType, setDiagramType] = useState<string>("flowchart");
  const [definition, setDefinition] = useState<string>(
    EXAMPLE_DIAGRAMS.flowchart
  );
  const previewRef = useRef<HTMLDivElement>(null);

  const handleTypeChange = (type: string) => {
    setDiagramType(type);
    setDefinition(EXAMPLE_DIAGRAMS[type] || "");
  };

  const handleReset = () => {
    setDefinition(EXAMPLE_DIAGRAMS[diagramType] || "");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(definition);
  };

  const handleDownload = async () => {
    if (!previewRef.current) return;

    try {
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: "#f1f5f9",
        scale: 2,
        useCORS: true,
      });

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `diagram-${diagramType}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading diagram:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              VisualMaker
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Create diagrams from text-based syntax
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Editor */}
          <div className="lg:col-span-1 space-y-4 flex flex-col">
            <div className="bg-slate-800/80 backdrop-blur rounded-xl border border-slate-700 p-6 flex flex-col flex-1 shadow-lg">
              {/* Diagram Type Selector */}
              <DiagramTypeSelector
                selectedType={diagramType}
                onTypeChange={handleTypeChange}
              />

              {/* Text Editor */}
              <div className="mt-6 flex flex-col flex-1">
                <label className="block text-sm font-semibold text-slate-300 mb-3">
                  Mermaid Syntax
                </label>
                <textarea
                  value={definition}
                  onChange={(e) => setDefinition(e.target.value)}
                  placeholder="Enter Mermaid diagram syntax here..."
                  className="flex-1 w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-600 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm resize-none"
                  spellCheck="false"
                />
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex gap-2">
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </Button>
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:col-span-2 flex flex-col">
            <div
              ref={previewRef}
              className="bg-slate-800/80 backdrop-blur rounded-xl border border-slate-700 p-6 shadow-lg h-full"
            >
              <h2 className="text-sm font-semibold text-slate-300 mb-4">
                Preview
              </h2>
              <DiagramRenderer definition={definition} diagramType={diagramType} />
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:border-primary/50 transition-colors">
            <h3 className="font-semibold text-slate-200 mb-2">Fast & Easy</h3>
            <p className="text-sm text-slate-400">
              No drag-and-drop needed—just write text and see diagrams instantly
            </p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:border-primary/50 transition-colors">
            <h3 className="font-semibold text-slate-200 mb-2">
              Version Control Friendly
            </h3>
            <p className="text-sm text-slate-400">
              Perfect for GitHub, docs, and technical documentation
            </p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:border-primary/50 transition-colors">
            <h3 className="font-semibold text-slate-200 mb-2">Multiple Types</h3>
            <p className="text-sm text-slate-400">
              Flowcharts, sequences, class diagrams, and much more
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-slate-200 mb-3">Key Features</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>Real-time diagram rendering</li>
                <li>Multiple diagram types</li>
                <li>Export functionality</li>
                <li>Clean, modern interface</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-200 mb-3">Diagram Types</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>Flowcharts</li>
                <li>Sequence Diagrams</li>
                <li>Class Diagrams</li>
                <li>State Diagrams</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-200 mb-3">Use Cases</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>Architecture documentation</li>
                <li>Process mapping</li>
                <li>System design</li>
                <li>Technical presentations</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-700 text-center text-sm text-slate-500">
            <p>
              Made with ❤️ by 
              <a href="https://yourwebsite.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style="color: #ff4d6d;">
               Tridip
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
