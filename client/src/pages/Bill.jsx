

import React, { useRef, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-oklch";
import { useLocation } from "react-router-dom";

const Bill = () => {
    const { state } = useLocation();
    const booking = state?.booking;
    const billRef = useRef();

    // Marathi font load
    useEffect(() => {
        const mangalFont = new FontFace(
            "Mangal",
            "url(https://fonts.gstatic.com/ea/mangal/v2/Mangal-Regular.woff2)"
        );
        mangalFont.load().then((loadedFont) => {
            document.fonts.add(loadedFont);
        });
    }, []);

    const generatePDF = async () => {
        const input = billRef.current;
        const downloadBtn = input.querySelector("#downloadBtn");
        if (downloadBtn) downloadBtn.style.display = "none";

        const canvas = await html2canvas(input, {
            scale: 2,
            useCORS: true,
            windowWidth: input.scrollWidth,
            windowHeight: input.scrollHeight,
        });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
            position = position - pdfHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
        }

        pdf.save(`${booking?.name || "Bill"}.pdf`);
        if (downloadBtn) downloadBtn.style.display = "block";
    };

    if (!booking) {
        return (
            <div className="flex justify-center items-center min-h-screen text-red-600 text-lg font-semibold">
                ⚠️ कोणतीही बुकिंग माहिती नाही
            </div>
        );
    }

    return (
        <div className="pt-25 pb-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <div
                ref={billRef}
                className="bg-white p-6 w-full max-w-3xl shadow-lg rounded-md font-sans"
                style={{ fontFamily: "Mangal, Arial, sans-serif" }}
            >
                {/* Header */}
                <h2 className="text-3xl font-bold mb-1 text-indigo-600 text-center">
                    🌸 टेक सूर्या 🌸
                </h2>
                <p className="text-gray-700 text-center ">
                    पत्ता: वसंत विहार, रा. बळवंत नगर
                </p>
                <p className="text-gray-700 text-center ms-5 mb-4">फोन: 2541256321</p>

                {/* Customer & Invoice Details */}
                <div className="flex justify-between mb-3 ">
                    <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                        <p className="font-semibold mb-1 text-indigo-600">ग्राहक माहिती:</p>
                        <p>नाम: {booking.name}</p>
                        <p>फोन 1: {booking.phone1}</p>
                        {booking.phone2 && <p>फोन 2: {booking.phone2}</p>}
                        <p>पत्ता: {booking.address}</p>
                    </div>
                    <div className="w-full sm:w-1/2 ms-59">
                        <p className="font-semibold mb-1 text-indigo-600">कार्यक्रम माहिती:</p>
                        <p>ठिकाण: {booking.location}</p>
                        <p>कार्यक्रम प्रकार: {booking.eventType}</p>
                        <p>पॅकेज: {booking.package}</p>
                        <p>
                            तारीख:{" "}
                            {new Date(booking.startDate).toLocaleDateString("mr-IN")} ते{" "}
                            {new Date(booking.endDate).toLocaleDateString("mr-IN")}
                        </p>
                    </div>
                </div>

                {/* ✅ फक्त जर केटरिंग आयटम्स असतील तरच दाखव */}
                {booking.cateringItems?.length > 0 && (
                    <div className="mb-6">
                        <h4 className="font-semibold mb-2 text-indigo-600">केटरिंग आयटम्स</h4>
                        <table className="w-full border border-gray-300 border-collapse text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border px-2 py-1 text-left">क्र.</th>
                                    <th className="border px-2 py-1 text-left">आयटम</th>
                                </tr>
                            </thead>
                            <tbody>
                                {booking.cateringItems.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="border px-2 py-1">{index + 1}</td>
                                        <td className="border px-2 py-1">{item.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* ✅ फक्त जर गेट पॅकेज असतील तरच दाखव */}
                {booking.gatePackageItems?.length > 0 && (
                    <div className="mb-6">
                        <h4 className="font-semibold mb-2 text-indigo-600">गेट पॅकेज आयटम्स</h4>
                        <table className="w-full border border-gray-300 border-collapse text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border px-2 py-1 text-left">क्र.</th>
                                    <th className="border px-2 py-1 text-left">आयटम</th>
                                    <th className="border px-2 py-1 text-left">संख्या</th>
                                </tr>
                            </thead>
                            <tbody>
                                {booking.gatePackageItems.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="border px-2 py-1">{index + 1}</td>
                                        <td className="border px-2 py-1">{item.name}</td>
                                        <td className="border px-2 py-1">{item.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Total Summary */}
                <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
                    <p className="font-semibold mb-2 text-indigo-600 text-lg">किंमत सारांश</p>

                    <div className="space-y-1 text-sm">
                        {booking.totalRs && (
                            <div className="flex justify-between">
                                <span>एकूण रक्कम:</span>
                                <span>₹{booking.totalRs}</span>
                            </div>
                        )}

                        {booking.discount && (
                            <div className="flex justify-between">
                                <span>सवलत:</span>
                                <span>₹{booking.discount}</span>
                            </div>
                        )}

                        {booking.finalPrice && (
                            <div className="flex justify-between font-semibold">
                                <span>अंतिम किंमत:</span>
                                <span>₹{booking.finalPrice}</span>
                            </div>
                        )}

                        {booking.advancePayment && (
                            <div className="flex justify-between">
                                <span>अ‍ॅडव्हान्स पेमेंट:</span>
                                <span>₹{booking.advancePayment}</span>
                            </div>
                        )}

                        {booking.balance && (
                            <div className="flex justify-between font-semibold">
                                <span>उर्वरीत रक्कम:</span>
                                <span>₹{booking.balance}</span>
                            </div>
                        )}

                        {/* ✅ चेक आवश्यक असेल तेव्हाच दाखव */}
                        {booking.chequeRequired === "होय" && (
                            <>
                                <div className="flex justify-between">
                                    <span>बँकेचं नाव:</span>
                                    <span>{booking.bankName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>चेक क्रमांक:</span>
                                    <span>{booking.chequeNumber}</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>



                {/* Notes */}
                {/* {booking.notes && (
                    <div className="mb-6">
                        <p className="font-semibold mb-1 text-indigo-600">टिप्पणी:</p>
                        <p className="text-gray-700 whitespace-pre-wrap">{booking.notes}</p>
                    </div>
                )} */}

                <p className="text-center mt-8 font-semibold text-gray-700">
                    टेक सूर्या - फोन: 9621345050
                </p>

                <button
                    id="downloadBtn"
                    onClick={generatePDF}
                    className="mt-6 ms-68 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow font-semibold"
                >
                    Download PDF
                </button>
            </div>
        </div>
    );
};

export default Bill;









