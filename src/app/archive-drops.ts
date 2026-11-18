import type { Product } from "./types";

// Fixed demo reissues use the corresponding archive model's photo.
const schedule = [
  ["2026-11-28", "jordan-unc", "에어 조던 1 유니버시티 블루"],
  ["2026-12-12", "sx-m1906da", "뉴발란스 1906D 하버 그레이"],
  ["2026-12-26", "yeezy-butter", "이지 부스트 350 V2 버터"],
  ["2027-01-09", "dunk-panda", "덩크 로우 레트로 판다"],
  ["2027-01-23", "sx-l41086600", "살로몬 XT-6 트리플 블랙"],
  ["2027-02-06", "sx-gz9177", "아디다스 캠퍼스 80s 타올리"],
  ["2027-02-20", "jordan-gym", "에어 조던 1 짐 레드"],
  ["2027-03-06", "terra-offwhite", "줌 테라 카이거 5 오프화이트"],
  ["2027-03-20", "sx-a01765c", "컨버스 척 70 스투시 블랙"],
  ["2027-04-10", "ultraboost-reigning-champ", "울트라 부스트 레이닝 챔프"],
  ["2027-04-24", "sx-fb8915400", "에어 맥스 1 발틱 블루"],
  ["2027-05-08", "yeezy-zebra", "이지 부스트 350 V2 지브라"],
  ["2027-05-22", "sx-ml2002rc", "뉴발란스 2002R 마블헤드"],
  ["2027-06-05", "presto", "에어 프레스토 오프화이트 블랙"],
  ["2027-06-19", "sx-b75806", "아디다스 삼바 OG 클라우드 화이트"],
  ["2027-07-10", "f22-grey", "아디다스 F/22 그레이"],
  ["2027-07-24", "sx-553558612", "에어 조던 1 로우 브레드 토"],
  ["2027-08-07", "fear-of-god-sa", "에어 피어 오브 갓 슛 어라운드"],
  ["2027-08-21", "sx-gz9256", "아디다스 NMD R1 트리플 블랙"],
  ["2027-09-04", "yeezy-antlia", "이지 부스트 350 V2 안틀리아"],
  ["2027-09-18", "sx-dv3464002", "에어 포스 1 앰부시 팬텀"],
  ["2027-10-09", "vapormax-offwhite-black", "에어 베이퍼맥스 오프화이트 블랙"],
  ["2027-10-23", "sx-166800c", "컨버스 런 스타 하이크 블랙"],
  ["2027-11-06", "yeezy-oxford-tan", "이지 부스트 350 옥스퍼드 탄"],
  ["2027-11-20", "sx-mr530sg", "뉴발란스 530 화이트 실버 네이비"],
  ["2027-12-11", "ultraboost", "울트라 부스트 화이트 워커"],
  ["2027-12-31", "fear-of-god", "에어 피어 오브 갓 1 블랙"],
] as const;

export function releaseCalendarDay(now = Date.now()) {
  return new Date(now + 9 * 3600000).toISOString().slice(0, 10);
}

export function archiveDrops(catalog: Product[]): Product[] {
  const byId = new Map(catalog.map((product) => [product.id, product]));
  return schedule.map(([day, id, koreanName]) => {
    const model = byId.get(id);
    if (!model) throw new Error(`Missing archive model: ${id}`);
    return {
      id: `drop-${day}-${id}`,
      name: [model.name, model.subtitle].filter(Boolean).join(" "),
      brand: model.brand,
      koreanName,
      subtitle: "Archive Drop",
      model: `DEMO-${day.replaceAll("-", "")}`,
      image: model.image,
      color: model.color,
      colorway: model.colorway,
      releaseDate: day + "T03:00:00.000Z",
      description: `${koreanName}의 데모 재발매 일정입니다.`,
      upcoming: true,
      retail: model.retail,
      sizes: [],
      history: [],
      price: null,
      popular: 0,
      change: 0,
    };
  });
}
