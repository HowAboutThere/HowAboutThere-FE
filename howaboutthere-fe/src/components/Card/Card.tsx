import { ReactNode } from "react";
import { Card as DefaultCard, CardHeader, CardContent } from "../ui/card";

type CardProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

export default function Card({ title, description, children }: CardProps) {
  return (
    <DefaultCard>
      <CardHeader>
        <h2>{title}</h2>
        <p className=" text-muted-foreground">{description}</p>
      </CardHeader>
      {children && <CardContent>{children}</CardContent>}
    </DefaultCard>
  );
}
