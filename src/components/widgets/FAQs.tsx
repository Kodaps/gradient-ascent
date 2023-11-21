import { IconArrowDownRight } from '@tabler/icons-react';
import { faqsData } from '@/shared/data';
import { FAQItems } from '@/shared/types';
import { renderMarkdown } from '@/utils/posts';
import HeaderWidget from '../common/HeaderWidget';




const FAQs:React.FC<FAQItems> = ({items}) => {

  const { header } = faqsData;

  return (
    <section id="faqsOne">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {header && <HeaderWidget header={header} titleClassname="text-3xl sm:text-4xl" />}
        <div className="max-w-screen-xl sm:mx-auto">
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 lg:gap-x-16">
            {items.map(({ question, answer }, index) => (
              <div className="space-y-8" key={`faqs-item-${index}`}>
                <div>
                  <h3 className="mb-4 text-xl font-bold">
                    <IconArrowDownRight
                      name="tabler:arrow-down-right"
                      className="inline-block h-7 w-7 text-primary-800"
                    />
                    {question}
                  </h3>
                  <div className="text-gray-700 dark:text-gray-400"
                    dangerouslySetInnerHTML={{__html: renderMarkdown(answer)}}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQs;
