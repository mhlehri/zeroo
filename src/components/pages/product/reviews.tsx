import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getProductReviews } from "@/services/reviews";

type Review = {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export default function Reviews({ productId }: { productId: string }) {
  const { data: reviews, isLoading } = useQuery<Review[]>({
    queryKey: ["reviews", productId],
    queryFn: () => getProductReviews(productId),
  });

  if (isLoading) {
    return <ReviewsSkeleton />;
  }

  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="mb-4 text-lg font-bold md:text-xl lg:mb-6 lg:text-2xl">
        Customer Reviews
      </h2>
      {reviews.map((review) => (
        <div key={review.id} className="border-b pb-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center">
              <h3 className="mr-2 font-semibold">{review.userName}</h3>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? "fill-current text-yellow-400"
                        : "text-primary-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <span className="text-primary-500 text-sm">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-primary-700">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}

function ReviewsSkeleton() {
  return (
    <div className="space-y-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="border-b pb-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center">
              <Skeleton className="mr-2 h-6 w-32" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="mt-2 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-2/3" />
        </div>
      ))}
    </div>
  );
}
