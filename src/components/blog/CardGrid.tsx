import { CardProps } from "@/shared/types";
import { Lang } from "@/utils/i18n";
import { Post } from "contentlayer/generated";
import { BitCard } from "./BitCard";
import { Item } from "./Item";

interface CardGridProps {
  children?: React.ReactNode;
  lang: Lang;
}


export const CardGrid:React.FC<CardGridProps> = ({children, lang}) => {
  return <div className="grid gap-6 row-gap-5 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 -mb-6">
  {children}
  </div>;
}
