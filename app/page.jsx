import { getProducts } from "../lib/shopify";

export default async function Home() {
  const products = await getProducts(12);

  return (
    <main
      style={{
        minHeight: "100vh",
        margin: 0,
        padding: "2rem",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        background: "#050816",
        color: "#f9fafb",
      }}
    >
      <header
        style={{
          maxWidth: "960px",
          margin: "0 auto 2rem auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1 style={{ fontSize: "2.2rem", margin: 0 }}>PokeBase</h1>
          <p style={{ marginTop: "0.5rem", color: "#9ca3af" }}>
            Pokémon TCG sealed ürünler ve single kartlar – koleksiyonculardan
            koleksiyonculara.
          </p>
        </div>
        <span
          style={{
            fontSize: "0.8rem",
            padding: "0.25rem 0.6rem",
            borderRadius: "999px",
            border: "1px solid #4b5563",
            color: "#9ca3af",
          }}
        >
          Beta
        </span>
      </header>

      <section style={{ maxWidth: "960px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>Ürünler</h2>

        {(!products || products.length === 0) && (
          <p style={{ color: "#9ca3af" }}>
            Henüz ürün bulunamadı. Shopify panelinden ürün eklediğinde burada
            görünecek.
          </p>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {products.map((product) => {
            const image = product.images?.edges?.[0]?.node;
            const price = product.priceRange?.minVariantPrice;

            return (
              <article
                key={product.id}
                style={{
                  borderRadius: "1rem",
                  border: "1px solid #1f2937",
                  background: "#020617",
                  padding: "0.75rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <div
                  style={{
                    borderRadius: "0.75rem",
                    background: "#0f172a",
                    overflow: "hidden",
                    aspectRatio: "3 / 4",
                  }}
                >
                  {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={image.url}
                      alt={image.altText || product.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#6b7280",
                        fontSize: "0.8rem",
                      }}
                    >
                      No image
                    </div>
                  )}
                </div>

                <h3
                  style={{
                    fontSize: "0.95rem",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  {product.title}
                </h3>

                <p
                  style={{
                    margin: 0,
                    fontSize: "0.75rem",
                    color: "#6b7280",
                  }}
                >
                  {product.productType || "Pokemon Product"}
                </p>

                {price && (
                  <p
                    style={{
                      margin: "0.25rem 0 0.5rem 0",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      color: "#f97316",
                    }}
                  >
                    {price.amount} {price.currencyCode}
                  </p>
                )}

                <a
                  href={`https://${process.env.SHOPIFY_STORE_DOMAIN}/products/${product.handle}`}
                  style={{
                    marginTop: "auto",
                    display: "inline-block",
                    textAlign: "center",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    padding: "0.4rem 0.8rem",
                    borderRadius: "999px",
                    background:
                      "linear-gradient(135deg, #f97316, #ec4899)",
                    color: "#020617",
                    textDecoration: "none",
                  }}
                >
                  Shopify’da incele
                </a>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
