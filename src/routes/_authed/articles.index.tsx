import { createFileRoute } from '@tanstack/react-router';
import { fetchArticles } from '~/utils/articles';
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { StrictMode, useState } from 'react';

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

// Define the route and loader
export const Route = createFileRoute('/_authed/articles/')({
  loader: async () => {
    // Return the articles directly
    return await fetchArticles();
  },
  component: RouteComponent,
})

// Row Data Interface
interface IRow {
  id: string;
  title: string;
  category: string;
  content: string;
  createdAt?: string;
}

const ArticleGrid = () => {
  // Get data directly from the loader
  const articles = Route.useLoaderData() as IRow[];
  
  // Column Definitions - define what fields to display
  const [colDefs] = useState<ColDef<IRow>[]>([
    { field: "title", flex: 1 },
    { field: "category", flex: 1 },
    { field: "content", flex: 3 },
    { field: "createdAt", flex: 1},

  ]);

  // Default column configuration
  const defaultColDef: ColDef = {
    flex: 1,
    sortable: true,
    filter: true,
    resizable: true,
  };

  // Container with grid component
  return (
    <div className="ag-theme-alpine" style={{ width: "100%", height: "500px" }}>
      <AgGridReact
        rowData={articles}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
}

function RouteComponent() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Smooth Brain Knowledgebase</h1>
      <StrictMode>
        <ArticleGrid />
      </StrictMode>
    </div>
  )
}

export default RouteComponent;