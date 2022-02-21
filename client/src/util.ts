import { Price } from "./types";

export function getPrice(prices: Price[],currency: string, tf:boolean=true) {
    const price = prices.find(price => {
      if(price.currency.label !== currency)
        return false;
      else
        return price;
    })
    if(tf)
      return price!.currency.symbol+price!.amount;
    return `${price!.amount}`
}