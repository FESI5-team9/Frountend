import FilterSection from "./(home)/_components/FilterSection";
import HeroSection from "./(home)/_components/HeroSection";
import SelectedType from "./(home)/_components/SelectedType";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-[1200px] flex-col px-2 py-[59px] tablet:w-[744px] tablet:justify-start tablet:px-1.5 desktop:w-[1200px] desktop:px-0">
      <HeroSection />
      <SelectedType />
      <FilterSection />
      {/* <GatheringServer /> */}
    </main>
  );
}
