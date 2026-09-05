import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Package } from "lucide-react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { normalizeItem } from "../lib/normalizeItem";

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState(
    isSupabaseConfigured
      ? ""
      : "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY (or VITE_SUPABASE_ANON_KEY) to .env.local.",
  );

  useEffect(() => {
    if (!isSupabaseConfigured) {
      return;
    }

    async function fetchItems() {
      const { data, error } = await supabase
        .from("lost-and-found")
        .select("product_id, product_name, user_phno, img_url")
        .order("product_id", { ascending: true });

      if (error) {
        console.error("Error fetching items:", error);
        setError(`Unable to load Supabase items: ${error.message}`);
      } else {
        setItems((data || []).map((item, index) => normalizeItem(item, index)));
      }

      setLoading(false);
    }

    fetchItems();
  }, []);

  // Loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-6xl p-6 text-center">
          <p className="text-gray-500">Loading items...</p>
        </div>
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-6xl p-6 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl p-6">

        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Lost & Found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Browse through the items that have been lost or found.
          </p>
        </div>

        {/* Empty State */}
        {items.length === 0 ? (
          <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white">
            <Package
              size={50}
              className="mb-4 text-gray-300"
            />

            <h2 className="text-lg font-semibold text-gray-900">
              No items available
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              There are currently no lost or found items.
            </p>
          </div>
        ) : (

          /* Products Grid */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

            {items.map((item, index) => (
              <div
                key={item.id ?? `item-${index}`}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* Image */}
                <div className="h-52 overflow-hidden bg-gray-100">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/600x400?text=No+Image";
                    }}
                  />

                </div>

                {/* Card Content */}
                <div className="p-5">

                  {/* Product Name */}
                  <h2 className="text-lg font-bold text-gray-900">
                    {item.name}
                  </h2>

                  {/* Product ID */}
                  <p className="mt-1 text-sm text-gray-400">
                      Product ID: {item.id}
                  </p>

                  {/* Phone */}
                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                    <Phone size={16} />

                    <span>
                      {item.contact}
                    </span>
                  </div>

                  {/* Bottom */}
                  <div className="mt-5 border-t border-gray-100 pt-4">

                    <Link
                      to={`/item/${item.id}`}
                      className="flex items-center justify-between text-sm font-medium text-blue-600 transition hover:text-blue-800"
                    >
                      <span>View Details</span>

                      <ArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </Link>

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}





