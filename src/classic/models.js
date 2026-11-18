import { imagePath, news } from "../app/seed";
const korean = {
  "jordan-unc": "에어 조던 1 오프화이트 유니버시티 블루",
  "yeezy-butter": "이지 부스트 350 V2 버터",
  "jordan-gym": "에어 조던 1 블랙 짐 레드",
  "terra-offwhite": "나이키 줌 테라 카이거 5 오프화이트",
  ultraboost: "아디다스 울트라 부스트 화이트 워커",
  "yeezy-antlia": "이지 부스트 350 V2 안틀리아",
  presto: "나이키 에어 프레스토 오프화이트 블랙",
  "fear-of-god": "나이키 에어 피어 오브 갓 1",
  "force-volt": "나이키 에어 포스 1 오프화이트 볼트",
  footscape: "나이키 에어 풋스케이프",
};
export function classicProduct(db, p) {
  const stock = db.offers.filter(
    (o) => o.productId === p.id && o.status === "on_sale",
  );
  const latestSale = db.orders.reduce((latest, order) => {
    if (
      order.productId === p.id &&
      order.status === "confirmed" &&
      (!latest || order.createdAt >= latest.createdAt)
    )
      return order;
    return latest;
  }, null);
  return {
    _id: p.id,
    name: `${p.name} ${p.subtitle}|${p.koreanName || korean[p.id] || p.name}`,
    image: [imagePath(p.image)],
    brand: p.brand.toLowerCase(),
    lastSalePrice: latestSale?.price ?? null,
    sourceUrl: p.sourceUrl,
    retailUsd: p.retailUsd,
    lowestPrice: stock.length ? Math.min(...stock.map((o) => o.price)) : 0,
    releasePrice: p.retail,
    releaseDate: p.releaseDate,
    stockCount: stock.length,
    model: p.model,
    color: p.colorway || p.subtitle,
    designer: "",
    description: p.description,
  };
}
export const classicAccount = (user, following = []) => ({
  ...user,
  nick_name: user.name,
  following,
  name: user.name,
  shoe_size: 270,
  phone: "010-0000-0000",
  address: "서울시 가상구 프로브로 123",
  detail: "데모 배송지",
  post_code: "00000",
  point: 0,
  bank: "데모 은행",
  account: "000000",
  account_number: "000000",
});
const articles = [
  ...news,
  ...[
    "클래식 실루엣을 다시 만나다",
    "매일 신는 한 켤레의 이야기",
    "다음 아카이브 드롭 안내",
  ].map((title, i) => ({ ...news[i], id: `archive-${i + 1}`, title })),
];
export const classicNews = () =>
  articles.map((n, i) => ({
    _id: n.id,
    title: n.title,
    writer: "PROBE",
    postDate: new Date(Date.now() - i * 86400000).toISOString(),
    viewCount: 120 + i * 30,
    image: [imagePath(n.image)],
    body: n.paragraphs,
    contents: n.summary,
  }));
