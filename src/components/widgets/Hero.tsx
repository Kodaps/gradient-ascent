import Image from 'next/image';
import Link from 'next/link';
import { Lang, routeToHref } from '@/lib/i18n';
import { Button } from '../ui/button';
import { AspectRatio } from '../ui/aspect-ratio';

interface HeroProps {
  t: (key: string) => string,
  lang: Lang,
  title: string,
  subtitle: string,
  callToAction: {
    text: string,
    href: string,
    icon: any
  },
  callToAction2: {
    text: string,
    href: string,
    icon: any
  },
  image: {
    src: string,
    alt: string,
    width: number,
    height: number
  }
}

const Hero:React.FC<HeroProps> = ({t, lang, title, subtitle, callToAction, callToAction2, image}) => {

  return (
    <section id="heroOne">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="mx-auto max-w-4xl pb-10 text-center md:pb-16">
            {title && (
              <h1 className="leading-tighter font-heading mb-6 text-5xl font-bold tracking-tighter md:text-6xl"
                dangerouslySetInnerHTML={{__html: t(title)}} />
            )}
            <div className="mx-auto max-w-3xl">
              {subtitle && <p className="mb-6 text-xl font-normal text-gray-600 dark:text-slate-400" 
                dangerouslySetInnerHTML={{__html: t(subtitle)}}
              />}
              <div className="flex max-w-none flex-col flex-nowrap gap-4 px-4 sm:flex-row sm:justify-center">
                {callToAction && callToAction.text && callToAction.href && (
                  <div className="flex w-full sm:w-auto">
                    <Button asChild>
                    <Link
                      className="w-full sm:mb-0"
                      href={ routeToHref([callToAction.href], lang)}
                      //target="_blank"
                      //rel="noopener noreferrer"
                    >
                      {callToAction.icon && <callToAction.icon className="mr-1 -ml-1.5 h-5 w-5" />} {callToAction.text}
                    </Link>
                    </Button>
                  </div>
                )}
                {callToAction2 && callToAction2.text && callToAction2.href && (
                  <div className="flex w-full sm:w-auto">
                    <Link className="btn w-full" href={callToAction2.href}>
                      {callToAction2.icon && <callToAction2.icon className="mr-1 -ml-1.5 h-5 w-5" />}{' '}
                      {callToAction2.text}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          {image && (
            <div className="m-auto max-w-3xl w-full overflow-hidden">
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}

                  className="mx-auto rounded-md bg-gray-400 dark:bg-slate-700 object-cover"
                  //placeholder="blur"
                  loading="eager"
                  priority
                />
              </AspectRatio>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
