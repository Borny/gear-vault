import type {
  Activity,
  ActivityItem,
  Category,
  Condition,
  Item,
  ItemStock,
  Location,
  Person,
} from "@/types/inventory";

// Mock data drawn from context/inventory.csv. Locations and owners are
// placeholders: the CSV has neither. Replaced by Prisma in a later feature.

export const PEOPLE: Person[] = [
  { id: "tristan", name: "Tristan" },
  { id: "bela", name: "Bela" },
  { id: "elanor", name: "Elanor" },
];

function category(
  id: string,
  name: string,
  icon: string,
  color: string | null = null,
  parentId: string | null = null,
): Category {
  return { id, name, icon, color, parentId };
}

export const CATEGORIES: Category[] = [
  category("hightech", "High-tech", "cpu", "emerald"),
  category("computer", "Computers", "monitor", null, "hightech"),
  category("screen", "Screens", "monitor", null, "hightech"),
  category("console", "Consoles", "gamepad-2", null, "hightech"),
  category("camera", "Cameras", "camera", null, "hightech"),
  category("phone", "Phones", "smartphone", null, "hightech"),
  category("audio", "Audio", "headphones", null, "hightech"),
  category("cable", "Cables", "cable", null, "hightech"),
  category("data-storage", "Data storage", "hard-drive", null, "hightech"),
  category("raspberry-pi", "Raspberry Pi", "cpu", null, "hightech"),
  category("sport", "Sport", "dumbbell", "yellow"),
  category("crossfit", "CrossFit", "dumbbell", null, "sport"),
  category("surf", "Surf", "waves", null, "sport"),
  category("capoeira", "Capoeira", "drum", null, "sport"),
  category("bike", "Bike", "bike", null, "sport"),
  category("snow", "Snow", "snowflake", null, "sport"),
  category("diving", "Diving", "waves", null, "sport"),
  category("music", "Music", "music", "violet"),
  category("camping", "Camping", "tent", "blue"),
  category("sleeping", "Sleeping", "tent", null, "camping"),
  category("cooking", "Cooking", "flame", null, "camping"),
  category("van", "Van", "caravan", "cyan"),
  category("tool", "Tools", "wrench", "orange"),
  category("hand-tool", "Hand tools", "hammer", null, "tool"),
  category("power-tool", "Power tools", "drill", null, "tool"),
  category("electrical", "Electrical", "zap", null, "tool"),
  category("lego", "Lego", "blocks", "red"),
  category("book", "Books", "book-open", "slate"),
  category("story", "Stories", "book-open", null, "book"),
  category("comic", "Comics", "book-open", null, "book"),
  category("language", "Languages", "languages", null, "book"),
  category("magazine", "Magazines", "newspaper", null, "book"),
  category("clothing", "Clothing", "shirt", "pink"),
  category("shoes", "Shoes", "footprints", null, "clothing"),
  category("bag", "Bags", "backpack", "lime"),
  category("container", "Boxes and cases", "boxes", "gray"),
  category("accessory", "Accessories", "watch", "amber"),
  category("stationery", "Stationery", "pen-tool", "teal"),
  category("home", "Home", "sofa", "purple"),
  category("health", "Health", "heart-pulse", "rose"),
];

function location(id: string, name: string, parentId: string | null = null): Location {
  return { id, name, parentId };
}

export const LOCATIONS: Location[] = [
  location("office", "Office"),
  location("office-desk", "Desk", "office"),
  location("office-shelf", "Shelf", "office"),
  location("bedroom", "Bedroom"),
  location("wardrobe", "Wardrobe", "bedroom"),
  location("living-room", "Living room"),
  location("tv-unit", "TV unit", "living-room"),
  location("storage-room", "Storage room"),
  location("shelf-1", "Shelf 1", "storage-room"),
  location("shelf-2", "Shelf 2", "storage-room"),
  location("tool-wall", "Tool wall", "storage-room"),
  location("van-loc", "Van"),
  location("van-rear", "Rear storage", "van-loc"),
  location("van-roof", "Roof box", "van-loc"),
];

interface ItemRow {
  name: string;
  categoryId: string;
  brand?: string;
  condition?: Condition;
  stock?: [locationId: string | null, quantity: number][];
  owners?: string[];
}

const ITEM_ROWS: ItemRow[] = [
  { name: "Surface Pro 6", categoryId: "computer", brand: "Microsoft", stock: [["office-desk", 1]] },
  { name: "Surface Pen", categoryId: "computer", brand: "Microsoft", stock: [["office-desk", 1]] },
  // { name: "Arc Mouse", categoryId: "computer", brand: "Microsoft", stock: [["office-desk", 1]] },
  // { name: "USB-C hub", categoryId: "computer", stock: [["office-desk", 1]] },
  // { name: "Odyssey 4K + arm", categoryId: "screen", brand: "Samsung", stock: [["office-desk", 1]] },
  // { name: "Monitor 1080p 60Hz", categoryId: "screen", brand: "LG", stock: [["office-desk", 1]] },
  // { name: "TV + remote", categoryId: "screen", brand: "Sony", stock: [["tv-unit", 1]], owners: ["tristan", "bela"] },
  // { name: "PS4", categoryId: "console", brand: "Sony", stock: [["tv-unit", 1]] },
  // { name: "PS4 controller", categoryId: "console", brand: "Sony", stock: [["tv-unit", 2]] },
  // { name: "Ghost Recon Breakpoint", categoryId: "console", brand: "Ubisoft", stock: [["tv-unit", 1]] },
  // { name: "GameCube", categoryId: "console", brand: "Nintendo", condition: "WORN", stock: [["shelf-2", 1]] },
  // { name: "Zelda: The Wind Waker", categoryId: "console", brand: "Nintendo", stock: [["shelf-2", 1]] },
  // { name: "GoPro 8", categoryId: "camera", brand: "GoPro", stock: [["office-shelf", 1]] },
  // { name: "GoPro battery", categoryId: "camera", brand: "GoPro", stock: [["office-shelf", 2], ["van-rear", 1]] },
  // { name: "Mini 2 drone", categoryId: "camera", brand: "DJI", stock: [["office-shelf", 1]] },
  // { name: "Mini 2 battery", categoryId: "camera", brand: "DJI", stock: [["office-shelf", 3]] },
  // { name: "Lumix waterproof camera", categoryId: "camera", brand: "Panasonic", stock: [["office-shelf", 1]] },
  // { name: "OnePlus 8", categoryId: "phone", brand: "OnePlus", stock: [["office-desk", 1]] },
  // { name: "Kindle + grey case", categoryId: "hightech", brand: "Amazon", stock: [["bedroom", 1]] },
  // { name: "Go 4 speaker", categoryId: "audio", brand: "JBL", stock: [["van-rear", 1]] },
  // { name: "Tune Beam earbuds", categoryId: "audio", brand: "JBL", stock: [["office-desk", 1]] },
  // { name: "Recon 200 headset", categoryId: "audio", brand: "Turtle Beach", stock: [["tv-unit", 1]] },
  // { name: "HDMI cable", categoryId: "cable", stock: [["office-shelf", 1], ["tv-unit", 1]] },
  // { name: "USB-C to USB cable", categoryId: "cable", stock: [["office-shelf", 3]] },
  // { name: "Ethernet cable, medium", categoryId: "cable", stock: [["shelf-1", 2]] },
  // { name: "T9 external drive 2TB", categoryId: "data-storage", brand: "Samsung", stock: [["office-desk", 1]] },
  // { name: "External SSD 1TB", categoryId: "data-storage", brand: "WD", stock: [["office-shelf", 1]] },
  // { name: "microSD EVO 64GB", categoryId: "data-storage", brand: "Samsung", stock: [["office-shelf", 1]] },
  // { name: "microSD Extreme 64GB", categoryId: "data-storage", brand: "SanDisk", stock: [["office-shelf", 1]] },
  // { name: "Raspberry Pi 3", categoryId: "raspberry-pi", brand: "Raspberry Pi", stock: [["office-shelf", 1]] },
  // { name: "Accessories box", categoryId: "raspberry-pi", brand: "Freenove", stock: [["office-shelf", 1]] },
  // { name: "Motion sensor", categoryId: "raspberry-pi", stock: [["office-shelf", 3]] },
  { name: "Kettlebell 24kg", categoryId: "crossfit", stock: [["shelf-1", 1]] },
  { name: "Kettlebell 8kg", categoryId: "crossfit", stock: [["shelf-1", 1]] },
  // { name: "Dumbbell 22.5kg", categoryId: "crossfit", stock: [["shelf-1", 1]] },
  // { name: "Sandbag 5kg", categoryId: "crossfit", stock: [["shelf-1", 2]] },
  // { name: "Weighted vest", categoryId: "crossfit", stock: [["shelf-1", 1]] },
  // { name: "Jump rope + bag", categoryId: "crossfit", brand: "Gornation", stock: [["van-rear", 1], ["shelf-1", 1]] },
  // { name: "Ab wheel", categoryId: "crossfit", stock: [["shelf-1", 1]] },
  // { name: "RowErg", categoryId: "crossfit", brand: "Concept2", stock: [["living-room", 1]] },
  // { name: "Shortboard", categoryId: "surf", brand: "Pyzel", stock: [["van-roof", 1]] },
  // { name: "Foam board", categoryId: "surf", brand: "Decathlon", condition: "WORN", stock: [["storage-room", 1]] },
  // { name: "Wetsuit 5/4", categoryId: "surf", brand: "C-Skins", stock: [["van-rear", 1]] },
  // { name: "Wetsuit 3/2", categoryId: "surf", brand: "Peak", stock: [["van-rear", 1]] },
  // { name: "Leash", categoryId: "surf", brand: "Dakine", stock: [["van-rear", 1]] },
  // { name: "Surf earplugs", categoryId: "surf", brand: "Surf Ears", stock: [["van-rear", 1]] },
  // { name: "Rashguard, long-sleeved", categoryId: "surf", brand: "Volcom", stock: [["wardrobe", 2]] },
  // { name: "Berimbau", categoryId: "capoeira", stock: [["living-room", 2]] },
  // { name: "Atabaque", categoryId: "capoeira", stock: [["living-room", 1]] },
  // { name: "Pandeiro + case", categoryId: "capoeira", brand: "RMV", stock: [["living-room", 1]] },
  // { name: "Agogô", categoryId: "capoeira", stock: [["living-room", 1]] },
  // { name: "Caxixi, large", categoryId: "capoeira", stock: [[null, 1]] },
  // { name: "Mountain bike", categoryId: "bike", brand: "Rockrider", stock: [["storage-room", 1]] },
  // { name: "Helmet", categoryId: "bike", brand: "Oxelo", stock: [["storage-room", 1]] },
  // { name: "Snowboard + case", categoryId: "snow", stock: [["shelf-2", 1]] },
  // { name: "Snowboard jacket", categoryId: "snow", brand: "The North Face", stock: [["wardrobe", 1]] },
  // { name: "Scuba mask", categoryId: "diving", brand: "Scubapro", stock: [["shelf-2", 1]] },
  // { name: "Fins", categoryId: "diving", brand: "Decathlon", stock: [["shelf-2", 1]] },
  { name: "Violão + case", categoryId: "music", stock: [["living-room", 1]] },
  { name: "Ukulele", categoryId: "music", stock: [["living-room", 1]] },
  // { name: "Guitar capo", categoryId: "music", stock: [[null, 1]] },
  { name: "Tentsile tree tent", categoryId: "sleeping", brand: "Tentsile", stock: [["shelf-2", 1]] },
  { name: "Quick Hiker 2 tent", categoryId: "sleeping", brand: "Quechua", stock: [["van-rear", 1]] },
  // { name: "Ultralight sleeping bag", categoryId: "sleeping", brand: "McKinley", stock: [["shelf-2", 1]] },
  // { name: "Ultralight mattress", categoryId: "sleeping", brand: "Decathlon", stock: [["shelf-2", 1]] },
  // { name: "Mexican hammock", categoryId: "sleeping", stock: [["van-rear", 1]] },
  // { name: "X-Pot + extra lid", categoryId: "cooking", brand: "Sea to Summit", stock: [["shelf-2", 1]] },
  // { name: "X-Cup", categoryId: "cooking", brand: "Sea to Summit", stock: [["shelf-2", 3]] },
  // { name: "PocketRocket stove", categoryId: "cooking", brand: "MSR", stock: [["shelf-2", 1]] },
  // { name: "Gas canister", categoryId: "cooking", stock: [["shelf-2", 2], ["van-rear", 1]] },
  // { name: "TrailShot water filter", categoryId: "cooking", brand: "MSR", stock: [["shelf-2", 1]] },
  // { name: "Knife + case", categoryId: "cooking", brand: "Spyderco", stock: [["shelf-2", 1]] },
  { name: "Fire extinguisher", categoryId: "van", stock: [["van-rear", 1]], owners: ["tristan", "bela"] },
  { name: "Power inverter 200W", categoryId: "van", stock: [["van-rear", 1]], owners: ["tristan", "bela"] },
  // { name: "Foldable chair", categoryId: "van", brand: "Decathlon", stock: [["van-rear", 2]], owners: ["tristan", "bela"] },
  // { name: "Walkie-talkie + headset", categoryId: "van", brand: "Motorola", stock: [["van-rear", 2]] },
  // { name: "Foldable shovel", categoryId: "van", stock: [["van-rear", 1]] },
  // { name: "Beach tent", categoryId: "van", stock: [["van-roof", 1]], owners: ["tristan", "bela"] },
  { name: "Leatherman", categoryId: "hand-tool", brand: "Leatherman", stock: [["van-rear", 1]] },
  { name: "Hammer", categoryId: "hand-tool", brand: "Stanley", stock: [["tool-wall", 1]] },
  // { name: "Spirit level", categoryId: "hand-tool", brand: "Dexter", stock: [["tool-wall", 1]] },
  // { name: "Square ruler", categoryId: "hand-tool", stock: [["tool-wall", 2]] },
  // { name: "Flat screwdriver", categoryId: "hand-tool", stock: [["tool-wall", 2]] },
  // { name: "Heat gun", categoryId: "power-tool", brand: "Bosch", stock: [["shelf-1", 1]] },
  // { name: "Circular saw", categoryId: "power-tool", stock: [["shelf-1", 1]] },
  // { name: "Hammer drill", categoryId: "power-tool", stock: [["shelf-1", 1]] },
  // { name: "Sewing machine", categoryId: "power-tool", brand: "Singer", stock: [["shelf-2", 1]], owners: ["bela"] },
  // { name: "Multimeter", categoryId: "electrical", brand: "Mastech", stock: [["tool-wall", 1]] },
  // { name: "Voltage detector", categoryId: "electrical", brand: "Extel", stock: [["tool-wall", 1]] },
  // { name: "Soldering iron + tin", categoryId: "electrical", stock: [["tool-wall", 1]] },
  // { name: "Electrical tape", categoryId: "electrical", stock: [["tool-wall", 4]] },
  { name: "Millennium Falcon", categoryId: "lego", brand: "Lego", stock: [["office-shelf", 1]] },
  { name: "X-Wing", categoryId: "lego", brand: "Lego", stock: [["office-shelf", 1]], owners: ["elanor"] },
  { name: "The Hobbit", categoryId: "story", stock: [["bedroom", 1]] },
  { name: "The Lord of the Rings", categoryId: "story", stock: [["bedroom", 3]] },
  // { name: "The Silmarillion", categoryId: "story", stock: [[null, 1]] },
  // { name: "Gunnm", categoryId: "comic", stock: [["office-shelf", 1]] },
  // { name: "Le Portugais du Brésil", categoryId: "language", brand: "Assimil", stock: [["office-shelf", 1]] },
  // { name: "Stormrider Guide Europe", categoryId: "magazine", stock: [["van-rear", 1]] },
  { name: "Metcon", categoryId: "shoes", brand: "Nike", stock: [["wardrobe", 1]] },
  { name: "XA Pro 3D", categoryId: "shoes", brand: "Salomon", stock: [["wardrobe", 1]] },
  // { name: "Climbing shoes", categoryId: "shoes", brand: "Millet", stock: [["wardrobe", 1]] },
  // { name: "Flip-flops", categoryId: "shoes", brand: "Havaianas", stock: [["wardrobe", 1], ["van-rear", 1]] },
  { name: "Sling bag", categoryId: "bag", brand: "5.11", stock: [["wardrobe", 1]] },
  { name: "Backpack 30L", categoryId: "bag", brand: "The North Face", stock: [["wardrobe", 1]] },
  // { name: "Suitcase 105L", categoryId: "bag", brand: "Decathlon", stock: [["storage-room", 1]] },
  // { name: "Dry bag 30L", categoryId: "bag", brand: "Itiwit", stock: [["van-rear", 1]] },
  { name: "Toolbox, large", categoryId: "container", brand: "Stanley", stock: [["tool-wall", 1]] },
  { name: "Compartment box", categoryId: "container", brand: "Allit", stock: [["shelf-1", 3]] },
  // { name: "Steel ammunition case", categoryId: "container", stock: [["shelf-1", 1]] },
  // { name: "Plastic box, white", categoryId: "container", brand: "Carrefour", stock: [["shelf-1", 4]] },
  { name: "Actik 450 headlamp", categoryId: "accessory", brand: "Petzl", stock: [["van-rear", 1]] },
  { name: "Watch", categoryId: "accessory", brand: "Fossil", stock: [["bedroom", 1]] },
  // { name: "Sunglasses + case", categoryId: "accessory", brand: "Oakley", stock: [["bedroom", 1]] },
  // { name: "Binoculars", categoryId: "accessory", stock: [[null, 1]] },
  // { name: "Combination lock", categoryId: "accessory", brand: "Master Lock", stock: [["office-desk", 1]] },
  { name: "Paint markers", categoryId: "stationery", brand: "Posca", stock: [["office-desk", 1]] },
  { name: "FriXion pen", categoryId: "stationery", brand: "Pilot", stock: [["office-desk", 5]] },
  // { name: "Stapler", categoryId: "stationery", stock: [["office-desk", 2]] },
  { name: "Wooden giraffe", categoryId: "home", stock: [["living-room", 1]], owners: ["elanor"] },
  { name: "LED lamp bar", categoryId: "home", stock: [["office-desk", 1]] },
  // { name: "Folding chair", categoryId: "home", stock: [["storage-room", 1]], owners: ["elanor"] },
  { name: "Tiger Balm", categoryId: "health", stock: [["bedroom", 1]] },
  { name: "Ankle support", categoryId: "health", brand: "DonJoy", stock: [[null, 1]] },
];

const FIRST_ADDED = Date.UTC(2026, 10, 1);
const HOUR = 60 * 60 * 1000;

export const ITEMS: Item[] = ITEM_ROWS.map((row, index) => ({
  id: `item-${index + 1}`,
  name: row.name,
  description: null,
  brand: row.brand ?? null,
  value: null,
  condition: row.condition ?? null,
  imageKey: null,
  icon: null,
  categoryId: row.categoryId,
  ownerIds: row.owners ?? ["tristan"],
  createdAt: new Date(FIRST_ADDED + index * 5 * HOUR),
}));

export const ITEM_STOCK: ItemStock[] = ITEM_ROWS.flatMap((row, index) =>
  (row.stock ?? [[null, 1]]).map(([locationId, quantity], stockIndex) => ({
    id: `stock-${index + 1}-${stockIndex + 1}`,
    itemId: `item-${index + 1}`,
    locationId,
    quantity,
  })),
);

export const ACTIVITIES: Activity[] = [
  { id: "surf", name: "Surf session", icon: "waves" },
  { id: "camping", name: "Camping trip", icon: "tent" },
  { id: "capoeira", name: "Capoeira roda", icon: "drum" },
  { id: "crossfit", name: "CrossFit at home", icon: "dumbbell" },
  { id: "van-trip", name: "Van trip", icon: "caravan" },
];

function itemId(name: string): string {
  const item = ITEMS.find((candidate) => candidate.name === name);
  if (!item) throw new Error(`Mock activity lists an unknown item: ${name}`);
  return item.id;
}

const ACTIVITY_ROWS: Record<string, [name: string, quantity: number][]> = {
  surf: [
    // ["Shortboard", 1],
    // ["Wetsuit 5/4", 1],
    // ["Leash", 1],
    // ["Surf earplugs", 1],
    // ["Dry bag 30L", 1],
  ],
  camping: [
    ["Quick Hiker 2 tent", 1],
    // ["Ultralight sleeping bag", 1],
    // ["Ultralight mattress", 1],
    // ["PocketRocket stove", 1],
    // ["Gas canister", 1],
    // ["X-Pot + extra lid", 1],
    // ["X-Cup", 2],
    // ["TrailShot water filter", 1],
    ["Actik 450 headlamp", 1],
  ],
  capoeira: [
    // ["Berimbau", 2],
    // ["Pandeiro + case", 1],
    // ["Atabaque", 1],
    // ["Agogô", 1],
  ],
  crossfit: [
    ["Kettlebell 24kg", 1],
    // ["Jump rope + bag", 1],
    // ["Weighted vest", 1],
    // ["RowErg", 1],
  ],
  "van-trip": [
    ["Fire extinguisher", 1],
    ["Power inverter 200W", 1],
    // ["Foldable chair", 2],
    // ["Beach tent", 1],
    // ["Walkie-talkie + headset", 2],
  ],
};

export const ACTIVITY_ITEMS: ActivityItem[] = Object.entries(ACTIVITY_ROWS).flatMap(
  ([activityId, rows]) =>
    rows.map(([name, quantity]) => ({ activityId, itemId: itemId(name), quantity })),
);
