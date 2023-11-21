import Link from 'next/link';
import { Lang, routeToHref } from '@/lib/i18n';

interface CTA {
  lang: Lang,
  external?: boolean,
  title: string, 
  subtitle: string,
  callToAction: {
    text: string,
    href: string,
    icon: any
  }
}

const CallToAction:React.FC<CTA> = ({lang, external, title, subtitle, callToAction}) => {

  return (
    <section className="bg-primary-50 dark:bg-slate-800" id="callToActionOne">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="pt-4 pb-12 md:pb-20 md:pt-12">
          <div className="card mx-auto max-w-3xl p-6 text-center">
            {title && (
              <h2 className="leading-tighter font-heading mb-4 text-4xl font-bold tracking-tighter md:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && <p className="text-xl text-gray-600 dark:text-slate-400">{subtitle}</p>}
            {callToAction && callToAction.text && callToAction.href && (
              <div className="mx-auto mt-6 max-w-xs">
                <Link
                  className="btn btn-primary w-full sm:w-auto"
                  href={routeToHref([callToAction.href], lang)}
                  target={ external ? "_blank" : ""}
                  rel={ external ? "noopener noreferrer" : ""}
                >
                  {callToAction.icon && <callToAction.icon className="mr-1 -ml-1.5 h-5 w-5" />} {callToAction.text}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
