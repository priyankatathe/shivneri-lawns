import React from 'react'

const Test = () => {
    const formik = useFormik({
        initialValues: {
            bankName: "",
            chequeNumber: "",
            notes: "",
            name: "",
            phone1: "",
            phone2: "",
            address: "",
            location: "",
            eventType: "",
            startDate: "",
            endDate: "",
            package: "",
            cateringRequired: false,
            catering: "",
            cateringItems: [
                { name: "पाणी", quantity: 1 },
                { name: "भाजी", quantity: 1 },
                { name: "पोळी", quantity: 1 },
                { name: "लिंबू सरबत", quantity: 1 },
                { name: "समोसा", quantity: 1 },
                { name: "चहा", quantity: 1 },
                { name: "कढीपत्ता", quantity: 1 },
            ],
            gatePackageRequired: false,
            gatePackageItems: [
                { name: "तुतारी", quantity: 1 },
                { name: "भालदार", quantity: 2 },
                { name: "फुलांची कमान", quantity: 1 },
            ],
            totalRs: 0,
            discount: 0,
            finalPrice: 0,
            advancePayment: 0,
            balance: 0,
            chequeRequired: "",
            notes: "",
            inquiryOnly: false,
        },
        validationSchema: yup.object({
            bankName: yup.string().test(
                "bankName-required",
                "बँकेचे नाव आवश्यक आहे",
                (value, context) => context.parent.chequeRequired === "होय" ? !!value : true
            ),

            chequeNumber: yup.string().test(
                "chequeNumber-required",
                "चेक क्रमांक आवश्यक आहे",
                (value, context) => context.parent.chequeRequired === "होय" ? !!value : true
            ),

            name: yup.string().required("ग्राहकाचे नाव आवश्यक आहे"),
            phone1: yup.string().required("फोन नंबर आवश्यक आहे"),
            address: yup.string().required("पत्ता आवश्यक आहे"),
            location: yup.string().required("ठिकाण निवडा"),
            eventType: yup.string().required("इव्हेंट प्रकार आवश्यक आहे"),
            startDate: yup.date().required("प्रारंभ तारीख आवश्यक आहे"),
            endDate: yup
                .date()
                .required("समाप्त तारीख आवश्यक आहे")
                .min(yup.ref("startDate"), "समाप्त तारीख प्रारंभ तारीखे नंतर असावी"),
            package: yup.string().required("पॅकेज निवडा"),
            chequeRequired: yup.string().required("चेक तपशील निवडा"),
            notes: yup.string().notRequired(),
        }),
        onSubmit: async (values, { resetForm }) => {
            console.log("Submitting chequeRequired:", values.chequeRequired);
            const cleanCateringItems = Array.isArray(values.cateringItems)
                ? values.cateringItems.filter((item) => item.name && item.quantity != null)
                : [];

            const cleanGatePackageItems = Array.isArray(values.gatePackageItems)
                ? values.gatePackageItems.filter((item) => item.name && item.quantity != null)
                : [];

            const cateringRequired = cleanCateringItems.length > 0;
            const gatePackageRequired = cleanGatePackageItems.length > 0;

            const payload = {
                ...values,
                cateringItems: cleanCateringItems,
                gatePackageItems: cleanGatePackageItems,
                cateringRequired,
                gatePackageRequired,
            };

            try {
                if (isEditing && editingId) {
                    console.log("⏫ Updating booking with ID:", editingId);
                    await updateBooking({ ...payload, _id: editingId }).unwrap()

                    toast.success("Booking updated successfully!");
                } else {
                    console.log("🆕 Creating new booking");
                    await createBooking(payload).unwrap();
                    toast.success("Booking created successfully!");
                }


                resetForm();
                setIsEditing(false);
                setEditingId(null);
            } catch (error) {
                console.error("❌ Update failed:", error);
                toast.error(error?.data?.message || "Booking operation failed!");
            }
        }
    })
    return <>

    </>
}

export default Test
const validationSchema = yup.object({
    bankName: yup.string().test(
        "bankName-required",
        "बँकेचे नाव आवश्यक आहे",
        (value, context) => context.parent.chequeRequired === "होय" ? !!value : true
    ),

    chequeNumber: yup.string().test(
        "chequeNumber-required",
        "चेक क्रमांक आवश्यक आहे",
        (value, context) => context.parent.chequeRequired === "होय" ? !!value : true
    ),

    name: yup.string().required("ग्राहकाचे नाव आवश्यक आहे"),
    phone1: yup.string().required("फोन नंबर आवश्यक आहे"),
    address: yup.string().required("पत्ता आवश्यक आहे"),
    location: yup.string().required("ठिकाण निवडा"),
    eventType: yup.string().required("इव्हेंट प्रकार आवश्यक आहे"),
    startDate: yup.date().required("प्रारंभ तारीख आवश्यक आहे"),
    endDate: yup
        .date()
        .required("समाप्त तारीख आवश्यक आहे")
        .min(yup.ref("startDate"), "समाप्त तारीख प्रारंभ तारीखे नंतर असावी"),
    package: yup.string().required("पॅकेज निवडा"),
    chequeRequired: yup.string().required("चेक तपशील निवडा"),
    notes: yup.string().notRequired(),
});

const formik = useFormik({
    initialValues: {
        bankName: "",
        chequeNumber: "",
        notes: "",
        name: "",
        phone1: "",
        phone2: "",
        address: "",
        location: "",
        eventType: "",
        startDate: "",
        endDate: "",
        package: "",
        cateringRequired: false,
        catering: "",
        cateringItems: [
            { name: "पाणी", quantity: 1 },
            { name: "भाजी", quantity: 1 },
            { name: "पोळी", quantity: 1 },
            { name: "लिंबू सरबत", quantity: 1 },
            { name: "समोसा", quantity: 1 },
            { name: "चहा", quantity: 1 },
            { name: "कढीपत्ता", quantity: 1 },
        ],
        gatePackageRequired: false,
        gatePackageItems: [
            { name: "तुतारी", quantity: 1 },
            { name: "भालदार", quantity: 2 },
            { name: "फुलांची कमान", quantity: 1 },
        ],
        totalRs: 0,
        discount: 0,
        finalPrice: 0,
        advancePayment: 0,
        balance: 0,
        chequeRequired: "",
        notes: "",
        inquiryOnly: false,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
        console.log("Submitting chequeRequired:", values.chequeRequired);
        const cleanCateringItems = Array.isArray(values.cateringItems)
            ? values.cateringItems.filter((item) => item.name && item.quantity != null)
            : [];

        const cleanGatePackageItems = Array.isArray(values.gatePackageItems)
            ? values.gatePackageItems.filter((item) => item.name && item.quantity != null)
            : [];

        const cateringRequired = cleanCateringItems.length > 0;
        const gatePackageRequired = cleanGatePackageItems.length > 0;

        const payload = {
            ...values,
            cateringItems: cleanCateringItems,
            gatePackageItems: cleanGatePackageItems,
            cateringRequired,
            gatePackageRequired,
        };

        try {
            if (isEditing && editingId) {
                console.log("⏫ Updating booking with ID:", editingId);
                await updateBooking({ ...payload, _id: editingId }).unwrap()

                toast.success("Booking updated successfully!");
            } else {
                console.log("🆕 Creating new booking");
                await createBooking(payload).unwrap();
                toast.success("Booking created successfully!");
            }


            resetForm();
            setIsEditing(false);
            setEditingId(null);
        } catch (error) {
            console.error("❌ Update failed:", error);
            toast.error(error?.data?.message || "Booking operation failed!");
        }
    }

});