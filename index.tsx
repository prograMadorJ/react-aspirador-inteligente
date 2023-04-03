import * as React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

import { DimensaoProvider } from './src/contexts/DimensaoContext';
import { RoboProvider } from './src/contexts/RoboContext';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <DimensaoProvider>
    <RoboProvider>
      <App />
    </RoboProvider>
  </DimensaoProvider>
);
