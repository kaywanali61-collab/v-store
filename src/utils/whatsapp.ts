/* ============================================================
   WHATSAPP CHECKOUT UTILITIES
   ============================================================
   Helper functions for generating WhatsApp order messages
   and checkout URLs for V Store.
   ============================================================ */

/** WhatsApp business number (Iraq format without +) */
const WHATSAPP_NUMBER = '9647702581364';

/**
 * Exact list of cities for the dropdown.
 * These are the Kurdistan Region + surrounding Iraqi cities.
 */
export const CITY_OPTIONS: string[] = [
  'هەولێر',
  'سلێمانی',
  'دهۆک',
  'هەڵەبجە',
  'کەرکووک',
  'شەقڵاوە',
  'سۆران',
  'کۆیە',
  'خەبات',
  'مەخموور',
  'ڕواندز',
  'چۆمان',
  'شەمامک',
  'پیرمام (سەڵاحەدین)',
  'دەربەندیخان',
  'چەمچەماڵ',
  'ڕاپەڕین (ڕانیە و قەڵادزێ)',
  'دووکان',
  'پێنجوێن',
  'سەید سادق',
  'شارەزوور',
  'ماوەت',
  'قەرەداغ',
  'زاخۆ',
  'ئاکرێ',
  'ئامێدی',
  'سێمێل',
  'بەردەڕەش',
  'شێخان',
  'خانەقین',
  'کەلار',
  'کفری',
  'خورماتوو',
  'شەنگال',
  'مەندەلی',
];

/**
 * Represents a single cart item resolved with its product data.
 * Used to generate the WhatsApp message.
 */
export interface CartItemInput {
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  variant?: string;
}

/**
 * Generates a professional Kurdish WhatsApp order message.
 *
 * @param items   - Array of cart items with product details
 * @param city    - The selected city (must be non-empty)
 * @param total   - Grand total price
 * @returns       - Formatted Kurdish message string
 *
 * @example
 * ```ts
 * const msg = generateWhatsAppOrderMessage(
 *   [{ productName: 'Vortex Pro X1', quantity: 1, unitPrice: 179, subtotal: 179 }],
 *   'هەولێر',
 *   179
 * );
 * // => "سڵاو V Store،\nدەمەوێت ئەم داواکارییە تۆمار بکەم.\n\nشار:\nهەولێر\n\n..."
 * ```
 */
export function generateWhatsAppOrderMessage(
  items: CartItemInput[],
  city: string,
  total: number,
): string {
  const lines: string[] = [];

  /* Header ---------------------------------------------------- */
  lines.push('سڵاو V Store،');
  lines.push('دەمەوێت ئەم داواکارییە تۆمار بکەم.');
  lines.push('');

  /* City ------------------------------------------------------ */
  lines.push('شار:');
  lines.push(city);
  lines.push('');

  /* Order items ----------------------------------------------- */
  lines.push('وردەکاریی ئۆردەر:');

  items.forEach((item, idx) => {
    const index = idx + 1;
    const name = item.productName;
    const qty = item.quantity;
    const subtotal = item.subtotal;

    let line = `${index}- ${name} x${qty} - $${subtotal}`;

    if (item.variant) {
      line += ` (${item.variant})`;
    }

    lines.push(line);
  });

  /* Total ----------------------------------------------------- */
  lines.push('');
  lines.push(`کۆی گشتی: $${total}`);

  /* Footer ---------------------------------------------------- */
  lines.push('');
  lines.push('تکایە داواکارییەکەم پشتڕاست بکەنەوە. سوپاس.');

  return lines.join('\n');
}

/**
 * Builds the full WhatsApp click-to-chat URL with an encoded message.
 *
 * @param message - The pre-formatted Kurdish order message
 * @returns       - A `https://wa.me/...` URL ready to open
 *
 * @example
 * ```ts
 * const url = getWhatsAppCheckoutUrl('سڵاو V Store، ...');
 * window.open(url, '_blank');
 * // => "https://wa.me/9647702581364?text=..."
 * ```
 */
export function getWhatsAppCheckoutUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}
