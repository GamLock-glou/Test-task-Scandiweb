import { Price } from "./types";

export function getPrice(prices: Price[],currency: string) {
    const price = prices.find(price => {
      if(price.currency.label !== currency)
        return false;
      else
        return price;
    })
    return price!.currency.symbol+price!.amount;
}

