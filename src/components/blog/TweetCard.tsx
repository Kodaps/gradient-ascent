import Image from 'next/image';
import Link from 'next/link';
import { Lang } from '@/utils/i18n';
import { getPermalink } from '@/utils/content';
import { Bit } from 'contentlayer/generated';
import { Card } from '../ui/card';

interface BitCardProps {
  className?: string;
  bit: Bit
}

export const BitCard: React.FC<BitCardProps> = ({className, bit}) => {
  return <Card>
  </Card>;
}
