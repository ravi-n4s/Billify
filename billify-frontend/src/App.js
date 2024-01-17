import React from "react";
import { PDFViewer, BlobProvider } from "@react-pdf/renderer";
import Bill from "./Templates/Bill";

const DownloadButton = ({ pdf }) => {
  const downloadPDF = () => {
    const blob = new Blob([pdf], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bill.pdf";
    a.click();
  };

  return (
    <button onClick={downloadPDF} className="btn btn-success">
      Download PDF
    </button>
  );
};

const App = () => {
  return (
    <div>
      {/* <PDFViewer>
        <Bill />
      </PDFViewer> */}
      <BlobProvider document={<Bill />}>
        {({ blob, url, loading, error }) => {
          return <DownloadButton pdf={blob} />;
        }}
      </BlobProvider>
    </div>
  );
};

export default App;
