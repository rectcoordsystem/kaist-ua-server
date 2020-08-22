const models = require("../../database/models");
const SSOClient = require("../../utils/sso");
const { parseJSON } = require("../../utils");

exports.login = async (ctx) => {
  const { url, state } = SSOClient.getLoginParams("login");
  //ctx.request.state = ctx.request.header.referrer; //요청을 보낸곳의 url
  //ctx.response.session.state = state;
  ctx.redirect(url);
};

exports.register = async (ctx) => {
  const body = ctx.request.body;
  await models.user.create(body);
};

exports.signUp = async (ctx) => {
  //const stateBefore = ctx.request.session.state;

  console.log(ctx);
  const { result, success, user_id, k_uid, state } = ctx.request.body;

  // if (stateBefore !== state) {
  //   ctx.status = 401;
  //   ctx.body = {
  //     error: "TOKEN MISMATCH",
  //   };
  // }

  const userData = getUserData(result);

  const user = await models.user.findOne({
    where: { kaist_uid: userData.kaist_uid },
  });

  const path = state.split(",")[0];

  if (path == "login") {
    if (!user) {
      //login 시도 + DB에 저장된 정보 없을시 -> 개인정보 처리 동의 화면으로 Redirect
      ctx.redirect("https://student.kaist.ac.kr/web/auth/agreement");
    } else {
      //login 시도 + DB에 저장된 정보 있을시 -> 유저 정보 업데이트 후, 로그인 성공
      //메인 화면으로 redirect
      //todo : 원래 로그인 전에 유저가 있던 페이지로 redirect
      await models.user.update(userData, {
        where: {
          kaist_uid: userData.kaist_uid,
        },
      });
      ctx.body = {
        user: userData,
        access_token: user.access_token,
      };

      ctx.redirect("https://student.kaist.ac.kr/web/main");
    }
  } else if (path == "register") {
    //register 시도 + DB에 저장된 정보 없을시
    //user DB에 저장하고 메인 화면으로 redirect! 로그인 성공!
    if (!user) {
      const registeredUser = await models.user.create(userData);
      console.log(models.user.create(userData));

      ctx.body = {
        user: userData,
        access_token: registeredUser.access_token,
      };

      ctx.redirect("https://student.kaist.ac.kr/web/main");
    } else {
      console.log(user);
      ctx.body = {
        user: userData,
        access_token: user.access_token,
        message: "이미 가입한 적 있는 회원입니다!",
      };

      ctx.redirect("https://student.kaist.ac.kr/web/main");
    }
  } else {
    console.error("WRONG STATE!");
  }
};

const getUserData = (userData) => {
  const json = parseJSON(userData);

  const info = json.dataMap.USER_INFO;

  return {
    ku_std_no: info.ku_std_no,
    kaist_uid: info.kaist_uid,
    ku_employee_number: info.ku_employee_number,
    displayname: info.displayname,
    ku_acad_name: info.ku_acad_name,
    ku_kname: info.ku_kname,
  };
};
/**
 * ctx.body
 * {
  result: '{"dataMap":{"USER_INFO":{"ku_std_no":"20180419","kaist_uid":"00094223","ku_employee_number":null,"displayname":"YOON, JUNSUNG","ku_acad_name":"School of Computing","ku_kname":"윤준성"},"state":"1959a19786cb1e96b326","REDIRECT_URL":"https://student.kaist.ac.kr/web/api/auth/signup"},"error":false,"errorCode":null,"errorMessage":null}',
  success: 'true',
  user_id: 'yoonjs0510',
  k_uid: '00094223',
  state: '1959a19786cb1e96b326'
}
 */
