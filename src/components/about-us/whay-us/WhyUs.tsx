import { WHY_US } from "@/lib/constants";

const WhyUs = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center p-4">
      <h4 className="text-2xl font-semibold text-center">{WHY_US.title}</h4>
      <p className="text-center text-xl font-normal max-w-3xl mt-6">
        {WHY_US.description}
      </p>
    </div>
  );
};

export default WhyUs;
