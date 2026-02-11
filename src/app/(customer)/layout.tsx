import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      {children}

      <footer className="mt-30">
        <Footer></Footer>
      </footer>
    </div>
  );
}
