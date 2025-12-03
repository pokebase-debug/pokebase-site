const domain = process.env.SHOPIFY_STORE_DOMAIN;
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

if (!domain || !accessToken) {
  console.warn("Shopify env variables are missing");
}

async function shopifyFetch(query, variables = {}) {
  const res = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": accessToken,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Shopify fetch failed", await res.text());
    throw new Error("Shopify request failed");
  }

  const json = await res.json();

  if (json.errors) {
    console.error("Shopify GraphQL errors", json.errors);
    throw new Error("Shopify GraphQL error");
  }

  return json.data;
}

export async function getProducts(limit = 12) {
  const query = `
    query GetProducts($limit: Int!) {
      products(first: $limit) {
        edges {
          node {
            id
            title
            handle
            description
            productType
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch(query, { limit });
  return data.products.edges.map((edge) => edge.node);
}
