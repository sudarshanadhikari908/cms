import React from 'react';
import { Link } from 'react-router-dom';
export interface IState {
  hasError: boolean;
  errorInfo: any;
}

export class ErrorBoundary extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      errorInfo: {},
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(err: Error, info: any) {
    console.log(err, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error__boundary__wrapper">
          {/* <img src={Wrong} alt="" /> */}
          <h1>Something went wrong</h1>
          <Link to="/" className="link__goback">
            {/* <ArrowLeftOutlined /> */}
            Go to home page
          </Link>
        </div>
      );
    }
    return this.props.children;
  }
}
