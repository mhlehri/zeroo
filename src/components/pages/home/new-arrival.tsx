import Title from "@/components/title";
import CardCarousel from "@/components/card/card-carousel";

export default function NewArrivalProducts() {
  return (
    <section>
      <Title className="mb-6">New Arrival</Title>
      <CardCarousel cardArr={[]}></CardCarousel>
    </section>
  );
}
