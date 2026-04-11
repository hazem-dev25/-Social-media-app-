import { EventEmitter } from "events";
import emailService from "./email.service";

export const emailEvent = new EventEmitter();



emailEvent.on("send_email", (data) => {
  const { email, name } = data
  const code = Math.floor(100000 + Math.random() * 900000).toString()
let html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Verify</title>
</head>

<body style="
  margin:0;
  padding:0;
  background: radial-gradient(circle at top, #0f172a, #020617);
  font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;
">

  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:50px 20px;">

        <!-- Outer Glow -->
        <table width="420" cellpadding="0" cellspacing="0" style="
          border-radius:20px;
          background: linear-gradient(145deg, #0ea5e9, #9333ea);
          padding:1px;
        ">

          <!-- Inner Card -->
          <tr>
            <td>
              <table width="100%" cellpadding="0" cellspacing="0" style="
                background:#020617;
                border-radius:20px;
                padding:40px;
                color:#e2e8f0;
              ">

                <!-- Header -->
                <tr>
                  <td style="text-align:center; padding-bottom:30px;">
                    <div style="
                      font-size:13px;
                      letter-spacing:2px;
                      color:#64748b;
                    ">
                      SECURE ACCESS
                    </div>

                    <h1 style="
                      margin:10px 0 0;
                      font-size:28px;
                      color:#fff;
                      font-weight:700;
                    ">
                      Welcome, ${name} 👋
                    </h1>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td>
                    <div style="
                      height:1px;
                      background:linear-gradient(to right, transparent, #334155, transparent);
                      margin:20px 0;
                    "></div>
                  </td>
                </tr>

                <!-- Message -->
                <tr>
                  <td style="
                    font-size:15px;
                    color:#94a3b8;
                    text-align:center;
                    line-height:1.6;
                    padding-bottom:25px;
                  ">
                    Use the code below to unlock your access.<br/>
                    This code expires in <strong style="color:#38bdf8;">5 minutes</strong>.
                  </td>
                </tr>

                <!-- CODE (Hero Section) -->
                <tr>
                  <td align="center" style="padding:30px 0;">
                    <div style="
                      display:inline-block;
                      padding:18px 30px;
                      font-size:32px;
                      letter-spacing:10px;
                      font-weight:800;
                      color:#38bdf8;
                      background:#020617;
                      border-radius:14px;
                      border:1px solid #1e293b;
                      box-shadow:
                        0 0 20px rgba(56,189,248,0.4),
                        inset 0 0 10px rgba(56,189,248,0.2);
                    ">
                      ${code}
                    </div>
                  </td>
                </tr>

                <!-- CTA -->
                <tr>
                  <td align="center" style="padding:10px 0 30px;">
                    <a href="#" style="
                      text-decoration:none;
                      display:inline-block;
                      padding:14px 30px;
                      font-size:14px;
                      font-weight:600;
                      color:#020617;
                      background:linear-gradient(135deg, #38bdf8, #6366f1);
                      border-radius:10px;
                      box-shadow:0 10px 25px rgba(99,102,241,0.4);
                    ">
                      Verify Account →
                    </a>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="
                    text-align:center;
                    font-size:12px;
                    color:#475569;
                  ">
                    If you didn’t request this, just ignore it.<br/>
                    Your account is still safe.
                  </td>
                </tr>

              </table>
            </td>
          </tr>

        </table>

        <!-- Bottom text -->
        <div style="
          font-size:11px;
          color:#334155;
          margin-top:20px;
        ">
          Powered by "Hazem_App" ⚡
        </div>

      </td>
    </tr>
  </table>

</body>
</html>
`

  emailService.sendEmail(email, "Your Verification Code", html)

})


emailEvent.on("varify_email", (data) => {

    const { email, name} = data

    let html = `
"🎉 Your Email is Verified!",
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Verified</title>
</head>

<body style="
  margin:0;
  padding:0;
  background: radial-gradient(circle at top, #022c22, #020617);
  font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;
">

  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:50px 20px;">

        <!-- Glow Border -->
        <table width="420" cellpadding="0" cellspacing="0" style="
          border-radius:20px;
          background: linear-gradient(135deg, #22c55e, #38bdf8);
          padding:1px;
        ">

          <!-- Card -->
          <tr>
            <td>
              <table width="100%" cellpadding="0" cellspacing="0" style="
                background:#020617;
                border-radius:20px;
                padding:40px;
                color:#e2e8f0;
              ">

                <!-- Header -->
                <tr>
                  <td align="center" style="padding-bottom:25px;">
                    <div style="
                      font-size:50px;
                      line-height:1;
                      margin-bottom:10px;
                    ">
                      ✅
                    </div>

                    <h1 style="
                      margin:0;
                      font-size:26px;
                      color:#22c55e;
                      font-weight:700;
                    ">
                      Email Verified!
                    </h1>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td>
                    <div style="
                      height:1px;
                      background:linear-gradient(to right, transparent, #334155, transparent);
                      margin:20px 0;
                    "></div>
                  </td>
                </tr>

                <!-- Message -->
                <tr>
                  <td style="
                    font-size:15px;
                    color:#94a3b8;
                    text-align:center;
                    line-height:1.6;
                    padding-bottom:30px;
                  ">
                    Hey <strong style="color:#fff;">${name}</strong> 👋<br/>
                    Your email has been successfully verified.<br/>
                    You're now ready to explore everything we built for you 🚀
                  </td>
                </tr>

                <!-- CTA -->
                <tr>
                  <td align="center" style="padding-bottom:30px;">
                    <a href="#" style="
                      text-decoration:none;
                      display:inline-block;
                      padding:14px 30px;
                      font-size:14px;
                      font-weight:600;
                      color:#020617;
                      background:linear-gradient(135deg, #22c55e, #4ade80);
                      border-radius:10px;
                      box-shadow:0 10px 25px rgba(34,197,94,0.4);
                    ">
                      Start Exploring →
                    </a>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="
                    text-align:center;
                    font-size:12px;
                    color:#475569;
                  ">
                    You're all set. Let’s build something great 💚
                  </td>
                </tr>

              </table>
            </td>
          </tr>

        </table>

        <!-- Bottom -->
        <div style="
          font-size:11px;
          color:#334155;
          margin-top:20px;
        ">
          Welcome aboard ⚡
        </div>

      </td>
    </tr>
  </table>

</body>
</html>
    `

    emailService.sendEmail(email, "Your Verification Code", html)
})