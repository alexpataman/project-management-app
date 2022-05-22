import React from 'react';
import { createRoot } from 'react-dom/client';

import './helpers/i18n';
import reportWebVitals from './reportWebVitals';

import './index.scss';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<div>test</div>);
}
reportWebVitals();
