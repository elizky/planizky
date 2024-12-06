import * as React from 'react';
import Image from 'next/image';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export interface Artwork {
  artist: string;
  art: string;
}

export const works: Artwork[] = [
  {
    artist: 'Ornella Binni',
    art: '/pattern-extra-1.jpg',
  },
  {
    artist: 'Tom Byrom',
    art: '/pattern-extra-5.jpg',
  },
  {
    artist: 'Vladimir Malyavko',
    art: '/pattern-extra-2.jpg',
  },
];

export function ExploreComponent() {
  return (
    <ScrollArea className='w-80 sm:w-3/4 whitespace-nowrap rounded-md'>
      <div className='flex w-max space-x-4 pb-4'>
        {works.map((artwork) => (
          <figure key={artwork.artist} className='shrink-0'>
            <div className='overflow-hidden rounded-md'>
              <Image
                src={artwork.art}
                alt={`Photo by ${artwork.artist}`}
                className='aspect-[3/4] h-fit w-fit object-cover'
                width={100}
                height={120}
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
