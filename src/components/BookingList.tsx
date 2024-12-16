import React, { useState } from "react";
import { Booking } from "../types";
import { PDFDocument, rgb } from "pdf-lib";

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

  const generateReceipt = async (booking: Booking) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    const { height } = page.getSize();
    const fontSize = 12;

    page.drawText("Booking Receipt", {
      x: 50,
      y: height - 50,
      size: 20,
      color: rgb(0, 0.53, 0.71),
    });

    page.drawText(`Name: ${booking.customerName}`, {
      x: 50,
      y: height - 100,
      size: fontSize,
    });
    page.drawText(`Email: ${booking.email}`, {
      x: 50,
      y: height - 120,
      size: fontSize,
    });
    page.drawText(`Phone: ${booking.phone}`, {
      x: 50,
      y: height - 140,
      size: fontSize,
    });
    page.drawText(`Travelers: ${booking.travelers}`, {
      x: 50,
      y: height - 160,
      size: fontSize,
    });
    page.drawText(`Special Requests: ${booking.specialRequests || "None"}`, {
      x: 50,
      y: height - 180,
      size: fontSize,
    });
    page.drawText(`Total Price: $${booking.totalPrice}`, {
      x: 50,
      y: height - 200,
      size: fontSize,
    });
    page.drawText(`Booking Date: ${booking.createdAt}`, {
      x: 50,
      y: height - 220,
      size: fontSize,
    });

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Booking_Receipt_${booking._id}.pdf`;
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
            <div className="text-lg font-medium">
              {booking.customerName}{" "}
              <span className="text-gray-600">({booking.packageTitle})</span>
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
                onClick={() => generateReceipt(booking)}
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
              <strong>Package Title:</strong> {selectedBooking.packageTitle}
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
                onClick={() => generateReceipt(selectedBooking)}
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
