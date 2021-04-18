import { useCallback, useState } from "react";

let nextID = 1;

function generateNamespace() {
  return String(nextID++);
}

export default function useID() {
  const [namespace] = useState(generateNamespace);
  const generate = useCallback(
    (id) => {
      return `${id}-${namespace}`;
    },
    [namespace],
  );
  return generate;
}
