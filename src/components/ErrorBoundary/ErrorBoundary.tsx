import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import React, { Component, ReactNode } from 'react';
import { TFunction, withTranslation } from 'react-i18next';

interface Props {
  children: ReactNode;
  t: TFunction;
}

interface State {
  error: string;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: '' };
  }

  public static getDerivedStateFromError({ message }: Error): State {
    return { error: message };
  }

  public render() {
    if (this.state.error) {
      return (
        <Alert severity="error">
          <AlertTitle>{this.props.t('LANG_SOMETHING_WENT_WRONG_TEXT')}</AlertTitle>
          {this.state.error}
        </Alert>
      );
    }

    return this.props.children;
  }
}

export default withTranslation()(ErrorBoundary);
