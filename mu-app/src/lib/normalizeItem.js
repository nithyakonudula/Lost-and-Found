export function normalizeItem(item, fallbackId) {
  const source = item ?? {};

  return {
    ...source,
    id: source.product_id ?? source.id ?? fallbackId,
    product_id: source.product_id ?? source.id ?? fallbackId,
    name: source.product_name ?? source.name ?? source.item_name ?? "Unnamed item",
    model: source.model ?? source.brand ?? "",
    category: source.category ?? source.item_category ?? "Others",
    type: source.type ?? source.status ?? "Found",
    location: source.location ?? source.found_location ?? source.lost_location ?? "Unknown location",
    date: source.date ?? source.created_at?.slice(0, 10) ?? "Unknown date",
    description: source.description ?? "No description available.",
    image: source.img_url ?? source.image ?? "/hero.png",
    ownerName: source.ownerName ?? source.owner_name ?? "Unknown",
    contact: source.user_phno ?? source.contact ?? "Not available",
  };
}
