export const toBRL = (value: string) => {
    const format = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 3,
    })

    return format.format(parseFloat(value))
}
