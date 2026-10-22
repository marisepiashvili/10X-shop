export function getDiscountedPrice(price: number, discountPercentage: number) {
    return price - (price * discountPercentage) / 100
}

export function formatPrice(value: number) {
    return `$${value.toFixed(2)}`
}
