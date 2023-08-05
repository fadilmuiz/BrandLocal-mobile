import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
query Query {
  product {
    id
    name
    slug
    description
    price
    mainImg
    categoryId
    authorId
    Category {
      name
    }
    Image {
      imgUrl1
      imgUrl2
      imgUrl3
    }
  }
}`

export const GET_PRODUCT_DETAIL = gql`
query Product($productId: ID) {
  productDetail(productId: $productId) {
    id
    name
    slug
    description
    price
    mainImg
    categoryId
    authorId
    Category {
      name
    }
    Image {
      imgUrl1
      imgUrl2
      imgUrl3
    }
  }
}`