import { Suspense } from "react";
import Gathering from "./(home)/_components/Gathering";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <Gathering />
      </Suspense>
    </main>
  );
}
