import React from "react";

import FlashSuccess from "./FlashSuccess";
import FlashInfo from "./FlashInfo";
import FlashWarning from "./FlashWarning";
import FlashDanger from "./FlashDanger";

function Toast({ type, message }) {
  switch (type) {
    case "success":
      return <FlashSuccess message={message} />;
    case "info":
      return <FlashInfo message={message} />;
    case "warning":
      return <FlashWarning message={message} />;
    case "danger":
      return <FlashDanger message={message} />;
    default:
      return <FlashInfo message={message} />;
  }
}

export default Toast;
