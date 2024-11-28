import Button from "@/components/Button";

export default function ButtonTest() {
  return (
    <>
      <Button variant="primary" text="click" />
      <Button variant="secondary" text="me" />
      <Button variant="tertiary" text="please" />
      <Button variant="disabled" text="I'm done.." />

      <div className="w-24">
        <Button variant="primary" size="small" text="I'm children!" />
        <Button variant="secondary" size="small" text="yeah, me too!" />
        <Button variant="tertiary" size="small" text="It's so good~" />
        <Button variant="disabled" size="small" text="I'm sad..." />
      </div>
    </>
  );
}
