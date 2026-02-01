import {
  AlertCircle,
  CheckCircle,
  Clock,
  Heart,
  MapPin,
  MessageSquare,
  Phone,
  Star,
  Bike,
  ShoppingBag,
} from "lucide-react";

export const ProfileHeader = ({ provider }) => (
  <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-8">
    <div className="flex flex-col lg:flex-row justify-between gap-8">
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
        {/* Logo */}
        <div className="w-36 h-36 rounded-2xl border-4 border-white shadow-md overflow-hidden bg-white -mt-20">
          <img
            src={
              provider?.logoUrl ||
              "https://cdn-icons-png.flaticon.com/512/1147/1147805.png"
            }
            alt="logo"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <h1 className="text-4xl font-extrabold text-[#1a1a1a] tracking-tight">
              {provider?.businessName || "Kacchi Bhai — Gulshan"}
            </h1>
            <CheckCircle size={24} className="text-blue-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-gray-600 text-sm">
                <MapPin size={16} className="text-yellow-400" />
                {provider?.address || "Road 12, Gulshan 2, Dhaka"}
              </p>
              <p className="flex items-center gap-2 text-gray-600 text-sm">
                <Phone size={16} className="text-yellow-400" />
                {provider?.phone || "+880 1234-567890"}
              </p>
            </div>
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-gray-600 text-sm font-bold">
                <Clock size={16} className="text-yellow-400" /> 11:00 AM - 10:30
                PM
              </p>
              <p className="flex items-center gap-2 text-yellow-600 text-sm font-black">
                <AlertCircle size={16} /> Get 20% off on first order!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 self-center lg:self-start">
        <button className="flex items-center gap-2 px-6 py-3 bg-yellow-300 text-black rounded-lg font-bold hover:bg-yellow-400 transition-all">
          <MessageSquare size={18} /> Chat
        </button>
        <button className="p-3 bg-gray-50 text-gray-400 rounded-lg border border-gray-100 hover:text-yellow-400 transition-all">
          <Heart size={20} />
        </button>
      </div>
    </div>

    {/* --- Quick Stats Bar (Added Here) --- */}
    <div className="flex flex-wrap gap-8 mt-8 pt-6 border-t border-gray-50">
      <div className="flex items-center gap-2">
        <div className="bg-yellow-400 p-1.5 rounded-md">
          <Star size={16} fill="white" className="text-white" />
        </div>
        <div>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">
            Rating
          </p>
          <p className="text-sm font-black">
            {provider?.rating || "4.9"} ({provider?.reviewsCount || "2k+"})
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="bg-blue-400 p-1.5 rounded-md">
          <Bike size={16} className="text-white" />
        </div>
        <div>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">
            Delivery
          </p>
          <p className="text-sm font-black">Free Delivery</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="bg-green-400 p-1.5 rounded-md">
          <ShoppingBag size={16} className="text-white" />
        </div>
        <div>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">
            Min Order
          </p>
          <p className="text-sm font-black">Tk {provider?.minOrder || "150"}</p>
        </div>
      </div>
    </div>
  </div>
);
