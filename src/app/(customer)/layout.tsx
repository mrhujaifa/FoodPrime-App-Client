import Footer from "@/components/layouts/Footer";
import NavbarMain from "@/components/layouts/navbar/index";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>
        {/* <Navbar /> */}
        <NavbarMain />
      </header>
      {children}

      <footer className="mt-30">
        <Footer></Footer>
      </footer>
    </div>
  );
}
