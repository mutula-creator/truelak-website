import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '254700000000';
  const message = encodeURIComponent('Hello TrueLak, I would like to enquire about your recruitment services.');
  const href = `https://wa.me/${number}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-float"
      aria-label="Chat with us on WhatsApp"
    >
      <FaWhatsapp size={28} color="#fff" />
    </a>
  );
}
