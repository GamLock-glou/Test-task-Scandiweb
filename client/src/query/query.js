import {gql} from '@apollo/client';

export const GET_ALL_CURRENCIES = gql`
  query{
    currencies{
      label, symbol
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
query{
    categories {
      name
    }
  }
`;

export const GET_ONE_CATEGORY = gql`
query Category($input: CategoryInput) {
  category(input: $input) {
    name, products {
      id,
      name,
      inStock,
      gallery,
      attributes {
        id,
        items {
          value
        }
      }
      category,
      prices {
        currency {
          label, symbol
        },
        amount
      },
      brand
    }
  }
}
`;

export const GET_ONE_PRODUCT = gql`
query Product($id: String!) {
  product(id: $id) {
    id,
    name,
    inStock,
    gallery,
    description,
    category,
    attributes {
      id,
      name,
      type,
      items {
        displayValue, value, id
      },
    },
    prices {
      amount,
      currency {
        symbol, label
      }
    },
    brand
  }
}
`;
