const models = require("../../database/models");
const { generateToken } = require("./generateToken");
const e = require("cors");

exports.signup = async (ctx) => {
  const { USER_INFO, state } = JSON.parse(ctx.request.body.result).dataMap;
  const newStudent = {
    studentNumber: USER_INFO.ku_std_no,
    kaistUid: USER_INFO.kaist_uid,
    korName: USER_INFO.ku_kname,
    engName: USER_INFO.displayname,
    affiliation: USER_INFO.ku_acad_name,
  };
  var record = await models.Student.findOne({ where: newStudent });
  if (record || state === process.env.REGISTER_KEY) {
    if (!record) {
      record = await models.Student.create(newStudent);
      const studentId = record.id;
      const payments = await models.Payment.findAll({
        where: { studentNumber: record.studentNumber },
      });
      console.log(payments);
      await Promise.all(
        payments.map(async (payment) => {
          payment.StudentId = studentId;
          await payment.save();
        })
      );
    } else {
    }
    const token = await generateToken({ id: record.id });
    ctx.cookies.set(process.env.ACCESS_TOKEN, token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      overwrite: true,
    });
    ctx.redirect(`${process.env.WEB_FRONTEND}/web/main`);
  } else {
    ctx.redirect(`${process.env.WEB_FRONTEND}/web/auth/agreement/login`);
  }
};

exports.logout = async (ctx) => {
  ctx.cookies.set(process.env.ACCESS_TOKEN, "", { overwrite: true });
  ctx.status = 200;
};

exports.check = async (ctx) => {
  ctx.assert(ctx.request.user, 401);
  const { id } = ctx.request.user;
  const student = await models.Student.findOne({ where: { id } });
  ctx.assert(student, 401);
  ctx.body = {
    auth: "student",
    name: student.korName || student.engName,
  };
};
