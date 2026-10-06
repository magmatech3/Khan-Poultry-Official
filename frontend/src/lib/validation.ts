import { z } from "zod";

const email = z.string().trim().toLowerCase().email().max(254);
const password = z.string().min(8, "Password must be at least 8 characters").max(128);
const phone = z.string().trim().max(32).optional().or(z.literal(""));
const cents = (max = 1_000_000_000) => z.coerce.number().min(0).max(max);

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(128),
  email,
  phone,
  password,
});
export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Password is required").max(128),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({ email });
export const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password,
});

export const updateProfileSchema = z.object({
  name: z.string().trim().min(1).max(128).optional(),
  phone,
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1).max(128),
  newPassword: password,
});

// ---- Catalog queries ----
export const listProductsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(24),
  q: z.string().trim().max(100).optional().default(""),
  category: z.string().trim().max(64).optional().default(""),
  type: z.enum(["FRESH", "SEASONED", "PREPARED", "OTHER"]).optional(),
  sort: z.enum(["featured", "name", "price-asc", "price-desc", "newest"]).default("featured"),
  available: z.enum(["true", "false"]).optional(),
  min: cents(1_000_000).optional(),
  max: cents(1_000_000).optional(),
});

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

// ---- Cart ----
export const cartItemSchema = z.object({
  productId: z.number().int().positive(),
  variantId: z.number().int().positive().nullable().optional(),
  quantity: z.number().positive().finite(),
  notes: z.string().trim().max(500).optional(),
});
export type CartItemInput = z.infer<typeof cartItemSchema>;

export const cartQuantitySchema = z.object({
  quantity: z.number().positive().finite(),
});
export type CartQuantityInput = z.infer<typeof cartQuantitySchema>;

// ---- Orders ----
export const checkoutSchema = z
  .object({
    fulfilmentType: z.enum(["PICKUP", "DELIVERY"]),
    branchId: z.number().int().positive().nullable().optional(),
    deliveryAddress: z.string().trim().max(300).optional(),
    deliveryCity: z.string().trim().max(100).optional(),
    deliveryLandmark: z.string().trim().max(200).optional(),
    desiredDate: z.string().trim().max(64).optional(),
    paymentMethod: z.enum(["CASH_ON_DELIVERY", "CASH_ON_PICKUP", "MANUAL"]),
    customerName: z.string().trim().min(1).max(128),
    customerEmail: email,
    customerPhone: z.string().trim().min(1, "Phone number is required").max(32),
    notes: z.string().trim().max(1000).optional(),
  })
  .superRefine((val, ctx) => {
    if (val.fulfilmentType === "PICKUP" && !val.branchId) {
      ctx.addIssue({ code: "custom", path: ["branchId"], message: "Choose a pickup branch" });
    }
    if (val.fulfilmentType === "DELIVERY" && !val.deliveryAddress) {
      ctx.addIssue({ code: "custom", path: ["deliveryAddress"], message: "Delivery address is required" });
    }
    if (val.fulfilmentType === "PICKUP" && val.paymentMethod === "CASH_ON_DELIVERY") {
      ctx.addIssue({ code: "custom", path: ["paymentMethod"], message: "Pickup is paid in store" });
    }
    if (val.fulfilmentType === "DELIVERY" && val.paymentMethod === "CASH_ON_PICKUP") {
      ctx.addIssue({ code: "custom", path: ["paymentMethod"], message: "Cash on delivery for deliveries" });
    }
  });
export type CheckoutInput = z.infer<typeof checkoutSchema>;