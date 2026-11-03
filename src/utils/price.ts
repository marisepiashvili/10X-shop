export function getDiscountedPrice(price: number, discountPercentage: number): number {
    return price - (price * discountPercentage) / 100
}

const usdFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })

// $1,299.00 style, with thousands separators
export function formatPrice(value: number): string {
    return usdFormatter.format(value)
}
