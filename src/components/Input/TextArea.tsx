interface TextAreaProps extends React.PropsWithChildren {
  name: string;
  placeholder: string;
}

export default function TextArea({ name, placeholder }: TextAreaProps) {
  return (
    <div className="h-[120px] w-full flex-col rounded-xl bg-gray-50 px-4 py-[10px]">
      <textarea
        id={name}
        placeholder={placeholder}
        className="h-full w-full resize-none bg-gray-50 text-base font-medium leading-6 outline-none"
      />
    </div>
  );
}
