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
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-xl px-6 py-20 text-center">
          <p className="text-gray-500">
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
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-xl px-6 py-20 text-center">

          <Package
            size={55}
            className="mx-auto mb-5 text-gray-300"
          />

          <h2 className="text-2xl font-bold text-gray-900">
            Item Not Found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            No matching product was found.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
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
    <main className="min-h-screen bg-gray-50">

      <div className="mx-auto max-w-6xl px-6 py-10">

        {/* Back Button */}

        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-black"
        >
          <ArrowLeft size={18} />
          Back to Products
        </Link>


        {/* Main Details Card */}

        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

          <div className="grid lg:grid-cols-2">


            {/* -------------------------------- */}
            {/* Product Image */}
            {/* -------------------------------- */}

            <div className="h-80 bg-gray-100 lg:h-full lg:min-h-[550px]">

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

              <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                {item.name}
              </h1>


              {/* Description */}

              <p className="mt-4 leading-7 text-gray-600">
                This item has been listed on the Lost & Found
                platform. If this item belongs to you, please
                contact the person using the contact information
                provided below.
              </p>


              {/* -------------------------------- */}
              {/* Product Information */}
              {/* -------------------------------- */}

              <div className="mt-8 space-y-5 border-t border-gray-100 pt-7">


                {/* Product ID */}

                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">

                    <Package
                      size={20}
                      className="text-gray-600"
                    />

                  </div>

                  <div>

                    <p className="text-xs text-gray-400">
                      Product ID
                    </p>

                    <p className="mt-1 font-medium text-gray-900">
                      {item.id}
                    </p>

                  </div>

                </div>


                {/* Product Name */}

                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">

                    <Package
                      size={20}
                      className="text-gray-600"
                    />

                  </div>

                  <div>

                    <p className="text-xs text-gray-400">
                      Product Name
                    </p>

                    <p className="mt-1 font-medium text-gray-900">
                      {item.name}
                    </p>

                  </div>

                </div>


                {/* Contact */}

                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">

                    <Phone
                      size={20}
                      className="text-gray-600"
                    />

                  </div>

                  <div>

                    <p className="text-xs text-gray-400">
                      Contact Number
                    </p>

                    <p className="mt-1 font-medium text-gray-900">
                      {item.contact}
                    </p>

                  </div>

                </div>


              </div>


              {/* -------------------------------- */}
              {/* Contact Section */}
              {/* -------------------------------- */}

              <div className="mt-8 rounded-2xl bg-gray-50 p-5">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">

                    <User size={18} />

                  </div>

                  <div>

                    <h2 className="font-semibold text-gray-900">
                      Contact Owner
                    </h2>

                    <p className="text-sm text-gray-500">
                      If this is your item, contact the person
                      who reported it.
                    </p>

                  </div>

                </div>


                {/* Call Button */}

                <a
                  href={`tel:${item.contact}`}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-800"
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









