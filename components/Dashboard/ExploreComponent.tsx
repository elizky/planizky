import * as React from 'react';
import Image, { StaticImageData } from 'next/image';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import pattern1 from '/public/images/pattern-extra-1.jpg';
import pattern2 from '/public/images/pattern-extra-2.jpg';
import pattern3 from '/public/images/pattern-extra-3.jpg';
import pattern4 from '/public/images/pattern-extra-4.jpg';
import pattern5 from '/public/images/pattern-extra-5.jpg';

export interface Artwork {
  artist: string;
  url: StaticImageData;
  art: string;
}

export const works: Artwork[] = [
  {
    artist: 'Ornella Binni',
    url: pattern1,
    art: '123123',
  },
  {
    artist: 'Tom Byrom',
    url: pattern2,
    art: '/pattern-extra-5.jpg',
  },
  {
    artist: 'Vladimir Malyavko',
    url: pattern3,
    art: '/pattern-extra-2.jpg',
  },
  {
    artist: 'asdasd',
    url: pattern4,
    art: 'juan jose',
  },
  {
    artist: 'dsadas',
    url: pattern5,
    art: 'juan pedro',
  },
];

export function ExploreComponent() {
  return (
    <ScrollArea className='w-80 whitespace-nowrap rounded-md'>
      <div className='flex w-max space-x-4 pb-4'>
        {works.map((artwork) => (
          <figure key={artwork.artist} className='shrink-0'>
            <div className='overflow-hidden rounded-md'>
              <Image
                src={artwork.url}
                alt={`Photo by ${artwork.artist}`}
                className='w-96 aspect-[3/4] object-cover'
              />
            </div>
            <figcaption className='pt-2 text-xs text-muted-foreground'>
              Photo by <span className='font-semibold text-foreground'>{artwork.artist}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  );
}
