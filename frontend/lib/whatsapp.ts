// frontend/lib/whatsapp.ts
// WhatsApp enquiry utility — number is read from env, NOT hardcoded

export function getWhatsAppNumber(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
}

export function generateProductEnquiryMessage(params: {
  productName: string;
  productCode: string;
}): string {
  return encodeURIComponent(
    `Hello, I am interested in:\n\nProduct: ${params.productName}\nProduct Code: ${params.productCode}\n\nPlease provide availability and current price.\n\nThank you.`
  );
}

export function generateAppointmentMessage(params: {
  name: string;
  preferredDate?: string;
  preferredTime?: string;
  category?: string;
}): string {
  const lines = [
    `Hello, I would like to book a private viewing appointment.`,
    ``,
    `Name: ${params.name}`,
  ];
  if (params.preferredDate) lines.push(`Preferred Date: ${params.preferredDate}`);
  if (params.preferredTime) lines.push(`Preferred Time: ${params.preferredTime}`);
  if (params.category) lines.push(`Jewellery Category: ${params.category}`);
  lines.push(``, `Please confirm availability. Thank you.`);

  return encodeURIComponent(lines.join('\n'));
}

export function generateGeneralEnquiryMessage(message: string): string {
  return encodeURIComponent(message);
}

export function getWhatsAppUrl(phoneNumber: string, message: string): string {
  // Remove any non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  return `https://wa.me/${cleaned}?text=${message}`;
}

export function getProductWhatsAppUrl(params: {
  productName: string;
  productCode: string;
  phoneNumber?: string;
}): string {
  const number = params.phoneNumber || getWhatsAppNumber();
  const message = generateProductEnquiryMessage({
    productName: params.productName,
    productCode: params.productCode,
  });
  return getWhatsAppUrl(number, message);
}
