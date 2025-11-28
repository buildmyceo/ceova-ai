import { Product, PlatformCategory } from './types';

export const CEOVA_LOGO_URL = "https://www.buildmyceo.com/web/image/5181-07dc9db2/ceova.png";
export const MEETING_URL = "https://buildmyceo.odoo.com/book-a-metting-with-us-at-just-9rs";
export const PAYMENT_URL = "https://buildmyceo.odoo.com/payment-page";
export const SHOP_URL = "https://buildmyceo.odoo.com/shop";

export const PRODUCT_CATALOG: Product[] = [
  { name: "Couchy Furniture Website", price: "₹33,950", category: PlatformCategory.ODOO, url: "https://buildmyceo.odoo.com/shop/couchy-furniture-website-7" },
  { name: "Education College & University Website", price: "₹19,990", category: PlatformCategory.WORDPRESS, url: "https://buildmyceo.odoo.com/shop/education-college-and-university-website-15" },
  { name: "Umed Dating Application", price: "₹2,95,000", category: PlatformCategory.CODE_BASED, url: "https://buildmyceo.odoo.com/shop/umed-dating-application-25" },
  { name: "Shopify Standard Store", price: "₹10,000 - ₹13,000", category: PlatformCategory.SHOPIFY, url: "https://buildmyceo.odoo.com/shop/category/shopify-13" },
  { name: "WordPress Business Site", price: "₹10,000 - ₹20,000", category: PlatformCategory.WORDPRESS, url: "https://buildmyceo.odoo.com/shop/category/wordpress-14" },
  { name: "WooCommerce Store", price: "₹34,000", category: PlatformCategory.WOO_COMMERCE, url: "https://buildmyceo.odoo.com/shop/category/woo-commerce-17" },
  { name: "Odoo ERP/Website", price: "approx ₹20,000", category: PlatformCategory.ODOO, url: "https://buildmyceo.odoo.com/shop/category/odoo-18" },
  { name: "Custom Code Website", price: "₹19,000 - ₹3.79 Lakh", category: PlatformCategory.CODE_BASED, url: "https://buildmyceo.odoo.com/shop/category/code-based-website-15" },
  { name: "Custom Mobile App", price: "Variable", category: PlatformCategory.APP, url: "https://buildmyceo.odoo.com/shop/category/code-based-application-16" },
];

export const SYSTEM_INSTRUCTION = `
You are Ceova, a smart, enthusiastic friend and business advisor at 'BuildMyCEO' (Founders: Harshit & Tushar Kumar).

YOUR MISSION:
Help users build their dream business by finding the PERFECT website or app sample for them.

CORE BEHAVIOR - SCANNING THE WEBSITE:
1.  **ALWAYS SEARCH FIRST**: If a user mentions a business type (e.g., "gym", "dentist", "shoe store"), you MUST use the \`googleSearch\` tool.
2.  **SEARCH QUERY**: Search for the specific term + "site:buildmyceo.odoo.com" (e.g., "gym website site:buildmyceo.odoo.com").
3.  **PROVIDE LINKS**: You MUST include the full clickable URL of the sample you found in your response.
4.  **FALLBACK**: If Google Search finds nothing specific, share this Master Samples Link: ${SHOP_URL} and say "I couldn't find that specific sample, but you can browse our huge collection here!"

YOUR PERSONALITY:
- **Friend mode**: Be super casual, supportive, and excited. Use emojis! 🚀
- **Business Consultant**: Ask them about their budget or location to give better advice.
- **Not Pushy**: Do NOT force the meeting. Only suggest the ₹9 meeting (${MEETING_URL}) if they seem really confused or ask for a consultation.
- **Concise**: Keep answers short and punchy.

DATA REFERENCE:
${JSON.stringify(PRODUCT_CATALOG, null, 2)}
`;