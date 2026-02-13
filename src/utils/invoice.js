import { jsPDF } from "jspdf";

const formatCurrency = (value) =>
  `Rs. ${Number(value || 0).toLocaleString("en-IN")}`;

export const buildInvoiceDoc = (invoice) => {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const marginX = 40;
  let cursorY = 50;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("INVOICE", marginX, cursorY);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  cursorY += 18;
  doc.text(`Invoice ID: ${invoice?.invoiceId || "N/A"}`, marginX, cursorY);
  cursorY += 14;
  doc.text(`Payment ID: ${invoice?.paymentId || "N/A"}`, marginX, cursorY);
  cursorY += 14;
  doc.text(
    `Date: ${invoice?.date ? new Date(invoice.date).toLocaleString() : "N/A"}`,
    marginX,
    cursorY
  );

  cursorY += 22;
  doc.setDrawColor(229, 231, 235);
  doc.line(marginX, cursorY, 555, cursorY);

  cursorY += 20;
  doc.setFont("helvetica", "bold");
  doc.text("Customer Details", marginX, cursorY);
  doc.setFont("helvetica", "normal");
  cursorY += 14;
  doc.text(`Name: ${invoice?.name || "N/A"}`, marginX, cursorY);
  cursorY += 14;
  doc.text(`Email: ${invoice?.email || "N/A"}`, marginX, cursorY);
  cursorY += 14;
  doc.text(`Phone: ${invoice?.phone || "N/A"}`, marginX, cursorY);
  cursorY += 14;
  doc.text(`Business: ${invoice?.business || "N/A"}`, marginX, cursorY);

  cursorY += 22;
  doc.setFont("helvetica", "bold");
  doc.text("Plan Summary", marginX, cursorY);
  doc.setFont("helvetica", "normal");
  cursorY += 14;
  doc.text(`Plan: ${invoice?.planName || "N/A"}`, marginX, cursorY);
  cursorY += 14;
  doc.text(`Base Price: ${formatCurrency(invoice?.basePrice)}`, marginX, cursorY);
  cursorY += 14;
  doc.text(
    `Delivery Add-on: ${invoice?.deliveryLabel || "Standard"} (${formatCurrency(
      invoice?.deliveryAddOn
    )})`,
    marginX,
    cursorY
  );
  cursorY += 14;
  doc.text(
    `Custom Functionality: ${invoice?.customFunctionality || "N/A"}`,
    marginX,
    cursorY
  );

  cursorY += 24;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(`Total: ${formatCurrency(invoice?.total)}`, marginX, cursorY);

  cursorY += 26;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(107, 114, 128);
  doc.text(
    "This invoice is generated electronically and is valid without signature.",
    marginX,
    cursorY
  );

  doc.setTextColor(0, 0, 0);
  return doc;
};

export const getInvoicePdfDataUri = (invoice) => {
  const doc = buildInvoiceDoc(invoice);
  return doc.output("datauristring");
};

export const getInvoicePdfBlob = (invoice) => {
  const doc = buildInvoiceDoc(invoice);
  return doc.output("blob");
};
