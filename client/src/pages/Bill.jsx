
import React, { useRef, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Bill = () => {
    const billRef = useRef();

    // Load Marathi font (Mangal) in PDF
    useEffect(() => {
        const mangalFont = new FontFace(
            "Mangal",
            "url(https://fonts.gstatic.com/ea/mangal/v2/Mangal-Regular.woff2)"
        );
        mangalFont.load().then(function (loadedFont) {
            document.fonts.add(loadedFont);
        });
    }, []);

    const generatePDF = async () => {
        const input = billRef.current;

        // html2canvas with scale for high quality
        const canvas = await html2canvas(input, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        // If content height > page, add multiple pages
        let heightLeft = pdfHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();

        while (heightLeft > 0) {
            position = heightLeft - pdfHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
            heightLeft -= pdf.internal.pageSize.getHeight();
        }

        pdf.save("Bill.pdf");
    };

    return (
        <div className="p-5 bg-gray-100 min-h-screen flex flex-col items-center">
            <div
                ref={billRef}
                className="bg-white p-6 w-full max-w-3xl shadow-lg rounded-md font-sans"
                style={{ fontFamily: "Mangal, Arial, sans-serif" }}
            >
                {/* Header */}
                <h2 className="text-3xl font-bold mb-1 text-indigo-600 text-center">
                    टेक सूर्या
                </h2>
                <p className="text-gray-700 text-center mb-2">
                    पत्ता: वसंत विहार, रा. बळवंत नगर
                </p>
                <p className="text-gray-700 text-center mb-4">फोन: 9405661111</p>

                {/* Customer & Invoice Details */}
                <div className="flex justify-between mb-6 flex-wrap">
                    <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                        <p className="font-semibold mb-1 text-indigo-600">ग्राहक माहिती:</p>
                        <p>नाम: Mayuri Khade</p>
                        <p>फोन 1: 9999999999</p>
                        <p>फोन 2: 8888888888</p>
                        <p>आवश्यकता: Tech Surya</p>
                    </div>
                    <div className="w-full sm:w-1/2">
                        <p className="font-semibold mb-1 text-indigo-600">इन्वॉईस:</p>
                        <p>दिनांक: 3/10/2025</p>
                        <p>ठिकाण / प्रोजेक्ट: Lawn</p>
                        <p>कार्यक्रम प्रकार: Birthday</p>
                        <p>तारीख: 26/9/2025 ते 27/9/2025</p>
                    </div>
                </div>

                {/* Items Table */}
                <div className="mb-6">
                    <h4 className="font-semibold mb-2 text-indigo-600">केटरिंग आयटम्स</h4>
                    <table className="w-full border border-gray-300 border-collapse text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-2 py-1 text-left">क्र.</th>
                                <th className="border px-2 py-1 text-left">आयटम</th>
                                <th className="border px-2 py-1 text-left">संख्या</th>
                                <th className="border px-2 py-1 text-left">टिप्पणी</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-gray-50">
                                <td className="border px-2 py-1">1</td>
                                <td className="border px-2 py-1">पनीर मसाला</td>
                                <td className="border px-2 py-1">2</td>
                                <td className="border px-2 py-1"></td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="border px-2 py-1">2</td>
                                <td className="border px-2 py-1">चिकन तंदूरी</td>
                                <td className="border px-2 py-1">2</td>
                                <td className="border px-2 py-1"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Total Amount */}
                <div className="mb-6">
                    <p className="font-semibold mb-1 text-indigo-600">किमत सारांश:</p>
                    <p>एकूण रक्कम: ₹10000</p>
                    <p>ऑफर / सवलत: ₹0</p>
                    <p>अधिक कर / GST: ₹1000</p>
                    <p>उर्वरीत रक्कम: ₹9000</p>
                </div>

                <p className="text-center mt-8 font-semibold text-gray-700">
                    टेक सूर्या - फोन: 9621345050
                </p>
            </div>

            <button
                onClick={generatePDF}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow font-semibold"
            >
                Download PDF
            </button>
        </div>
    );
};

export default Bill;
