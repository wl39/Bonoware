import { stockxCatalog } from "./stockx-catalog";
import type { Database, News, Product } from "./types";
import catalogBatch from "./stockx-batch.json";
import { normalizeStyleCode } from "./product-index";

export const DEMO_EMAIL = "demo@probe.local";
export const DEMO_PASSWORD = "Probe1234!";
export const SIZES = [240, 245, 250, 255, 260, 265, 270, 275, 280, 285, 290];
export const imagePath = (name: string) =>
  name.startsWith("https://images.stockx.com/images/")
    ? name
    : `${import.meta.env.BASE_URL}images/${name}`;

const definitions = [
  [
    "jordan-unc",
    "Jordan",
    "Air Jordan 1",
    "Off-White University Blue",
    "AQ0818-148",
    "jordan-blue.jpg",
    "#dce9ef",
    229000,
    1380000,
    8.2,
  ],
  [
    "yeezy-butter",
    "Adidas",
    "Yeezy Boost 350 V2",
    "Butter",
    "F36980",
    "yeezy-butter.jpg",
    "#f0eedb",
    289000,
    298000,
    -2.1,
  ],
  [
    "jordan-gym",
    "Jordan",
    "Air Jordan 1 Retro High",
    "Black Gym Red",
    "555088-061",
    "jordan-red.jpg",
    "#eadfe0",
    199000,
    245000,
    3.4,
  ],
  [
    "terra-offwhite",
    "Nike",
    "Zoom Terra Kiger 5",
    "Off-White White · W",
    "CD8179-100",
    "terra.jpg",
    "#e4e7de",
    209000,
    315000,
    5.6,
  ],
  [
    "ultraboost",
    "Adidas",
    "Ultra Boost 4.0",
    "Game of Thrones White Walkers",
    "EE3708",
    "ultraboost.jpg",
    "#e2e9ed",
    239000,
    189000,
    -1.3,
  ],
  [
    "yeezy-antlia",
    "Adidas",
    "Yeezy Boost 350 V2",
    "Antlia",
    "FV3250",
    "yeezy-antlia.jpg",
    "#e9e8d5",
    289000,
    268000,
    2.8,
  ],
  [
    "presto",
    "Nike",
    "Air Presto",
    "Off-White Black",
    "AA3830-002",
    "presto.jpg",
    "#e5e4e2",
    179000,
    765000,
    4.7,
  ],
  [
    "fear-of-god",
    "Nike",
    "Air Fear of God 1",
    "Black",
    "AR4237-001",
    "fear-of-god.jpg",
    "#e3e2df",
    399000,
    890000,
    -3.2,
  ],
  [
    "force-volt",
    "Nike",
    "Air Force 1 Low",
    "Off-White Volt · Archive Drop",
    "AO4606-700",
    "force-volt.jpg",
    "#e8edcc",
    199000,
    580000,
    0,
  ],
  [
    "footscape",
    "Nike",
    "Air Footscape",
    "Comme des Garçons · Archive Drop",
    "917242-001",
    "footscape.jpg",
    "#e1e0dc",
    229000,
    320000,
    0,
  ],
] as const;

export const CATALOG_REVISION = 2;

export function createSeed(now = new Date()): Database {
  const dateAt = (days: number) =>
    new Date(now.getTime() + days * 86400000).toISOString();
  const priceHistory = (price: number, index: number) =>
    Array.from({ length: 12 }, (_, i) => ({
      date: dateAt(-33 + i * 3),
      price:
        Math.round(
          (price * (0.88 + i * 0.01 + Math.sin(i * 1.7 + index) * 0.045)) /
            1000,
        ) * 1000,
    }));
  const products: Product[] = definitions.map((d, index) => ({
    id: d[0],
    brand: d[1],
    name: d[2],
    subtitle: d[3],
    model: d[4],
    image: d[5],
    color: d[6],
    retail: d[7],
    price: d[8],
    change: d[9],
    popular: 980 - index * 73,
    upcoming: index >= 8,
    releaseDate: dateAt(index >= 8 ? (index - 7) * 3 : -30 - index),
    description: `${d[1]}의 아카이브에서 만나는 ${d[2]}. ${d[3]} 컬러의 독특한 디테일과 실루엣을 살펴보세요. 원본 Bonoware 프로젝트의 이미지를 활용한 체험용 상품입니다.`,
    sizes: SIZES,
    history: priceHistory(d[8], index),
  }));
  for (const item of stockxCatalog) {
    products.push({
      ...item,
      releaseDate: item.releaseDate + "T12:00:00.000Z",
      upcoming: false,
      sizes: SIZES,
      retail: null,
      change: 0,
      color: "#f3f3f3",
      history: priceHistory(item.price, products.length),
    });
  }
  for (const item of catalogBatch) {
    products.push({
      id: item.id,
      brand: item.brand,
      name: item.name,
      subtitle: "",
      model: item.sku,
      image: item.image,
      price: item.price,
      releaseDate: item.releaseDate + "T12:00:00.000Z",
      sourceUrl:
        item.sourceUrl ||
        `https://stockx.com/search?s=${encodeURIComponent(item.sku)}`,
      retailUsd: item.retailUsd,
      upcoming: false,
      sizes: SIZES,
      retail: null,
      popular: Math.max(
        1,
        525 - (products.length - definitions.length - stockxCatalog.length),
      ),
      change: 0,
      color: "#f3f3f3",
      description: `${item.brand} · ${item.sku}`,
      history: priceHistory(item.price, products.length),
    });
  }
  return {
    version: 2,
    catalogRevision: CATALOG_REVISION,
    products,
    accounts: [],
    orders: [],
    session: null,
    offers: products
      .filter((p) => !p.upcoming)
      .flatMap((p, i) =>
        SIZES.map((size, j) => ({
          id: `stock-${p.id}-${size}`,
          productId: p.id,
          userId: "market",
          size,
          price: p.price! + ((j + i) % 4) * 5000,
          condition: "new" as const,
          status: "on_sale" as const,
          createdAt: dateAt(-3),
        })),
      ),
    comments: [
      {
        id: "comment-seed",
        productId: "jordan-unc",
        userId: "community",
        author: "PROBE 에디터",
        text: "오래된 아카이브를 다시 꺼내보는 즐거움. 여러분의 위시리스트는 무엇인가요?",
        createdAt: dateAt(-1),
      },
    ],
  };
}

// Existing v2 stores contain user orders and listings. Only append the new
// catalog rows and their initial inventory; never replenish an existing shoe.
export function upgradeCatalog(db: Database) {
  if ((db.catalogRevision ?? 0) >= CATALOG_REVISION) return;
  const seed = createSeed();
  const existing = new Set(db.products.map((product) => product.id));
  const styleCodes = new Set(
    db.products.map((product) => normalizeStyleCode(product.model)),
  );
  const additions = seed.products.filter(
    (product) =>
      product.sourceUrl &&
      !existing.has(product.id) &&
      !styleCodes.has(normalizeStyleCode(product.model)),
  );
  const addedIds = new Set(additions.map((product) => product.id));
  db.products.push(...additions);
  db.offers.push(
    ...seed.offers.filter((offer) => addedIds.has(offer.productId)),
  );
  db.catalogRevision = CATALOG_REVISION;
}

export const news: News[] = [
  {
    id: "archive",
    title: "시간이 지나도, 좋은 스니커즈는 남는다.",
    category: "ARCHIVE",
    image: "jordan-blue.jpg",
    summary: "Bonoware의 아카이브에서 다시 발견한 아이코닉한 실루엣들.",
    paragraphs: [
      "스니커즈를 고르는 기준은 저마다 다릅니다. 처음 신었던 날의 기억, 매력적인 컬러, 혹은 그 안에 담긴 이야기. PROBE는 그 취향이 시작되는 곳입니다.",
      "이 데모는 기존 프로젝트에 보관된 스니커즈 이미지를 사용합니다. 화면에 표시되는 가격과 거래 내역은 기능 체험을 위한 가상 데이터이며, 실제 시세나 발매 정보를 나타내지 않습니다.",
      "마음에 드는 상품을 관심 목록에 담고, 사이즈별 가격을 비교해보세요. 구매와 판매 흐름도 실제 결제 없이 직접 체험할 수 있습니다.",
    ],
  },
  {
    id: "size-guide",
    title: "나에게 맞는 한 켤레를 찾는 방법",
    category: "GUIDE",
    image: "yeezy-butter.jpg",
    summary: "사이즈 선택부터 구매 확인까지, 첫 거래를 위한 작은 가이드.",
    paragraphs: [
      "상품 상세에서 사이즈를 선택하면 구매 가능한 매물과 상태, 가격을 볼 수 있습니다. 같은 모델이라도 사이즈와 매물 상태에 따라 가격이 달라집니다.",
      "관심 상품은 로그인 후 저장할 수 있습니다. 주문을 완료하면 마이페이지에서 구매 내역과 배송 정보를 확인하고 취소할 수 있습니다.",
      "판매 등록에서는 모델과 사이즈, 상품 상태, 판매 금액을 입력합니다. 등록한 매물은 해당 상품 상세에 바로 반영됩니다. 모든 거래는 이 브라우저 안에서만 이뤄지는 모의 거래입니다.",
    ],
  },
  {
    id: "collaboration",
    title: "경계를 넘는 디자인, 협업의 매력",
    category: "CULTURE",
    image: "terra.jpg",
    summary: "익숙한 실루엣에 새로운 관점이 더해질 때.",
    paragraphs: [
      "서로 다른 디자인 언어가 만나면 익숙한 신발도 새로운 표정을 갖게 됩니다. 기능적인 아웃솔과 실험적인 소재, 작은 타이포그래피가 만들어내는 차이를 발견해보세요.",
      "발매 일정의 아카이브 드롭은 기능 체험을 위해 만들어진 가상 일정입니다. 알림 저장 기능을 사용하면 관심 목록에서 다시 확인할 수 있습니다.",
    ],
  },
];
