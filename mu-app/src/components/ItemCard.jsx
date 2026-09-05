import { Link } from "react-router-dom";
import { MapPin, CalendarDays, ArrowUpRight } from "lucide-react";

function ItemCard({ item }) {
  return (
    <Link to={`/item/${item.id}`}>
      <div className="theme-surface group overflow-hidden rounded-2xl border transition duration-300 hover:-translate-y-1 hover:shadow-xl">

        {/* Image */}
        <div className="theme-soft-surface relative h-52 overflow-hidden">

          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          {/* Status */}
          <span
            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
              item.type === "Lost"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {item.type}
          </span>

          {/* Arrow */}
          <div className="theme-surface absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full opacity-0 shadow transition group-hover:opacity-100">
            <ArrowUpRight size={18} />
          </div>
        </div>

        {/* Content */}
        <div className="p-5">

          <div className="mb-2 flex items-start justify-between gap-3">
            <div>
              <h2 className="theme-text text-lg font-bold">
                {item.name}
              </h2>

              <p className="theme-muted text-sm">
                {item.model}
              </p>
            </div>

            <span className="theme-soft-surface theme-muted rounded-lg px-2 py-1 text-xs">
              {item.category}
            </span>
          </div>

          <div className="mt-4 space-y-2">

              <div className="theme-muted flex items-center gap-2 text-sm">
              <MapPin size={16} />
              <span>{item.location}</span>
            </div>

              <div className="theme-muted flex items-center gap-2 text-sm">
              <CalendarDays size={16} />
              <span>{item.date}</span>
            </div>

          </div>

          <div className="theme-border mt-5 border-t pt-4">
            <span className="theme-accent text-sm font-semibold">
              View Details →
            </span>
          </div>

        </div>
      </div>
    </Link>
  );
}

export default ItemCard;