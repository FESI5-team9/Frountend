import { Suspense } from "react";
import FilterSection from "./(home)/_components/FilterSection";
import GatheringClient from "./(home)/_components/GatheringClient";
import HeroSection from "./(home)/_components/HeroSection";
import SelectedType from "./(home)/_components/SelectedType";
import SKGatheringPage from "./(home)/_components/Skeleton/SKGatheringPage";

export default async function Home() {
  return (
    <main className="mx-auto flex w-full max-w-[1200px] flex-col px-2 py-[59px] tablet:w-[744px] tablet:justify-start tablet:px-1.5 desktop:w-[1200px] desktop:px-0">
      <HeroSection />
      <Suspense fallback={<SKGatheringPage />}>
        <SelectedType />
        <FilterSection />
        <GatheringClient />
      </Suspense>
    </main>
  );
}
