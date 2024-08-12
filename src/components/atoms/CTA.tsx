


import { Button } from '../ui/button';
import Icon, { IconType } from '@/components/atoms/Icon';
import Link from 'next/link';

export interface CTAProps {
  icon?: IconType,
  text: string,
  href: string
}


export const CTA = ({icon, text, href}: CTAProps) => {

  return (<Button asChild>
    <Link
      className="w-full sm:mb-0"
      href={ href}
      //target="_blank"
      //rel="noopener noreferrer"
    >
      {icon && <Icon name={icon} className="mr-1 -ml-1.5 h-5 w-5" />}
        {text}
    </Link>
  </Button>);
}
export default CTA;