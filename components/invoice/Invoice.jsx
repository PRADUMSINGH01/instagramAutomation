"use client";
import React, { useState, useEffect } from "react";

// It's good practice to load external scripts dynamically in React
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Script load error for ${src}`));
    document.body.appendChild(script);
  });
};

const InvoiceGenerator = () => {
  const [invoiceNumber, setInvoiceNumber] = useState("AP/25-26/062");
  const [date, setDate] = useState("2025-08-05");
  const [customerName, setCustomerName] = useState("John Doe");
  const [mobileNo, setMobileNo] = useState("+91 98765 43210");
  const [makeModel, setMakeModel] = useState("HYUNDAI I20");
  const [carNo, setCarNo] = useState("RJ14CH0477");
  const [km, setKm] = useState("60348");
  const [isGenerating, setIsGenerating] = useState(false);

  const [items, setItems] = useState([
    {
      description: "LH FENDER + PAINT",
      quantity: 1,
      partsAmt: 3000,
      labourAmt: 0,
    },
    {
      description: "LH FRONT DOOR REPAIR & PAINT",
      quantity: 1,
      partsAmt: 3500,
      labourAmt: 0,
    },
    { description: "ENGINE OIL", quantity: 1, partsAmt: 1600, labourAmt: 0 },
    { description: "OIL FILTER", quantity: 1, partsAmt: 107, labourAmt: 0 },
    { description: "AIR FILTER", quantity: 1, partsAmt: 350, labourAmt: 0 },
    { description: "GEAR OIL", quantity: 1, partsAmt: 1250, labourAmt: 0 },
    { description: "DRY CLEAN", quantity: 1, partsAmt: 1200, labourAmt: 0 },
    { description: "RUBBING", quantity: 1, partsAmt: 1500, labourAmt: 0 },
    { description: "LABOUR", quantity: 1, partsAmt: 0, labourAmt: 1500 },
    { description: "COOLANT", quantity: 2, partsAmt: 500, labourAmt: 40 },
    { description: "WIPER BLADE", quantity: 1, partsAmt: 450, labourAmt: 0 },
  ]);

  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState(
    "NOTE: THIS IS COMPUTER GENERATED INVOICE HENCE DOES NOT REQ. SIGNATURE."
  );

  // Load PDF generation scripts when the component mounts
  useEffect(() => {
    loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
    ).catch((err) => console.error(err));
    loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"
    ).catch((err) => console.error(err));
  }, []);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      { description: "", quantity: 1, partsAmt: 0, labourAmt: 0 },
    ]);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const calculateTotal = (item) => {
    const parts = Number(item.partsAmt) || 0;
    const labour = Number(item.labourAmt) || 0;
    return (parts + labour) * (Number(item.quantity) || 0);
  };

  const totalAmountBeforeDiscount = items.reduce(
    (acc, item) => acc + calculateTotal(item),
    0
  );
  const totalAmountAfterDiscount =
    totalAmountBeforeDiscount - (Number(discount) || 0);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    if (
      typeof window.jspdf === "undefined" ||
      typeof window.html2canvas === "undefined"
    ) {
      alert(
        "PDF generation libraries are still loading. Please try again in a moment."
      );
      return;
    }

    setIsGenerating(true);
    const input = document.getElementById("invoice-content");
    const { jsPDF } = window.jspdf;

    window
      .html2canvas(input, {
        scale: 2,
        useCORS: true,
        logging: false,
      })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;
        const imgHeight = pdfWidth / ratio;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
        pdf.save(`invoice-${invoiceNumber}.pdf`);
        setIsGenerating(false);
      })
      .catch((err) => {
        console.error("Error generating PDF:", err);
        alert(
          "An error occurred while generating the PDF. Please check the console."
        );
        setIsGenerating(false);
      });
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8 font-sans">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");
        body {
          font-family: "Inter", sans-serif;
        }
        .invoice-input {
          background-color: transparent;
          border: none;
          border-bottom: 1px solid transparent;
          transition: border-color 0.3s ease;
        }
        .invoice-input:focus {
          outline: none;
          border-bottom: 1px solid #3b82f6;
        }
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none;
          }
          #invoice-content {
            box-shadow: none;
            border: none;
            padding: 0;
            margin: 0;
            max-width: 100%;
          }
          .invoice-input {
            border: none !important;
            background-color: transparent !important;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            padding: 0;
          }
        }
      `}</style>
      <div
        className="max-w-4xl mx-auto bg-white shadow-lg"
        id="invoice-content"
      >
        <div className="p-8 md:p-16">
          <header className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800 tracking-wide">
              AUTO POINT
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              PLOT NO 9 SHYAM NAGAR, OPPOSITE OF LAL BAGH, BILWA SITAPURA,
              JAIPUR 302022
            </p>
            <p className="text-gray-500 text-sm">
              Phone: +91 9352865989 | PAN NO. HIXPK85890
            </p>
            <h2 className="text-3xl font-semibold text-gray-700 mt-8 border-y-2 border-black py-2 tracking-wider">
              ORIGINAL INVOICE
            </h2>
          </header>

          <section className="border-t-2 border-black pt-6">
            <div className="grid grid-cols-2 gap-x-12 gap-y-4">
              <div className="flex justify-between items-baseline border-b border-gray-200 py-2">
                <span className="font-semibold text-gray-600">
                  CUSTOMER NAME:
                </span>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="invoice-input w-2/3 text-right font-medium"
                />
              </div>
              <div className="flex justify-between items-baseline border-b border-gray-200 py-2">
                <span className="font-semibold text-gray-600">INVOICE NO:</span>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="invoice-input w-1/2 text-right font-medium"
                />
              </div>
              <div className="flex justify-between items-baseline border-b border-gray-200 py-2">
                <span className="font-semibold text-gray-600">MOBILE NO.:</span>
                <input
                  type="text"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                  className="invoice-input w-2/3 text-right font-medium"
                />
              </div>
              <div className="flex justify-between items-baseline border-b border-gray-200 py-2">
                <span className="font-semibold text-gray-600">DATE:</span>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="invoice-input w-1/2 text-right font-medium"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-x-8 mt-4 border-b-2 border-black pb-6">
              <div className="flex justify-between items-baseline border-b border-gray-200 py-2">
                <span className="font-semibold text-gray-600">
                  MAKE & MODEL:
                </span>
                <input
                  type="text"
                  value={makeModel}
                  onChange={(e) => setMakeModel(e.target.value)}
                  className="invoice-input w-1/2 text-right font-medium"
                />
              </div>
              <div className="flex justify-between items-baseline border-b border-gray-200 py-2">
                <span className="font-semibold text-gray-600">CAR NO:</span>
                <input
                  type="text"
                  value={carNo}
                  onChange={(e) => setCarNo(e.target.value)}
                  className="invoice-input w-1/2 text-right font-medium"
                />
              </div>
              <div className="flex justify-between items-baseline border-b border-gray-200 py-2">
                <span className="font-semibold text-gray-600">KM:</span>
                <input
                  type="text"
                  value={km}
                  onChange={(e) => setKm(e.target.value)}
                  className="invoice-input w-1/2 text-right font-medium"
                />
              </div>
            </div>
          </section>

          <section className="my-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-gray-300 text-gray-600 uppercase text-xs tracking-wider">
                    <th className="py-3 px-2 font-semibold w-12">S.No</th>
                    <th className="py-3 px-2 font-semibold w-2/5">
                      Description
                    </th>
                    <th className="py-3 px-2 font-semibold text-center">Qty</th>
                    <th className="py-3 px-2 font-semibold text-right">
                      Parts Amt.
                    </th>
                    <th className="py-3 px-2 font-semibold text-right">
                      Labour Amt.
                    </th>
                    <th className="py-3 px-2 font-semibold text-right">
                      Total
                    </th>
                    <th className="py-3 px-2 print:hidden"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-3 px-2 text-gray-700">{index + 1}</td>
                      <td className="py-3 px-2">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) =>
                            handleItemChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          className="w-full invoice-input"
                        />
                      </td>
                      <td className="py-3 px-2 text-center">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleItemChange(index, "quantity", e.target.value)
                          }
                          className="w-16 invoice-input text-center"
                        />
                      </td>
                      <td className="py-3 px-2 text-right">
                        <input
                          type="number"
                          value={item.partsAmt}
                          onChange={(e) =>
                            handleItemChange(index, "partsAmt", e.target.value)
                          }
                          className="w-24 invoice-input text-right"
                        />
                      </td>
                      <td className="py-3 px-2 text-right">
                        <input
                          type="number"
                          value={item.labourAmt}
                          onChange={(e) =>
                            handleItemChange(index, "labourAmt", e.target.value)
                          }
                          className="w-24 invoice-input text-right"
                        />
                      </td>
                      <td className="py-3 px-2 text-right font-semibold text-gray-800">
                        ₹{calculateTotal(item).toFixed(2)}
                      </td>
                      <td className="py-3 px-2 text-center print:hidden">
                        <button
                          onClick={() => handleRemoveItem(index)}
                          className="text-red-400 hover:text-red-600 font-bold transition-colors"
                        >
                          &times;
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={handleAddItem}
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 print:hidden text-sm"
            >
              + Add Item
            </button>
          </section>

          <section className="flex justify-around mt-10">
            <div className="w-full md:w-2/5 space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span className="font-semibold">SUBTOTAL</span>
                <span className="font-medium">
                  ₹{totalAmountBeforeDiscount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">DISCOUNT</span>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-24 invoice-input text-right font-medium"
                />
              </div>
              <div className="flex justify-between pt-2 font-bold text-xl border-t-2 border-black mt-2 text-gray-800">
                <span>TOTAL</span>
                <span>₹{totalAmountAfterDiscount.toFixed(2)}</span>
              </div>
            </div>
          </section>

          <footer className="mt-16 border-t pt-6">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full invoice-input text-gray-500 text-xs text-center"
              rows="2"
            ></textarea>
            <p className="text-right font-semibold text-gray-800 mt-8">
              For Auto Point
            </p>
          </footer>
        </div>
      </div>
      <div className="text-center mt-8 print:hidden">
        <button
          onClick={handlePrint}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 disabled:opacity-50 mr-4"
          disabled={isGenerating}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 inline-block mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          {isGenerating ? "Printing..." : "Print"}
        </button>
        <button
          onClick={handleDownloadPDF}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 disabled:opacity-50"
          disabled={isGenerating}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 inline-block mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          {isGenerating ? "Downloading..." : "Download PDF"}
        </button>
      </div>
    </div>
  );
};

export default InvoiceGenerator;
