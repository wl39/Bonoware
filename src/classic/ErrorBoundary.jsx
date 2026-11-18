import React from "react";
import Button from "@material-ui/core/Button";
export default class ErrorBoundary extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    console.error("PROBE page failed:", error, info.componentStack);
  }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div
        role="alert"
        style={{ maxWidth: 960, margin: "140px auto 80px", padding: 24 }}
      >
        <h2>화면을 불러오지 못했습니다.</h2>
        <p>
          다른 메뉴로 이동하거나 다시 불러올 수 있습니다. 저장된 데이터는
          유지됩니다.
        </p>
        <Button onClick={() => this.setState({ error: null })}>
          다시 불러오기
        </Button>
        <Button onClick={() => window.location.reload()}>새로고침</Button>
      </div>
    );
  }
}
