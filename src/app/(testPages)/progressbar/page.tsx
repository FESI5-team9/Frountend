import Progressbar from "@/components/Progressbar";

export default function Page() {
  return (
    <div className="flex h-[100vh] items-center justify-center">
      <div className="w-[200px]">
        <Progressbar now={10} max={20} />
        <div>프로그레스바</div>
      </div>
    </div>
  );
}
