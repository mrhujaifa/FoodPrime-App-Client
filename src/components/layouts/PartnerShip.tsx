import { ChefHat, Bike } from "lucide-react";
import Link from "next/link";

const PartnerSection = () => {
  return (
    <section className=" container mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1: For Restaurants */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6 hover:shadow-lg transition-shadow">
          <div className="w-full md:w-1/3">
            <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto md:mx-0">
              <ChefHat className="text-orange-600 w-10 h-10" />
            </div>
          </div>
          <div className="w-full md:w-2/3 text-center md:text-left">
            <h3 className="text-xl font-bold text-gray-900">
              Partner with FoodPrime
            </h3>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Join our network of 500+ restaurants and grow your business with
              our delivery fleet.
            </p>
            <Link
              href={"become-a-partner"}
              className="text-orange-600 font-bold text-sm hover:underline"
            >
              Get Started &rarr;
            </Link>
          </div>
        </div>

        {/* Card 2: For Riders */}
        <div className="bg-yellow-500 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row items-center gap-6 hover:shadow-lg transition-shadow">
          <div className="w-full md:w-1/3">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto md:mx-0 backdrop-blur-sm">
              <Bike className="text-white w-10 h-10" />
            </div>
          </div>
          <div className="w-full md:w-2/3 text-center md:text-left">
            <h3 className="text-xl font-bold text-white">Become a Rider</h3>
            <p className="text-white/80 text-sm mt-2 mb-4">
              Earn money on your own schedule. Be your own boss and deliver
              smiles.
            </p>
            <Link
              href={"become-a-partner"}
              className="bg-white text-yellow-600 px-6 py-2 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
