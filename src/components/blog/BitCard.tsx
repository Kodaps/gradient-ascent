import Image from 'next/image';
import Link from 'next/link';
import { Lang } from '@/utils/i18n';
import { getPermalink } from '@/utils/content';
import { Bit } from 'contentlayer/generated';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarImage } from '../ui/avatar';

interface BitCardProps {
  className?: string;
  bit: Bit
}

export const BitCard: React.FC<BitCardProps> = ({className, bit}) => {

  return <Card className="">
  <CardHeader>
    <CardTitle className="flex flex-row">
      {bit.title && <h3 className='text-lg'>{bit.title}</h3>}
    </CardTitle>
  </CardHeader>
  <CardContent>
    {bit.takeaway && <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-4 max-h-9"> { bit.takeaway} </div>}
  </CardContent>
  <CardFooter className="flex flex-row items-end">
    <Link href={getPermalink(bit.slug, bit.type, bit.lang as Lang)}>Read</Link>
  </CardFooter>
</Card>;
}
