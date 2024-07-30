import { FunctionComponent } from "react";

const EyeRemove: FunctionComponent<JSX.IntrinsicElements["svg"]> = (props) => {
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
        d="M13.1484 9.84667L11.9059 11.0833L13.1484 12.32L12.32 13.1483L11.0834 11.9058L9.84671 13.1483L9.02421 12.32L10.2609 11.0833L9.02421 9.84667L9.84671 9.02417L11.0834 10.2608L12.32 9.02417L13.1484 9.84667ZM7.00004 5.25C6.03171 5.25 5.25004 6.03167 5.25004 7C5.25004 7.96833 6.03171 8.75 7.00004 8.75C7.96837 8.75 8.75004 7.96833 8.75004 7C8.75004 6.03167 7.96837 5.25 7.00004 5.25ZM7.00004 9.91667C5.39004 9.91667 4.08337 8.61 4.08337 7C4.08337 5.39 5.39004 4.08333 7.00004 4.08333C8.61004 4.08333 9.91671 5.39 9.91671 7C9.91671 7.29167 9.85837 7.58333 9.78254 7.83417C10.185 7.67667 10.6225 7.58333 11.0834 7.58333C11.7367 7.58333 12.3492 7.77 12.8742 8.07917C13.0842 7.74083 13.265 7.37917 13.4167 7C12.4075 4.43917 9.91671 2.625 7.00004 2.625C4.08337 2.625 1.59254 4.43917 0.583374 7C1.59254 9.56083 4.08337 11.375 7.00004 11.375C7.20421 11.375 7.40254 11.375 7.60087 11.3458C7.58337 11.2583 7.58337 11.1708 7.58337 11.0833C7.58337 10.6225 7.67671 10.185 7.83421 9.7825C7.58337 9.85833 7.29171 9.91667 7.00004 9.91667Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default EyeRemove;
