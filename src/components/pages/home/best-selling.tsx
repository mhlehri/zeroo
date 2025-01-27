import Title from "@/components/title";
import CardCarousel from "@/components/card/card-carousel";

export default function BestSellingProducts() {
  return (
    <section>
      <Title className="mb-6">Best Selling Products</Title>
      <CardCarousel cardArr={[]}></CardCarousel>
    </section>
  );
}
