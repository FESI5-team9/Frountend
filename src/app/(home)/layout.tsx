import FilterSection from "./_components/FilterSection";
import HeroSection from "./_components/HeroSection";
import SelectedType from "./_components/SelectedType";

function homeRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="mx-auto flex w-full max-w-[1200px] flex-col justify-between px-2 py-[59px] tablet:w-[744px] tablet:justify-start tablet:px-1.5 desktop:w-[1200px] desktop:px-0">
        <HeroSection />
        <SelectedType />
        <FilterSection />
        <div>{children}</div>
      </main>
    </>
  );
}
export default homeRootLayout;
