import { AlertTriangle } from "lucide-react";

const CustomeError = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="p-4 bg-red-100 border border-red-200 rounded-lg shadow-md">
        <AlertTriangle className="w-8 h-8 text-red-600 mb-2" />
        <h2 className="text-xl font-semibold text-red-600 mb-1">Error</h2>
        <p className="text-red-600">Something went wrong!!</p>
      </div>
    </div>
  );
};

export default CustomeError;
