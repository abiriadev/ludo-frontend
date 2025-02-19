import type { Preview } from '@storybook/react';
import ReactQueryProvider from '@/Providers/QueryProvider';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/Styles/theme';
import { GlobalStyle } from '@/Styles/globalStyles';
import { withRouter } from 'storybook-addon-remix-react-router';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    docs: {
      canvas: {
        sourceState: 'shown',
      },
    },
  },
  decorators: [
    (Story) => (
      <ReactQueryProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Story />
        </ThemeProvider>
      </ReactQueryProvider>
    ),
    withRouter,
  ],
};

export default preview;
