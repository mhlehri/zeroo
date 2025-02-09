import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addReview } from "@/services/reviews";
import { toast } from "sonner";

export default function AddReviewForm({ productId }: { productId: string }) {
  const [rating, setRating] = useState(0);

  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast.success("Review submitted", {
        description: "Thank you for your feedback!",
      });
      setRating(0);
      setComment("");
    },
    onError: () => {
      toast.error("Error", {
        description: "Failed to submit review. Please try again.",
        richColors: true,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Error", {
        description: "Please select a rating.",
        richColors: true,
      });
      return;
    }
    mutation.mutate({ productId, rating, comment });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <h3 className="text-lg font-semibold">Add Your Review</h3>
      <div>
        <label className="mb-2 block">Your Rating</label>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              className="mr-1"
            >
              <Star
                className={`h-6 w-6 ${
                  value <= rating
                    ? "fill-current text-yellow-400"
                    : "text-primary-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="comment" className="mb-2 block">
          Your Review
        </label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review here..."
          rows={4}
        />
      </div>
      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
