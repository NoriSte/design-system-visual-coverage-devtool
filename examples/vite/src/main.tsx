import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RootProvider } from '@noriste/ds-web-root';
import { IntlProvider } from 'react-intl';
import messages from '@noriste/ds-i18n/locales/en.json';
import App from './App';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <IntlProvider locale="en" messages={messages}>
            <RootProvider theme="tokyo-ui" target={document.body}>
                <div data-preply-ds-theme="tokyo-ui">
                    <App />
                </div>
            </RootProvider>
        </IntlProvider>
    </StrictMode>,
);
