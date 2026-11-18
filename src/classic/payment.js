// Payment SDKs are never loaded. The existing checkout calls the local order API directly.
export default {
  request() {
    throw new Error("실제 결제는 지원하지 않는 로컬 데모입니다.");
  },
};
