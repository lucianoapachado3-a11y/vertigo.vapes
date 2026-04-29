// Número real de WhatsApp — reemplazar con el número de Vertigo Vapes
// Formato: código país + código área + número, sin espacios ni símbolo +
// Ejemplo Argentina: 5491123456789 (54 = país, 9 = prefijo móvil, 11 = área, 23456789 = número)
const WA_PHONE = '5491161436720';

export function buildWhatsAppURL(message) {
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(message)}`;
}

export function buildProductWhatsAppURL(productName) {
  return buildWhatsAppURL(
    `Hola! Quiero pedir un ${productName}. ¿Tienen stock disponible?`
  );
}
