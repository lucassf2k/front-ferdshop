import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { FerdShopApp } from './ui/pages/ferdshop-app';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FerdShopApp />
  </StrictMode>,
);
