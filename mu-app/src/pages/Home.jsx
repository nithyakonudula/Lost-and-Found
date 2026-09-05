import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Package, Plus, Send } from "lucide-react";
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
  const [reportMessage, setReportMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [report, setReport] = useState({
    name: "",
    type: "Lost",
    phone: "",
    image: "",
  });

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

  const submitReport = async (event) => {
    event.preventDefault();
    setReportMessage("");

    if (!isSupabaseConfigured) {
      setReportMessage("Connect Supabase before submitting an item.");
      return;
    }

    setIsSubmitting(true);
    const { data, error: insertError } = await supabase
      .from("lost-and-found")
      .insert({
        product_name: report.name.trim(),
        user_phno: report.phone.trim(),
        img_url: report.image.trim(),
      })
      .select("product_id, product_name, user_phno, img_url")
      .single();

    if (insertError) {
      setReportMessage(`Unable to submit report: ${insertError.message}`);
    } else {
      setItems((currentItems) => [normalizeItem(data), ...currentItems]);
      setReport({ name: "", type: "Lost", phone: "", image: "" });
      setReportMessage(`${report.type} item reported successfully.`);
    }

    setIsSubmitting(false);
  };

  // Loading state
  if (loading) {
    return (
      <main className="theme-page min-h-screen">
        <div className="mx-auto max-w-6xl p-6 text-center">
          <p className="theme-muted">Loading items...</p>
        </div>
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <main className="theme-page min-h-screen">
        <div className="mx-auto max-w-6xl p-6 text-center">
          <p className="theme-accent">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="theme-page min-h-screen">
      <div className="mx-auto max-w-6xl p-6">

        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="theme-gradient-text text-3xl font-bold">
            Lost & Found
          </h1>

          <p className="theme-muted mt-2 text-sm">
            Browse through the items that have been lost or found.
          </p>
        </div>

        {/* Empty State */}
        {items.length === 0 ? (
          <div className="theme-surface theme-border flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed">
            <Package
              size={50}
              className="theme-accent mb-4 opacity-50"
            />

            <h2 className="theme-text text-lg font-semibold">
              No items available
            </h2>

            <p className="theme-muted mt-2 text-sm">
              There are currently no lost or found items.
            </p>
          </div>
        ) : (

          /* Products Grid */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

            {items.map((item, index) => (
              <div
                key={item.id ?? `item-${index}`}
                className="theme-surface group overflow-hidden rounded-2xl border shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* Image */}
                <div className="theme-soft-surface h-52 overflow-hidden">

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
                  <h2 className="theme-text text-lg font-bold">
                    {item.name}
                  </h2>

                  {/* Product ID */}
                  <p className="theme-muted mt-1 text-sm">
                      Product ID: {item.id}
                  </p>

                  {/* Phone */}
                  <div className="theme-muted mt-4 flex items-center gap-2 text-sm">
                    <Phone size={16} />

                    <span>
                      {item.contact}
                    </span>
                  </div>

                  {/* Bottom */}
                  <div className="theme-border mt-5 border-t pt-4">

                    <Link
                      to={`/item/${item.id}`}
                      className="theme-accent flex items-center justify-between text-sm font-medium transition hover:brightness-75"
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

        <section id="report" className="theme-surface theme-border mt-12 rounded-3xl border p-6 shadow-sm md:p-8">
          <div className="mb-6 flex items-start gap-4">
            <div className="theme-logo flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white">
              <Plus size={20} />
            </div>
            <div>
              <h2 className="theme-text text-2xl font-bold">Report a lost or found item</h2>
              <p className="theme-muted mt-1 text-sm">Add an item to the Supabase table for everyone to find.</p>
            </div>
          </div>

          <form onSubmit={submitReport} className="grid gap-4 md:grid-cols-2">
            <label className="theme-muted text-sm font-medium">
              Item name
              <input
                required
                value={report.name}
                onChange={(event) => setReport({ ...report, name: event.target.value })}
                className="theme-input theme-text theme-border mt-2 w-full rounded-xl border bg-transparent px-4 py-3 outline-none"
                placeholder="e.g. Samsung Earbuds"
              />
            </label>

            <label className="theme-muted text-sm font-medium">
              Report type
              <select
                value={report.type}
                onChange={(event) => setReport({ ...report, type: event.target.value })}
                className="theme-select theme-border mt-2 w-full rounded-xl border bg-transparent px-4 py-3 outline-none"
              >
                <option>Lost</option>
                <option>Found</option>
              </select>
            </label>

            <label className="theme-muted text-sm font-medium">
              Contact number
              <input
                required
                type="tel"
                value={report.phone}
                onChange={(event) => setReport({ ...report, phone: event.target.value })}
                className="theme-input theme-text theme-border mt-2 w-full rounded-xl border bg-transparent px-4 py-3 outline-none"
                placeholder="Your phone number"
              />
            </label>

            <label className="theme-muted text-sm font-medium">
              Image URL
              <input
                required
                type="url"
                value={report.image}
                onChange={(event) => setReport({ ...report, image: event.target.value })}
                className="theme-input theme-text theme-border mt-2 w-full rounded-xl border bg-transparent px-4 py-3 outline-none"
                placeholder="https://example.com/item.jpg"
              />
            </label>

            <div className="flex flex-wrap items-center gap-4 md:col-span-2">
              <button type="submit" disabled={isSubmitting} className="theme-button inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60">
                <Send size={17} />
                {isSubmitting ? "Submitting..." : "Submit report"}
              </button>
              {reportMessage && <p className="theme-muted text-sm">{reportMessage}</p>}
            </div>
          </form>
        </section>

      </div>
    </main>
  );
}





