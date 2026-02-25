import React from 'react';

export const BublooIllustrations = {
  MotherBaby: () => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#F4B18C" fillOpacity="0.2" />
      <path d="M70 75C70 60 60 50 45 50C30 50 20 60 20 75" stroke="#D68C6A" strokeWidth="4" strokeLinecap="round" />
      <circle cx="45" cy="35" r="12" stroke="#D68C6A" strokeWidth="4" />
      <path d="M55 75C55 68 50 63 43 63C36 63 31 68 31 75" stroke="#A2D5B3" strokeWidth="4" strokeLinecap="round" />
      <circle cx="43" cy="58" r="6" stroke="#A2D5B3" strokeWidth="4" />
    </svg>
  ),
  Bottle: () => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#FFF8E6" />
      <rect x="35" y="40" width="30" height="40" rx="4" fill="#F4B18C" fillOpacity="0.4" stroke="#D68C6A" strokeWidth="3" />
      <path d="M42 40V30C42 28 44 26 46 26H54C56 26 58 28 58 30V40" stroke="#D68C6A" strokeWidth="3" />
      <rect x="40" y="35" width="20" height="5" rx="1" fill="#D68C6A" />
    </svg>
  ),
  Rattle: () => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#A2D5B3" fillOpacity="0.2" />
      <circle cx="50" cy="35" r="15" stroke="#A2D5B3" strokeWidth="4" />
      <rect x="47" y="50" width="6" height="30" rx="3" fill="#F4B18C" />
      <circle cx="50" cy="80" r="8" stroke="#F4B18C" strokeWidth="4" />
      <circle cx="50" cy="35" r="5" fill="#A2D5B3" />
    </svg>
  ),
  StakingRings: () => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#E8E8E8" />
      <rect x="30" y="70" width="40" height="10" rx="5" fill="#F4B18C" />
      <rect x="35" y="60" width="30" height="10" rx="5" fill="#A2D5B3" />
      <rect x="40" y="50" width="20" height="10" rx="5" fill="#D68C6A" />
      <circle cx="50" cy="40" r="6" fill="#F4B18C" />
    </svg>
  ),
  Pacifier: () => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#F4B18C" fillOpacity="0.1" />
      <circle cx="50" cy="40" r="12" stroke="#A2D5B3" strokeWidth="4" />
      <rect x="35" y="52" width="30" height="6" rx="3" fill="#F4B18C" />
      <path d="M40 58C40 65 44 70 50 70C56 70 60 65 60 58" stroke="#D68C6A" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
};

export const illustrationUrls = [
  'bubloo-mother',
  'bubloo-bottle',
  'bubloo-rattle',
  'bubloo-rings',
  'bubloo-pacifier'
];

export const getIllustration = (key: string) => {
  switch (key) {
    case 'bubloo-mother': return <BublooIllustrations.MotherBaby />;
    case 'bubloo-bottle': return <BublooIllustrations.Bottle />;
    case 'bubloo-rattle': return <BublooIllustrations.Rattle />;
    case 'bubloo-rings': return <BublooIllustrations.StakingRings />;
    case 'bubloo-pacifier': return <BublooIllustrations.Pacifier />;
    default: return null;
  }
};
