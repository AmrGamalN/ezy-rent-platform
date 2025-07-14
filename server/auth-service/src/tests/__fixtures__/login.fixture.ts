// ___________________________ OTP Cases _____________________________

export const validOTP = {
  otp: '',
  status: 200,
  message: 'Login successful',
};

export const otpCases = {
  correct: { otp: '', status: 200 },
  shortOTP: { otp: '79130', status: 401 },
  empty: { otp: '', status: 400, errorMsg: 'otp is required' },
  noToken: {
    otp: '123456',
    status: 401,
    message: 'Invalid token expired, please try again',
  },
  invalidToken: { otp: '123456', status: 401 },
};

// ___________________________ Email Cases _____________________________

export const emailCases = {
  valid: { email: 'amr5189520@gmail.com', status: 200 },
  twoFA: { email: 'agencycar240@gmail.com', status: 200 },
  notFound: {
    email: 'notfounduser@gmail.com',
    status: 404,
  },
  blocked: {
    email: 'jhossam818@gmail.com',
    status: 401,
  },
  deleted: {
    email: 'amr5109520@gmail.com',
    status: 401,
  },
  unverified: {
    email: 'amr5139520@gmail.com',
    status: 401,
  },
};

export const invalidEmails: Record<string, { email: unknown; status: number }> =
  {
    noAtSymbol: { email: 'invalidemail', status: 400 },
    wrongSymbol: { email: 'amr#gmail.com', status: 400 },
    missingDotCom: { email: 'amr123gmail.com', status: 400 },
    noDomain: { email: 'amr123gmail', status: 400 },
    invalidDomain: { email: 'amr123gmail.dcx', status: 400 },
    numberInsteadOfString: { email: 12345678, status: 400 },
    booleanFalse: { email: false, status: 400 },
    nullValue: { email: null, status: 400 },
    undefinedValue: { email: undefined, status: 400 },
    emptyString: { email: '', status: 400 },
    spaceOnly: { email: '   ', status: 400 },
  };

// _____________________________ Password Cases _____________________________

export const passwordCases = {
  valid: 'Amr123456789@',
  cases: {
    missingSpecial: { password: 'Amr123456789', status: [400, 401] },
    missingUppercase: { password: 'amr123456789@', status: [400, 401] },
    missingLowercase: { password: 'AMR123456789@', status: [400, 401] },
    missingNumber: { password: 'AmrPassword@', status: [400, 401] },
    short: { password: 'Amr1234@', status: [400, 401] },
    empty: { password: '', status: [400, 401] },
    tooLong: {
      password: '123456789012345678901234567890123456789012345678901234567',
      status: [400, 401],
    },
    nullValue: { password: null, status: [400, 401] },
    undefinedValue: { password: undefined, status: [400, 401] },
    falseValue: { password: false, status: [400, 401] },
  },
};

// _____________________________ Phone Cases _____________________________

export const validPhone = {
  phoneNumber: '+201200812638',
  status: 200,
  message: 'Login successful',
};

export const phoneCases = {
  twoFA: {
    phoneNumber: '+201200812637',
    status: 200,
  },
  blocked: {
    phoneNumber: '+201200812633',
    status: 401,
  },
  deleted: {
    phoneNumber: '+201200812632',
    status: 401,
  },
  unverified: {
    phoneNumber: '+201200812631',
    status: 401,
  },
  notFound: {
    phoneNumber: '+201200812600',
    status: 404,
  },
};

export const invalidPhones: Record<
  string,
  { phoneNumber: string; status: number }
> = {
  missingPlus: { phoneNumber: '201200812634', status: 400 },
  invalidFormat1: { phoneNumber: '1200812634', status: 400 },
  invalidFormat2: { phoneNumber: '@201200812634', status: 400 },
  invalidFormat3: { phoneNumber: '201200812634#', status: 400 },
  invalidLetters: { phoneNumber: '2012008K12634', status: 400 },
  empty: { phoneNumber: '', status: 400 },
  short: { phoneNumber: '+2010', status: 400 },
  long: { phoneNumber: '+20101234567890', status: 400 },
  withSymbols: { phoneNumber: '+2010-123-4567', status: 400 },
};
