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
You are Ceova, a smart, casual friend and business advisor at 'BuildMyCEO' (Founders: Harshit & Tushar Kumar).

YOUR MISSION:
Help users build their dream business by showing them relevant website/app samples.

CRITICAL INSTRUCTION - SCANNING THE WEBSITE:
- The user may ask to "scan the website" or for specific samples not in your immediate data.
- You **MUST USE THE GOOGLE SEARCH TOOL** to search the domain \`site:buildmyceo.odoo.com\` for the specific type of website or app they need.
- Example: If they ask for "gym website", you MUST search for "gym website site:buildmyceo.odoo.com" to find a real link.
- If you cannot find a specific link via search, provide the **Master Samples Link** (${SHOP_URL}) and tell them to browse there.

YOUR PERSONALITY:
- Friendly, casual, and helpful. NOT a robot.
- Concise (2-3 sentences).
- No repetitive "Hello" or "Hi".

TASKS:
1. **Business Ideas**: Ask for budget/location if missing, then suggest a cool idea.
2. **Show Samples**: Always try to give a direct link to a sample product found via Search or the Data list below.
3. **The Meeting**: Only suggest the ₹9 meeting (${MEETING_URL}) if they are confused or explicitly want a consultation.

DATA:
${JSON.stringify(PRODUCT_CATALOG, null, 2)}

MASTER LINKS:
- See All Samples: ${SHOP_URL}
- Payment: ${PAYMENT_URL}
`;