const models = require("../../database/models");
const SSOClient = require("../../utils/sso");

exports.login = async (ctx) => {
  const { url, state } = SSOClient.getLoginParams();
  console.log(ctx.request);

  ctx.request.state = ctx.request.header.referrer; //요청을 보낸곳의 url
  ctx.redirect(url);

  console.log(ctx);
};

exports.signUp = async (ctx) => {
  //1. user table에 존재하는 user인지 아닌지 판단
  const {
    ku_std_no,
    kaist_uid,
    ku_employee_number,
    displayname,
    ku_acad_name,
    ku_kname,
    user_id,
    k_uid,
    state,
  } = ctx.request.body;
  const user = await models.user.findOne({ where: { kaist_uid } });
  const loginUser = {
    ku_std_no: ku_std_no,
    kaist_uid: kaist_uid,
    ku_employee_number,
    ku_employee_number,
    displayname: displayname,
    ku_acad_name: ku_acad_name,
    ku_kname: ku_kname,
    user_id: user_id,
    k_uid: k_uid,
  };

  //1-1 존재하지 않음
  // db에 주어진 정보를 저장
  if (!user) {
    await models.user.create(loginUser);
  }

  //1-2 존재함
  //모든 정보가 일치하는지 확인
  //일치하지 않는 부분을 update
  else {
    await models.user.update(loginUser, {
      where: { kaist_uid: kaist_uid },
    });
  }

  //2. 본래 url + access_Token을 함께 응답으로 보냄
  ctx.body = {
    user: loginUser,
    access_token: user.access_token,
  };

  ctx.redirect();

  console.log(ctx.request);
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
