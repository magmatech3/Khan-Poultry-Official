# Khan's Poultry API Documentation

## Base URL
- Development: `http://localhost:3000`
- Production: `NEXT_PUBLIC_APP_URL`

## Authentication
Authenticated endpoints use a session cookie set by `/api/auth/login` (or registration). Browser clients should send credentials:

```
credentials: 'include'
```

### Auth Endpoints

#### POST /api/auth/register
Register a new customer account.

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string (min 8 chars)",
  "phone": "string? (optional)"
}
```

**Response:**
```json
{
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### POST /api/auth/login
Authenticate and create a session.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

#### POST /api/auth/logout
End the current session.

#### GET /api/auth/me
Get the current authenticated user.

---

## Products

### GET /api/products
List products with optional filters.

**Query Parameters:**
- `q` — Search by name or short description
- `category` — Filter by category slug (supports child categories)
- `type` — `FRESH` | `SEASONED` | `PREPARED` | `OTHER`
- `sort` — `featured` (default) | `name` | `price-asc` | `price-desc` | `newest`
- `page` — Page number (default: 1)
- `pageSize` — Items per page, 1–100 (default: 24)
- `available` — Filter available only (`true`/`false`)
- `min` / `max` — Price range in cents

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Whole Chicken",
      "slug": "whole-chicken",
      "sku": "WC-001",
      "price": 4500,
      "salePrice": null,
      "effectivePrice": 4500,
      "hasSale": false,
      "currency": "TTD",
      "pricingType": "PER_LB",
      "unit": "lb",
      "isAvailable": true,
      "imageUrl": "/images/whole-chicken.jpg",
      "categoryName": "Poultry · Fresh",
      "categorySlug": "poultry-fresh"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 24,
    "total": 50
  }
}
```

### GET /api/products/[slug]
Get a single product by slug with its variants.

---

## Cart
Cart state is stored server-side and keyed by a `cart_token` cookie (guest) or the session (authenticated).

### GET /api/cart
Get the current cart.

**Response:**
```json
{
  "data": {
    "id": 1,
    "items": [
      {
        "id": 1,
        "productId": 5,
        "productName": "Chicken Breast",
        "quantity": 2,
        "unit": "lb",
        "subtotal": 50,
        "notes": null
      }
    ],
    "subtotal": 50,
    "itemCount": 2
  }
}
```

### POST /api/cart
Add an item to the cart.

**Request Body:**
```json
{
  "productId": 5,
  "variantId": null,
  "quantity": 2,
  "notes": "Please debone (optional)"
}
```

### PATCH /api/cart/items/[id]
Update a cart item's quantity.

**Request Body:**
```json
{
  "quantity": 3
}
```

### DELETE /api/cart/items/[id]
Remove an item from the cart.

---

## Orders

### POST /api/orders
Create a new order.

**Request Body:**
```json
{
  "fulfilmentType": "PICKUP",
  "branchId": 1,
  "deliveryAddress": null,
  "deliveryCity": null,
  "deliveryLandmark": null,
  "desiredDate": null,
  "paymentMethod": "CASH_ON_PICKUP",
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+1 868-555-0100",
  "notes": "Cut instructions"
}
```

**Response:**
```json
{
  "data": {
    "id": 1,
    "orderNumber": "KPS-260912-0001",
    "orderStatus": "PENDING",
    "paymentStatus": "PENDING",
    "total": 150
  }
}
```

### GET /api/orders
List orders for the authenticated user.

### GET /api/orders/[id]
Get a single order. Requires ownership or admin permission.

### POST /api/orders/[id]/cancel
Cancel an order (PENDING or CONFIRMED only).

### POST /api/orders/lookup
Look up a guest order by number and email.

**Request Body:**
```json
{
  "orderNumber": "KPS-260912-0001",
  "email": "john@example.com"
}
```

---

## Admin Endpoints
All admin endpoints require admin role authentication.

### Order Management

#### PATCH /api/admin/orders/[id]/status
Update order status.

**Request Body:**
```json
{
  "status": "CONFIRMED" | "PREPARING" | "READY" | "OUT_FOR_DELIVERY" | "COMPLETED"
}
```

#### PATCH /api/admin/orders/[id]/payment
Update payment status.

**Request Body:**
```json
{
  "status": "PENDING" | "PAID" | "FAILED" | "REFUNDED"
}
```

#### POST /api/admin/orders/[id]/cancel
Cancel an order and restore inventory.

### Product Management

#### PATCH /api/admin/products/[id]
Update product details.

**Request Body:**
```json
{
  "name": "string",
  "price": 4500,
  "salePrice": 4000,
  "stockQuantity": 100,
  "trackInventory": true,
  "isAvailable": true,
  "isActive": true
}
```

#### DELETE /api/admin/products/[id]
Soft-delete a product (sets `isActive = false`).

---

## Error Responses
All errors follow this format:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid quantity: must be at least 0.5",
    "details": []
  }
}
```

**Error Codes:**
- `VALIDATION_ERROR` — Invalid input data
- `UNAUTHORIZED` — Authentication required
- `FORBIDDEN` — Insufficient permissions
- `NOT_FOUND` — Resource not found
- `CONFLICT` — Business rule violation
- `RATE_LIMITED` — Too many requests
- `BAD_REQUEST` — Malformed request
- `CSRF_FAILED` — CSRF token missing or invalid

---

## Rate Limiting
- Default: 100 requests per minute per IP
- Auth endpoints: 10 requests per minute
- Rate limit headers included in responses:
  - `X-RateLimit-Remaining`
  - `X-RateLimit-Reset`

---

## Webhooks (Future)
Order status updates can trigger webhooks to external services. Configure in admin settings.