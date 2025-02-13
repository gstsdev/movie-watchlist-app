import { FunctionComponent } from "react";

const Search: FunctionComponent<JSX.IntrinsicElements["svg"]> = (props) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.125 0.25C6.41793 0.25 7.65791 0.763614 8.57215 1.67785C9.48639 2.59209 10 3.83207 10 5.125C10 6.3325 9.5575 7.4425 8.83 8.2975L9.0325 8.5H9.625L13.375 12.25L12.25 13.375L8.5 9.625V9.0325L8.2975 8.83C7.4425 9.5575 6.3325 10 5.125 10C3.83207 10 2.59209 9.48639 1.67785 8.57215C0.763614 7.65791 0.25 6.41793 0.25 5.125C0.25 3.83207 0.763614 2.59209 1.67785 1.67785C2.59209 0.763614 3.83207 0.25 5.125 0.25ZM5.125 1.75C3.25 1.75 1.75 3.25 1.75 5.125C1.75 7 3.25 8.5 5.125 8.5C7 8.5 8.5 7 8.5 5.125C8.5 3.25 7 1.75 5.125 1.75Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Search;
