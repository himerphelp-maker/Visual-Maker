import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

interface DiagramRendererProps {
  definition: string;
  diagramType: string;
}

export function DiagramRenderer({ definition, diagramType }: DiagramRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!containerRef.current || !definition.trim()) {
        setError(null);
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
        }
        return;
      }

      try {
        setError(null);
        // Configure mermaid
        mermaid.initialize({ startOnLoad: false, theme: "default", securityLevel: "loose" });

        // Clear previous diagram
        containerRef.current.innerHTML = "";

        // Create a unique ID for this diagram
        const diagramId = `mermaid-${Date.now()}`;

        // Render the diagram
        const { svg } = await mermaid.render(diagramId, definition);

        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to render diagram"
        );
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
        }
      }
    };

    renderDiagram();
  }, [definition, diagramType]);

  return (
    <div className="h-full flex flex-col">
      <div
        ref={containerRef}
        className="flex-1 overflow-auto bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 flex items-center justify-center"
      >
        {!definition.trim() && !error && (
          <div className="text-center">
            <p className="text-slate-400 dark:text-slate-500">
              Enter Mermaid syntax to preview diagram
            </p>
          </div>
        )}
      </div>
      {error && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg animate-slide-in">
          <p className="text-sm font-medium text-red-800 dark:text-red-300">
            Error rendering diagram:
          </p>
          <p className="text-sm text-red-700 dark:text-red-400 mt-1 font-mono break-words">
            {error}
          </p>
        </div>
      )}
    </div>
  );
}
