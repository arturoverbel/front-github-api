import { ReactNode } from "react";

interface FormProps {
    title: string;
    children: ReactNode;
}
  

export default function Form({ 
    title,
    children 
}: FormProps) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md rounded-lg border border-gray-300 bg-white p-8 shadow-sm">
          <h1 className="mb-6 text-center text-2xl font-semibold text-gray-900">
            {title}
          </h1>
          {children}
        </div>
      </div>
    );
  }