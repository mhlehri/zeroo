import ax from "@/lib/axios-instance";

export async function getProductReviews(productId: string) {
  const response = await ax.get(`/reviews/${productId}`);
  return response.data;
}

export async function addReview({
  productId,
  rating,
  comment,
}: {
  productId: string;
  rating: number;
  comment: string;
}) {
  const response = await ax.post(`/reviews/${productId}`, {
    rating,
    comment,
  });
  return response.data;
}
