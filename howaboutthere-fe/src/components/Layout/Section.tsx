import { HTMLAttributes } from "react";

type SectionProps = HTMLAttributes<HTMLDivElement>;
export default function Section(props: SectionProps) {
  return <section className=" w-full max-w-screen-sm p-6 mx-auto">{props.children}</section>;
}
