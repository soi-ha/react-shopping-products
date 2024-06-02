import { useEffect } from "react";
import { useError } from "@hooks/index";
import { ErrorToastStyle } from "./ErrorToast.style";

const ErrorToast = () => {
  const { error, hideError } = useError();

  useEffect(() => {
    const timerId = setTimeout(() => {
      hideError();
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [error, hideError]);

  if (!error) {
    return null;
  }

  return (
    <ErrorToastStyle>
      오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
    </ErrorToastStyle>
  );
};

export default ErrorToast;
