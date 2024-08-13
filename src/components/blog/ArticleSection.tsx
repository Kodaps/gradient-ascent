import { renderMarkdown } from "@/lib/content"
import { Lang } from "@/lib/i18n"
import { isEmbed, ParagraphSwitcher } from "./ParagraphSwitcher";

interface ParagraphProps {
  paragraph: string,
  lang: Lang
}


export const ArticleSection:React.FC<ParagraphProps> = ({paragraph, lang}) => {

  const textBits = paragraph.split(/\n/);

  const bits = [];

  let currentBits:Array<string> = [];

  while(textBits.length > 0) {

    let bit = textBits.shift();
    if (bit == "") {
      currentBits.push(bit);
      continue;
    }

    if (!bit) {
      continue;
    }

    if (isEmbed(bit)) {
      bits.push(currentBits.join('\n'));
      bits.push(bit);
      currentBits = [];
    } else {
      currentBits.push(bit);
    }

  }

  if (currentBits.length > 0) {
    bits.push(currentBits.join('\n'));
  }

  return <div>
    {bits.map((bit, index) => <ParagraphSwitcher key={index} paragraph={bit} lang={lang} />)}  
  </div>
}
