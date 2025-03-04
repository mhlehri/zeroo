"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tag, Ruler } from "lucide-react";
import TagsManagement from "@/components/inventory/TagsManagement";
import SizesManagement from "@/components/inventory/SizesManagement";

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState("tags");

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <p className="text-muted-foreground">Manage product tags and sizes</p>
      </div>

      <Tabs defaultValue="tags" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="tags" className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Tags
          </TabsTrigger>
          <TabsTrigger value="sizes" className="flex items-center gap-2">
            <Ruler className="h-4 w-4" />
            Sizes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tags">
          <TagsManagement />
        </TabsContent>

        <TabsContent value="sizes">
          <SizesManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
