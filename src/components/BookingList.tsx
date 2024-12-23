import React, { useState } from "react";
import { Booking } from "../types";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import signature from '../data/signature.png'

interface BookingListProps {
  bookings: Booking[];
}

const BookingList: React.FC<BookingListProps> = ({ bookings }) => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  const handleCloseModal = () => {
    setSelectedBooking(null);
  };

  const generateTaxInvoice = async (clientData: any) => {
    // Static business data
    const businessData = {
      companyName: "WonderLust Travels Pvt. Ltd.",
      registeredOffice: "3MXYZ, CFVGB, Karnataka, 560023",
      gstin: "29XXXXX 32423789 4234290",
      irn: "def8077c6256c774...",
      invoiceNumber: "234694KF48",
      invoiceDate: "02-07-2020",
      currencyCode: "INR",
      terms: "***Overleaf or the next page***",
      placeOfSupply: "Karnataka",
    };

    // Create PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 size in points
    const { width, height } = page.getSize();
    const margin = 40;

    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    interface DrawTextOptions {
      size?: number;
      font?: typeof fontBold;
      color?: ReturnType<typeof rgb>;
    }

    const drawText = (text: string, x: number, y: number, options: DrawTextOptions = {}) => {
      const { size = 10, font = fontBold, color = rgb(0, 0, 0) } = options;
      page.drawText(text, { x, y, size, font, color });
    };

    // Header
    drawText(businessData.companyName, width / 2 - 120, height - margin, { font: fontBold, size: 14 });
    drawText("INVOICE", width / 2 - 60, height - margin - 20, { font: fontBold, size: 12 });
    drawText("Registered Office:", margin, height - margin - 40);
    drawText(businessData.registeredOffice, margin, height - margin - 60);
    drawText(`GSTIN: ${businessData.gstin}`, margin, height - margin - 80);
    drawText(`IRN: ${businessData.irn}`, margin, height - margin - 100);
    drawText(`Invoice No: ${businessData.invoiceNumber}`, width - margin - 150, height - margin - 40);
    // GSTIN and IRN

    // Divider
    page.drawLine({
      start: { x: margin, y: height - margin - 130 },
      end: { x: width - margin, y: height - margin - 130 },
      thickness: 1,
      color: rgb(0, 0, 0),
    });

    // Customer and Consignee Details
    drawText("Billing Detials:", width - margin - 350, height - margin - 150, { font: fontBold, size: 14 });

    drawText(`Booking ID:${clientData._id}`, margin, height - margin - 170, { font: fontBold });
    drawText(`Name of Customer:${clientData.customerName}`, margin, height - margin - 190, { font: fontBold });
    drawText(`Phone: ${clientData.phone}`, margin, height - margin - 210);
    drawText(`Email: ${clientData.email}`, margin, height - margin - 230);
    drawText(`GSTIN: ${clientData.gstin ? clientData.gstin : 'NA'}`, margin, height - margin - 250);
    drawText(`Selected Package: ${clientData.packageId.title}`, margin, height - margin - 270);
    drawText(`Location: ${clientData.packageId.location ? clientData.packageId.location : 'NA'}`, margin, height - margin - 290);
    drawText(`Number of Travllers: ${clientData.travelers}`, margin, height - margin - 310);
    drawText(`Total Price: ${clientData.totalPrice}`, margin, height - margin - 330);
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

    drawText(`Billing Time: ${formattedDate}`, margin, height - margin - 350);
    const response = await fetch(signature);
    const logoBuffer = await response.arrayBuffer();
    // Embed the static image buffer
    const logoImage = await pdfDoc.embedPng(logoBuffer);

    page.drawImage(logoImage, {
      x: margin + 370,
      y: height - margin - 430,
      width: 80,
      height: 40,
    });
    drawText("Authorized Signatory:", width - margin - 150, height - margin - 450, { font: fontBold });
    drawText("The document is digitally signed and not requried physical siganture", width - margin - 390, height - margin - 780, { font: fontBold, size: 8 });
    drawText("For any quries please visit offical website https://travel-fronted.onrender.com/", width - margin - 410, height - margin - 790, { font: fontBold, size: 8 });

    // Save PDF and trigger download
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Tax_Invoice_${businessData.invoiceNumber}.pdf`;
    link.click();
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Bookings</h2>
      <ul className="space-y-4">
        {bookings.map((booking) => (
          <li
            key={booking._id}
            className="border p-4 rounded-lg shadow-md flex items-center justify-between"
          >
            {booking.packageTitle }
            <div className="text-lg font-medium">
              {booking.name}{" "}
              <span className="text-gray-600">({booking.customerName})</span>
            </div>
            <div className="space-x-2">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                onClick={() => handleBookingClick(booking)}
              >
                View
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
                onClick={() => { console.log(booking), generateTaxInvoice(booking) }}
              >
                Download Receipt
              </button>
            </div>
          </li>
        ))}
      </ul>

      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 bg-gray-300 hover:bg-gray-400 rounded-full w-8 h-8 flex items-center justify-center"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-4">Booking Details</h3>
            <p className="mb-2">
              <strong>Name:</strong> {selectedBooking.customerName}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {selectedBooking.email}
            </p>
            <p className="mb-2">
              <strong>Package Title:</strong> {selectedBooking?.packageTitle}
            </p>
            <p className="mb-2">
              <strong>Phone:</strong> {selectedBooking.phone}
            </p>
            <p className="mb-2">
              <strong>Travelers:</strong> {selectedBooking.travelers}
            </p>
            <p className="mb-2">
              <strong>Special Requests:</strong>{" "}
              {selectedBooking.specialRequests || "None"}
            </p>
            <p className="mb-2">
              <strong>Total Price:</strong> ${selectedBooking.totalPrice}
            </p>
            <p className="mb-4">
              <strong>Booking Date:</strong> {selectedBooking.createdAt}
            </p>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                onClick={() => { console.log(selectedBooking), generateTaxInvoice(selectedBooking) }}
              >
                Download Receipt
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingList;
