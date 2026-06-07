import { FaWhatsapp } from 'react-icons/fa';
export default function WhatsAppButton() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '254700000000';
  const msg = encodeURIComponent('Hello TrueLak, I would like to enquire about your recruitment services.');
  return (
    <a href={`https://wa.me/${number}?text=${msg}`} target="_blank" rel="noreferrer"
      className="whatsapp-float" aria-label="Chat on WhatsApp">
      <FaWhatsapp size={28} color="#fff" />
    </a>
  );
}
