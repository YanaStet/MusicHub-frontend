import clsx from "clsx";
import { X } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploadFieldProps {
  value: File | null;
  onChange: (file: File | null) => void;
  accept: Record<string, string[]>;
  label: string;
  icon: React.ReactNode;
  error?: string;
}

export const FileUploadField = ({
  value,
  onChange,
  accept,
  label,
  icon,
  error,
}: FileUploadFieldProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onChange(acceptedFiles[0]);
      }
    },
    [onChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: 1,
    multiple: false,
  });

  if (value) {
    return (
      <div className="relative flex items-center p-4 border rounded-lg bg-green-50 border-green-200">
        <div className="mr-3 text-green-600">{icon}</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {value.name}
          </p>
          <p className="text-xs text-gray-500">
            {(value.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
        <button
          type="button"
          onClick={() => onChange(null)}
          className="p-1 hover:bg-green-200 rounded-full transition"
        >
          <X size={16} className="text-green-700" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        {...getRootProps()}
        className={clsx(
          "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-gray-50 hover:bg-gray-100",
          error && "border-red-500 bg-red-50",
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500">
          {icon}
          <p className="mb-2 text-sm font-semibold">
            {isDragActive ? "Відпустіть файл тут" : label}
          </p>
          <p className="text-xs">Drag 'n' drop або клікніть</p>
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};
