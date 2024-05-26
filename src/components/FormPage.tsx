import Image from "next/image";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const FormPage: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 min-h-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          src="/static/logos/logos_strands_powered_by_octue.svg"
          alt="Strands Logo"
          className="mx-auto h-14 w-auto"
          width={100}
          height={24}
          priority
        />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">{children}</div>
    </div>
  );
};

export default FormPage;
