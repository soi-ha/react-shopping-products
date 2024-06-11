import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Error } from "./CustomErrorBoundary.style";

interface Props {
  children: React.ReactNode;
}

const CustomErrorBoundary = ({ children }: Props) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ error }) => (
        <Error>
          🚨 Error! 🚨 <br />
          {error.message}
        </Error>
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

export default CustomErrorBoundary;
