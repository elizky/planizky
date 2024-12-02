import Link from 'next/link';

export function Footer() {
  return (
    <footer className='py-8 flex items-center justify-center bg-muted/40'>
      <p className='font-mono text-xs'>
        Created By{' '}
        <Link
          href='https://www.izky.dev/'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:underline'
        >
          Izky
        </Link>
      </p>
    </footer>
  );
}
