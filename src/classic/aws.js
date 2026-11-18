export class Lambda {
  invoke(params, callback) {
    if (params.FunctionName === "UpdateSearch")
      callback(null, { StatusCode: 200, Payload: "{}" });
    else callback(new Error("지원하지 않는 데모 요청입니다."));
  }
}
export default { Lambda };
