import Button from "@/components/Button/Button";

export default function ButtonTest() {
  return (
    <div className="flex w-full flex-col gap-2 pt-2">
      <Button color="yellow">노란 버튼</Button>
      <Button color="orange">주황 버튼</Button>
      <div className="flex w-24 flex-col gap-2">
        <Button color="red" size="small">
          빨간 버튼
        </Button>
        <Button color="disabled" size="small">
          disabled button
        </Button>
        <Button color="yellow" size="small" isFilled={false}>
          노란 버튼
        </Button>
        <Button color="orange" size="small" isFilled={false}>
          주황 버튼
        </Button>
      </div>
      <Button color="red" isFilled={false}>
        빨간 버튼
      </Button>
      <Button color="disabled" isFilled={false}>
        disabled button
      </Button>

      <Button className="bg-gray-400 text-black">커스텀 회색 버튼</Button>
      <Button className="bg-purple-300 text-cyan-400">커스텀 보라색 버튼</Button>
    </div>
  );
}
