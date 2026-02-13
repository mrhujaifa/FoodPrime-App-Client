import Navbar from "@/components/layouts/Navbar";
import PartnerShipForm from "@/components/modules/Authentication/PartnerShipForm";

export default function PartnerShip() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="mt-30">
        <PartnerShipForm />
      </div>
    </div>
  );
}
