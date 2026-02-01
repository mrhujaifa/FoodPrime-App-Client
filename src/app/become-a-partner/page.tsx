import Navbar from "@/components/layouts/Navbar";
import PartnerShipForm from "@/components/modules/Authentication/PartnerShipForm";
import React from "react";

export default function PartnerShip() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="mt-10">
        <PartnerShipForm />
      </div>
    </div>
  );
}
