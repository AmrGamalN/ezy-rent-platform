const emailHeader = (): string => `
  <div style="background-color: rgb(0, 0, 0); padding: 10px;">
    <table align="center" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
      <tr>
        <td style="vertical-align: middle;">
          <a href="${process.env.Eazy_Rent_FRONT_END_URL}">
            <img src="${process.env.SEND_EMAIL_IMAGE}" alt="Eazy Rent" style="max-width: 120px; display: block;" />
          </a>
        </td>
        <td style="vertical-align: middle; padding-left: 10px;">
          <div style="color: white; font-size: 24px; font-weight: bold;">
            "Eazy Rent"
          </div>
        </td>
      </tr>
    </table>
  </div>
`;

const emailFooter = (): string => `
  <div style="width: 100%; margin-top: 30px; font-size: 12px; color: gray; text-align: center;">
    <p>Eazy Rent 2025 ©</p>
    <p>Eazy Rent is a registered trademark of Eazy Rent.</p>
    <p style="margin-top: 10px;">
      <strong>Follow us on: </strong>
      <a href="${process.env.Eazy_Rent_FACEBOOK_URL}" style="margin: 0 5px;">
        <img src="https://cdn-icons-png.flaticon.com/24/174/174848.png" alt="Facebook" style="width: 16px; vertical-align: middle;" />
      </a>
      <a href="${process.env.Eazy_Rent_INSTAGRAM_URL}" style="margin: 0 5px;">
        <img src="https://cdn-icons-png.flaticon.com/24/174/174855.png" alt="Instagram" style="width: 16px; vertical-align: middle;" />
      </a>
      <a href="${process.env.Eazy_Rent_TWITTER_URL}" style="margin: 0 5px;">
        <img src="https://cdn-icons-png.flaticon.com/24/733/733579.png" alt="Twitter" style="width: 16px; vertical-align: middle;" />
      </a>
    </p>
  </div>
`;

export const sendVerifyEmail = (link: string, userName: string): string => `
  ${emailHeader()}
  <p style="margin-top: 30px;">Hello, ${userName}</p>

  <p>Hey there from Eazy Rent!</p>
  <p>Thanks a bunch for signing up — we’re excited to have you with us.</p>
  <p>Just one last step: please confirm your email address below.</p>

  <div style="text-align: center;">
    <a href="${link}" style="
      display: inline-block;
      background-color:rgb(5, 137, 3);
      color: white;
      padding: 10px 20px;
      text-decoration: none;
      margin: 20px auto;
      border-radius: 4px;
      font-weight: bold;
    ">
      Validate email address
    </a>
  </div>

  <p>Do you want to know more about us? Follow our crazy adventures on Facebook, Twitter or Instagram!</p>
  <p>Don't hesitate to contact us if you have questions, suggestions or simply give us any feedback.</p>
  <p>Have a wonderful day,</p>
  ${emailFooter()}
`;

export const sendResetPasswordEmail = (
  otp: string,
  userName: string,
): string => `
  ${emailHeader()}

  <p style="margin-top: 30px;">Hello, ${userName}</p>

  <p>We received a request to reset your password for your <strong>Eazy Rent</strong> account.</p>
  <p>Please use the verification code below to reset your password:</p>

  <div style="
    text-align: center;
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
    margin: 20px auto;
    width: fit-content;
    font-size: 28px;
    font-weight: bold;
    letter-spacing: 6px;
    color: rgb(5, 137, 3);
    border: 2px dashed rgb(5, 137, 3);
  ">
    ${otp}
  </div>

  <p>This code is valid for <strong>10 minutes</strong>. Please do not share it with anyone.</p>

  <p>If you didn’t request a password reset, you can safely ignore this email — your password has not been changed.</p>

  <p>All the best,</p>
  ${emailFooter()}
`;
