import Button from "@/components/Button/Button";

export default function ButtonTest() {
  return (
    <>
      <Button variant="primary" />
      <Button variant="secondary" />
      <Button variant="tertiary" />
      <Button variant="disabled" />

      <div className="w-24">
        <Button variant="primary" size="small" />
        <Button variant="secondary" size="small" />
        <Button variant="tertiary" size="small" />
        <Button variant="disabled" size="small" />
      </div>
    </>
  );
}
