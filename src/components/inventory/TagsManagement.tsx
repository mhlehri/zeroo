"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

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
import { Badge } from "@/components/ui/badge";
import { getTags, addTag, deleteTag } from "@/services/inventory";

const tagFormSchema = z.object({
  tag: z.string().min(1, { message: "Tag is required" }),
});

export default function TagsManagement() {
  const queryClient = useQueryClient();

  // Tags Query
  const {
    data: tags = [],
    isLoading: isTagsLoading,
    isError: isTagsError,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });

  // Tag Form
  const tagForm = useForm<z.infer<typeof tagFormSchema>>({
    resolver: zodResolver(tagFormSchema),
    defaultValues: {
      tag: "",
    },
  });

  // Add Tag Mutation
  const { mutate: addTagMutation, isPending: isAddingTag } = useMutation({
    mutationFn: addTag,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "Tag added successfully", {
          richColors: true,
        });
        queryClient.invalidateQueries({ queryKey: ["tags"] });
        tagForm.reset();
      } else {
        toast.error(data.message || "Failed to add tag", {
          richColors: true,
        });
      }
    },
    onError: (error) => {
      toast.error("An error occurred while adding the tag", {
        richColors: true,
      });
      console.error(error);
    },
  });

  // Delete Tag Mutation
  const { mutate: deleteTagMutation, isPending: isDeletingTag } = useMutation({
    mutationFn: deleteTag,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "Tag deleted successfully", {
          richColors: true,
        });
        queryClient.invalidateQueries({ queryKey: ["tags"] });
      } else {
        toast.error(data.message || "Failed to delete tag", {
          richColors: true,
        });
      }
    },
    onError: (error) => {
      toast.error("An error occurred while deleting the tag", {
        richColors: true,
      });
      console.error(error);
    },
  });

  // Submit handler
  const onSubmitTag = (values: z.infer<typeof tagFormSchema>) => {
    values.tag = values.tag.trim().toLowerCase();
    addTagMutation(values);
  };

  const handleDeleteTag = (tag: string) => {
    deleteTagMutation({ tag });
  };

  return (
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
              <Button type="submit" disabled={isAddingTag} className="w-full">
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
  );
}
