import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Phone,
  Package,
  User,
} from "lucide-react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { normalizeItem } from "../lib/normalizeItem";

export default function ItemDetail() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      return;
    }

    async function fetchItem() {
      const { data, error } = await supabase
        .from("lost-and-found")
        .select("product_id, product_name, user_phno, img_url")
        .eq("product_id", id)
        .single();

      if (error) {
        console.error("Error fetching item:", error);
        setItem(null);
      } else {
        setItem(normalizeItem(data, id));
      }

      setLoading(false);
    }

    fetchItem();
  }, [id]);

  // -----------------------------
  // Loading
  // -----------------------------

  if (loading) {
    return (
      <main className="theme-page min-h-screen">
        <div className="mx-auto max-w-xl px-6 py-20 text-center">
          <p className="theme-muted">
            Loading item details...
          </p>
        </div>
      </main>
    );
  }

  // -----------------------------
  // Item Not Found
  // -----------------------------

  if (!item) {
    return (
      <main className="theme-page min-h-screen">
        <div className="mx-auto max-w-xl px-6 py-20 text-center">

          <Package
            size={55}
            className="theme-accent mx-auto mb-5 opacity-50"
          />

          <h2 className="theme-text text-2xl font-bold">
            Item Not Found
          </h2>

          <p className="theme-muted mt-2 text-sm">
            No matching product was found.
          </p>

          <Link
            to="/"
            className="theme-button mt-6 inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium text-white transition"
          >
            <ArrowLeft size={17} />
            Back to Products
          </Link>

        </div>
      </main>
    );
  }

  // -----------------------------
  // Item Details
  // -----------------------------

  return (
    <main className="theme-page min-h-screen">

      <div className="mx-auto max-w-6xl px-6 py-10">

        {/* Back Button */}

        <Link
          to="/"
          className="theme-muted mb-8 inline-flex items-center gap-2 text-sm font-medium transition hover:brightness-75"
        >
          <ArrowLeft size={18} />
          Back to Products
        </Link>


        {/* Main Details Card */}

        <div className="theme-surface theme-border overflow-hidden rounded-3xl border shadow-sm">

          <div className="grid lg:grid-cols-2">


            {/* -------------------------------- */}
            {/* Product Image */}
            {/* -------------------------------- */}

            <div className="theme-soft-surface h-80 lg:h-full lg:min-h-[550px]">

              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/800x600?text=No+Image";
                }}
              />

            </div>


            {/* -------------------------------- */}
            {/* Product Information */}
            {/* -------------------------------- */}

            <div className="p-7 md:p-10">


              {/* Product ID */}

              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">

                <Package size={15} />

                Product ID: {item.id}

              </div>


              {/* Product Name */}

              <h1 className="theme-text text-3xl font-bold md:text-4xl">
                {item.name}
              </h1>


              {/* Description */}

              <p className="theme-muted mt-4 leading-7">
                This item has been listed on the Lost & Found
                platform. If this item belongs to you, please
                contact the person using the contact information
                provided below.
              </p>


              {/* -------------------------------- */}
              {/* Product Information */}
              {/* -------------------------------- */}

              <div className="theme-border mt-8 space-y-5 border-t pt-7">


                {/* Product ID */}

                <div className="flex items-center gap-4">

                  <div className="theme-soft-surface flex h-11 w-11 items-center justify-center rounded-xl">

                    <Package
                      size={20}
                      className="theme-accent"
                    />

                  </div>

                  <div>

                    <p className="theme-muted text-xs">
                      Product ID
                    </p>

                    <p className="theme-text mt-1 font-medium">
                      {item.id}
                    </p>

                  </div>

                </div>


                {/* Product Name */}

                <div className="flex items-center gap-4">

                  <div className="theme-soft-surface flex h-11 w-11 items-center justify-center rounded-xl">

                    <Package
                      size={20}
                      className="theme-accent"
                    />

                  </div>

                  <div>

                    <p className="theme-muted text-xs">
                      Product Name
                    </p>

                    <p className="theme-text mt-1 font-medium">
                      {item.name}
                    </p>

                  </div>

                </div>


                {/* Contact */}

                <div className="flex items-center gap-4">

                  <div className="theme-soft-surface flex h-11 w-11 items-center justify-center rounded-xl">

                    <Phone
                      size={20}
                      className="theme-accent"
                    />

                  </div>

                  <div>

                    <p className="theme-muted text-xs">
                      Contact Number
                    </p>

                    <p className="theme-text mt-1 font-medium">
                      {item.contact}
                    </p>

                  </div>

                </div>


              </div>


              {/* -------------------------------- */}
              {/* Contact Section */}
              {/* -------------------------------- */}

              <div className="theme-soft-surface mt-8 rounded-2xl p-5">

                <div className="flex items-center gap-3">

                  <div className="theme-surface flex h-10 w-10 items-center justify-center rounded-full">

                    <User size={18} />

                  </div>

                  <div>

                    <h2 className="theme-text font-semibold">
                      Contact Owner
                    </h2>

                    <p className="theme-muted text-sm">
                      If this is your item, contact the person
                      who reported it.
                    </p>

                  </div>

                </div>


                {/* Call Button */}

                <a
                  href={`tel:${item.contact}`}
                  className="theme-button mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-medium text-white transition"
                >

                  <Phone size={18} />

                  Call {item.contact}

                </a>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}









