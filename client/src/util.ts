import { Price } from "./types";

export function getPrice(prices: Price[],currency: string, isPrice:boolean=true) {
    const price = prices.find(price => {
      if(price.currency.label !== currency)
        return false;
      else
        return price;
    })
    if(isPrice)
      return price!.currency.symbol+price!.amount;
    return {symbol:[price!.currency.symbol], amount: price!.amount}
}

export function getTotal(products: any, currency: string) {
  
  let total = 0;
  let curr = "$"
  products.forEach( (product) => {
      const price = Object.values(getPrice(product.prices, currency, false));
      total += +price[1] * product.productCount;
      curr = price[0]
  })
  return total ? curr + total.toFixed(2) : 0;
}