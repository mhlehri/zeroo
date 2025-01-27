import Title from "@/components/title";
import CardCarousel from "@/components/card/card-carousel";

export default function TrendingProducts() {
  return (
    <section>
      <Title className="mb-6">Trending Now</Title>
      <CardCarousel cardArr={[]}></CardCarousel>
    </section>
  );
}
