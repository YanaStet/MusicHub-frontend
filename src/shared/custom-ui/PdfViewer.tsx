import { Button } from "@/shared/shadcn-ui/button";
import { ButtonGroup } from "@/shared/shadcn-ui/button-group";
import { Icon } from "@/shared/shadcn-ui/icon";
import { Input } from "@/shared/shadcn-ui/input";
import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Typography } from "../shadcn-ui/typography";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  fileUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [inputPage, setInputPage] = useState<string>("1");

  useEffect(() => {
    setInputPage(pageNumber.toString());
  }, [pageNumber]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setIsLoading(false);
  }

  const changePage = (offset: number) => {
    setPageNumber((prevPage) => prevPage + offset);
  };

  const previousPage = () => changePage(-1);
  const nextPage = () => changePage(1);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const page = parseInt(inputPage);
      if (numPages && page > 0 && page <= numPages) {
        setPageNumber(page);
      } else {
        setInputPage(pageNumber.toString());
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPage(e.target.value);
  };

  return (
    <div className="pdf-viewer-container w-200 2xl:w-250 ">
      <div className="relative bg-neutral-800 border border-neutral-700 rounded-lg w-full flex justify-center">
        {!isLoading && numPages && (
          <div className="absolute bottom-6 z-10 flex justify-center w-full items-center">
            <ButtonGroup>
              <Button
                disabled={pageNumber <= 1}
                onClick={previousPage}
                variant="outline"
                className="text-black"
              >
                <Icon name="LongArrow" className="rotate-180" />
              </Button>

              <Input
                type="number"
                className="w-12 text-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                value={inputPage}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onBlur={() => setInputPage(pageNumber.toString())}
              />

              <Button
                disabled={pageNumber >= numPages}
                onClick={nextPage}
                variant="outline"
                className="text-black"
              >
                <Icon name="LongArrow" />
              </Button>
            </ButtonGroup>
          </div>
        )}
        <div className="min-w-50">
          <Document
            file={fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(error) => console.error("Error loading PDF:", error)}
            error={
              <div className="flex h-200 justify-center items-center text-neutral-400">
                <Typography variant="body2">Failed to load notes</Typography>
              </div>
            }
            loading={<div>Loading...</div>}
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              width={600}
            />
          </Document>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
