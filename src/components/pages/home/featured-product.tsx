import Title from "@/components/title";
import CardCarousel from "@/components/card/card-carousel";

export default function FeaturedProducts() {
  return (
    <section>
      <Title className="mb-6">Featured Products</Title>
      <CardCarousel cardArr={[]}></CardCarousel>
    </section>
  );
}
