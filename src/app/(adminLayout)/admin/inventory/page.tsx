"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Tag, Ruler, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  getTags,
  addTag,
  deleteTag,
  getSizes,
  addSize,
  deleteSize,
} from "@/services/inventory";

const tagFormSchema = z.object({
  tag: z.string().min(1, { message: "Tag is required" }),
});

const sizeFormSchema = z.object({
  size: z.string().min(1, { message: "Size is required" }),
});

export default function InventoryPage() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("tags");

  // Tags Query
  const {
    data: tags = [],
    isLoading: isTagsLoading,
    isError: isTagsError,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });

  // Sizes Query
  const {
    data: sizes = [],
    isLoading: isSizesLoading,
    isError: isSizesError,
  } = useQuery({
    queryKey: ["sizes"],
    queryFn: getSizes,
  });

  // Tag Form
  const tagForm = useForm<z.infer<typeof tagFormSchema>>({
    resolver: zodResolver(tagFormSchema),
    defaultValues: {
      tag: "",
    },
  });

  // Size Form
  const sizeForm = useForm<z.infer<typeof sizeFormSchema>>({
    resolver: zodResolver(sizeFormSchema),
    defaultValues: {
      size: "",
    },
  });

  // Add Tag Mutation
  const { mutate: addTagMutation, isPending: isAddingTag } = useMutation({
    mutationFn: addTag,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "Tag added successfully");
        queryClient.invalidateQueries({ queryKey: ["tags"] });
        tagForm.reset();
      } else {
        toast.error(data.message || "Failed to add tag");
      }
    },
    onError: (error) => {
      toast.error("An error occurred while adding the tag");
      console.error(error);
    },
  });

  // Delete Tag Mutation
  const { mutate: deleteTagMutation, isPending: isDeletingTag } = useMutation({
    mutationFn: deleteTag,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "Tag deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["tags"] });
      } else {
        toast.error(data.message || "Failed to delete tag");
      }
    },
    onError: (error) => {
      toast.error("An error occurred while deleting the tag");
      console.error(error);
    },
  });

  // Add Size Mutation
  const { mutate: addSizeMutation, isPending: isAddingSize } = useMutation({
    mutationFn: addSize,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "Size added successfully");
        queryClient.invalidateQueries({ queryKey: ["sizes"] });
        sizeForm.reset();
      } else {
        toast.error(data.message || "Failed to add size");
      }
    },
    onError: (error) => {
      toast.error("An error occurred while adding the size");
      console.error(error);
    },
  });

  // Delete Size Mutation
  const { mutate: deleteSizeMutation, isPending: isDeletingSize } = useMutation(
    {
      mutationFn: deleteSize,
      onSuccess: (data) => {
        if (data.success) {
          toast.success(data.message || "Size deleted successfully");
          queryClient.invalidateQueries({ queryKey: ["sizes"] });
        } else {
          toast.error(data.message || "Failed to delete size");
        }
      },
      onError: (error) => {
        toast.error("An error occurred while deleting the size");
        console.error(error);
      },
    },
  );

  // Submit handlers
  const onSubmitTag = (values: z.infer<typeof tagFormSchema>) => {
    addTagMutation(values);
  };

  const onSubmitSize = (values: z.infer<typeof sizeFormSchema>) => {
    addSizeMutation(values);
  };

  const handleDeleteTag = (tag: string) => {
    deleteTagMutation({ tag });
  };

  const handleDeleteSize = (size: string) => {
    deleteSizeMutation({ size });
  };

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
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Add New Tag</CardTitle>
                <CardDescription>
                  Create a new tag for product categorization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...tagForm}>
                  <form
                    onSubmit={tagForm.handleSubmit(onSubmitTag)}
                    className="space-y-4"
                  >
                    <FormField
                      control={tagForm.control}
                      name="tag"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tag Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter tag name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={isAddingTag}
                      className="w-full"
                    >
                      {isAddingTag ? "Adding..." : "Add Tag"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Existing Tags</CardTitle>
                <CardDescription>Manage your product tags</CardDescription>
              </CardHeader>
              <CardContent>
                {isTagsLoading ? (
                  <div className="flex justify-center py-6">
                    <div className="border-primary h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"></div>
                  </div>
                ) : isTagsError ? (
                  <div className="py-6 text-center text-red-500">
                    Error loading tags
                  </div>
                ) : tags.length === 0 ? (
                  <div className="text-muted-foreground py-6 text-center">
                    No tags found
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {tags.sort().map((tag: string, index: number) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1 px-3 py-1.5"
                      >
                        {tag}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 rounded-full p-0 text-red-500 hover:bg-red-100 hover:text-red-600"
                          onClick={() => handleDeleteTag(tag)}
                          disabled={isDeletingTag}
                        >
                          <Trash2 className="h-3 w-3" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sizes">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Add New Size</CardTitle>
                <CardDescription>
                  Create a new size for product variants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...sizeForm}>
                  <form
                    onSubmit={sizeForm.handleSubmit(onSubmitSize)}
                    className="space-y-4"
                  >
                    <FormField
                      control={sizeForm.control}
                      name="size"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Size Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter size (e.g., S, M, L, XL)"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={isAddingSize}
                      className="w-full"
                    >
                      {isAddingSize ? "Adding..." : "Add Size"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Existing Sizes</CardTitle>
                <CardDescription>Manage your product sizes</CardDescription>
              </CardHeader>
              <CardContent>
                {isSizesLoading ? (
                  <div className="flex justify-center py-6">
                    <div className="border-primary h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"></div>
                  </div>
                ) : isSizesError ? (
                  <div className="py-6 text-center text-red-500">
                    Error loading sizes
                  </div>
                ) : sizes.length === 0 ? (
                  <div className="text-muted-foreground py-6 text-center">
                    No sizes found
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {sizes.sort().map((size: string, index: number) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1 px-3 py-1.5"
                      >
                        {size}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 rounded-full p-0 text-red-500 hover:bg-red-100 hover:text-red-600"
                          onClick={() => handleDeleteSize(size)}
                          disabled={isDeletingSize}
                        >
                          <Trash2 className="h-3 w-3" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
