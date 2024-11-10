import Image, { ImageProps } from 'next/image';
import { Lang, routeToHref, useTranslation } from '@/lib/i18n';
import { AspectRatio } from '../ui/aspect-ratio';
import { Section } from '@/components/atoms/Section';
import CTA, { CTAProps } from '../atoms/CTA';
import { Heading1 } from '../atoms/Heading1';

interface HeroProps {
  id?: string,
  lang: Lang, 
  title: string, 
  subtitle: string,
  callToAction?: CTAProps,
  callToAction2?: CTAProps,
  image: React.ReactNode
}

const HeroSection = async ({lang, title, subtitle, callToAction, callToAction2, image, id}: HeroProps) => {

  const {t} = await useTranslation(lang);
  return (
    <Section id={id}>
        <div className="py-12 md:py-20 flex flex-col md:flex-row">
          <div className="pb-10 text-center md:pb-16 w-full md:w-1/2 flex flex-col  justify-items-center content-center">
            {title && <Heading1 html={title} />}
            <div className="mx-auto max-w-3xl">
              {subtitle && <p className="mb-6 text-xl font-normal text-gray-600 dark:text-slate-400" 
                dangerouslySetInnerHTML={{__html: t(subtitle)}}
              />}
              <div className="flex max-w-none flex-col flex-nowrap gap-4 px-4 sm:flex-row sm:justify-center">
                {callToAction && callToAction.text && callToAction.href && (
                  <div className="flex w-full sm:w-auto">
                    <CTA
                       {...callToAction}
                    />
                  </div>
                )}
                {callToAction2 &&
                  <div className="flex w-full sm:w-auto">
                    <CTA {...callToAction2} />
                  </div>
                }
              </div>
            </div>
          </div>
          {image && (
            <div className="m-auto max-w-3xl overflow-hidden w-full md:w-1/2">
              <AspectRatio ratio={4 / 3}>
                { image }
              </AspectRatio>
            </div>
          )}
        </div>
    </Section>
  );
};

export default HeroSection;
