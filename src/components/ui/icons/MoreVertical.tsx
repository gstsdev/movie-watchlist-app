import { FunctionComponent } from "react";

const MoreVertical: FunctionComponent<JSX.IntrinsicElements["svg"]> = (
  props
) => {
  return (
    <svg
      width="10"
      height="2"
      viewBox="0 0 10 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="1" cy="1" r="1" fill="black" />
      <circle cx="5" cy="1" r="1" fill="black" />
      <circle cx="9" cy="1" r="1" fill="black" />
    </svg>
  );
};

export default MoreVertical;
