import Image from "next/image";
import { categories } from "@/constants/categoryList";

function HeaderComponent() {
  return (
    <>
      <div className="mb-10 flex flex-row items-center gap-4 px-2 tablet:px-0">
        <Image
          src="/images/mainPage/head.svg"
          width={72}
          height={72}
          className="h-auto w-auto"
          alt="head"
        />
        <div>
          <h4 className="text-2xl">모든리뷰</h4>
          <h1 className="pb-2 text-sm">밀엔메이트를 이용한 분들은 이렇게 느꼈아요!</h1>
        </div>
      </div>
      <div className="mb-2 flex justify-between border-b-2 px-2 pb-2 tablet:px-0">
        <ul className="flex gap-3 p-2 text-lg tablet:justify-between tablet:gap-4">
          {categories.map(category => (
            <li
              key={category.name}
              className="flex list-none items-center gap-[3px] border-b-2 border-transparent text-gray-400 hover:cursor-pointer"
            >
              <p>{category.name}</p>
              <Image
                src={category.disabled}
                alt={category.alt}
                width={18}
                height={20}
                className="hidden h-[20px] w-[18px] object-contain tablet:block"
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default HeaderComponent;
