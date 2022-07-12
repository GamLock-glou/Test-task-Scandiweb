import {AttributeSet, Price, Product} from './types';

export function getPrice(prices: Price[], currency: string, isPrice:boolean=true) {
  const price = prices.find((price) => {
    if (price.currency.label !== currency) {
      return false;
    } else {
      return price;
    }
  });
  if (isPrice) {
    return price!.currency.symbol+price!.amount;
  }
  return {symbol: [price!.currency.symbol], amount: price!.amount};
}

export function getTotal(products: any, currency: string) {
  let total = 0;
  let curr = '$';
  products.forEach( (product) => {
    const price = Object.values(getPrice(product.prices, currency, false));
    total += +price[1] * product.productCount;
    curr = price[0];
  });
  return total ? curr + total.toFixed(2) : 0;
}

export function getAttributes(attributes: AttributeSet[]) {
  return attributes.reduce((prev, now) => {
    const attr = prev;
    attr[now.id] = now.items[0].value;
    return attr;
  }, {});
}

export function getProductsCount(products) {
  return products.reduce((prev, now) => {
    return now.productCount + prev;
  }, 0);
}
export function getFilterAttributs(products: Product[]) {
  const attributesFilter: Record<string, any[]> = {};
  products.forEach((product) => {
    product.attributes.forEach((attribute) => {
      let attributeID = attributesFilter[attribute.id];
      if (!attributeID) {
        attributesFilter[attribute.id] = [];
        attributeID = attributesFilter[attribute.id];
      }
      attribute.items.forEach((item) => {
        attributeID.push(item.value);
      });
    });
  });
  Object.keys(attributesFilter).forEach( (key) => {
    attributesFilter[key] = Array.from(new Set(attributesFilter[key]));
  },
  );
  return attributesFilter;
}

export function getTags(tags: Record<string, any[]>) {
  const tagsMass = Object.keys(tags).map((tag) => {
    return tags[tag].map((item) => {
      return item;
    });
  });
  return tagsMass.flat();
}

export function getTagsFromQueryParamsUrl() {
  const params = Object.fromEntries(new URLSearchParams(window.location.search).entries());
  const keysParams = Object.keys(params);
  const newTags = {};
  keysParams.forEach((keyParams)=>{
    const newKey = keyParams.split('+')[0];
    if (!newTags[newKey]) {
      newTags[newKey] = [params[keyParams]];
    } else {
      newTags[newKey] = [...newTags[newKey], params[keyParams]];
    }
  });
  return newTags;
}

export function isShowTag(tags: Record<string, any[]>) {
  const yesNo = ['yes', 'no'];
  const newCountTags = Object.values(tags).flat()
      .filter((tag: any)=> !yesNo.includes(tag.toLowerCase())).length;
  if (!newCountTags) return false;
  return true;
}

export function isShowFilter(tags: Record<string, any[]>) {
  return !!Object.values(tags).flat().length;
}

export function isTagAvailableAttribute(product: Product) {
  const params = Object.fromEntries(new URLSearchParams(window.location.search).entries());
  const keysParams = Object.keys(params);
  const newTags = getTagsFromQueryParamsUrl();
  const findEquality = (array1, array2) => array2.some((element) => array1.includes(element));
  if (!keysParams.length) {
    return true;
  }
  return product.attributes.some((attribute)=>{
    if (newTags.hasOwnProperty(attribute.id)) {
      return findEquality(attribute.items.map((item)=> item.value), newTags[attribute.id]);
    }
  });
}

export function clearURLSearchParams(tags: Record<string, any[]>) {
  const url = new URL(document.location.href);
  Object.keys(tags).forEach((index) => {
    tags[index].forEach((tag)=>{
      url.searchParams.delete(`${index}+${tag}`);
    });
  });
  history.pushState( '', '', url.href);
};
