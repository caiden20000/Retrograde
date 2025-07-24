import { useEffect } from "react";

export function ErrorPage({ reason, code }: { reason: string; code: string }) {
  useEffect(() => {
    console.error(reason);
  }, []);
  return <div>Error! You shouldn't be seeing this page... Code: {code}</div>;
}
