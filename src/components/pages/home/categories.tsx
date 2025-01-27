import Title from "@/components/title";
import CardCarousel from "@/components/card/card-carousel";

export default function Categories() {
  return (
    <section>
      <Title className="mb-6">Categories</Title>
      <CardCarousel cardArr={[]}></CardCarousel>
    </section>
  );
}
