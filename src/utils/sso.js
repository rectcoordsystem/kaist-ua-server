const crypto = require("crypto");

class Client {
  getLoginParams(str) {
    const state = str.concat(",", crypto.randomBytes(10).toString("hex"));
    const params = {
      client_id: "KAIPEDIA",
      redirect_url: "https://student.kaist.ac.kr/web/main",
      state,
    };
    const url = [
      "https://iam2.kaist.ac.kr/api/sso/commonLogin",
      Object.entries(params)
        .map((e) => e.join("="))
        .join("&"),
    ].join("?");
    return { url, state };
  }
}

module.exports = new Client();
