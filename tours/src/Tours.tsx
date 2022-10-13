import { FC } from "react";
import Tour from "./Tour";
import TourType from "./TourType";

const Tours: FC<{ tours: TourType[]; removeTour: (id: string) => void }> = ({
  tours,
  removeTour,
}) => {
  return (
    <section>
      <div className="title">
        <h2>our tours</h2>
        <div className="underline"></div>
      </div>
      <div>
        {tours.map((tour) => {
          return <Tour key={tour.id} {...tour} removeTour={removeTour} />;
        })}
      </div>
    </section>
  );
};

export default Tours;
