import { SVGProps } from 'react';
const PlanizkyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={229}
    height={229}
    fill='none'
    viewBox='0 0 229 229'
    {...props}
  >
    <g clipPath='url(#a)'>
      <path stroke='#000' d='M-6-6h240v240H-6z' />
      <path
        stroke='#FACC14'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={15}
        d='M138 138 90 90M180.57 208.85a19.999 19.999 0 0 1-34.145-14.136 20.001 20.001 0 0 1 5.855-14.144l-17.67 17.68a20.002 20.002 0 0 1-28.29 0 20.006 20.006 0 0 1 0-28.29l63.64-63.64a20.008 20.008 0 0 1 28.29 0 20.003 20.003 0 0 1 0 28.29l-17.68 17.67a20.001 20.001 0 0 1 28.28 28.29l-28.28 28.28ZM209 209l-14-14M33 33 19 19M58.04 121.68a20.006 20.006 0 0 1-28.29 0 20.006 20.006 0 0 1 0-28.29l17.68-17.67a20 20 0 1 1-28.28-28.29l28.28-28.28a20 20 0 1 1 28.29 28.28l17.67-17.68a20.005 20.005 0 0 1 28.29 28.29l-63.64 63.64Z'
      />
    </g>
    <path stroke='#000' d='M-5.5-5.5h239v239h-239z' />
    <defs>
      <clipPath id='a'>
        <path fill='#fff' d='M-6-6h240v240H-6z' />
      </clipPath>
    </defs>
  </svg>
);
export default PlanizkyIcon;
