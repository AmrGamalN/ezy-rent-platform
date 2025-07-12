// ____________________________ Register Cases _____________________________
const registerData = {
  password: [
    '123',
    'password',
    'amr12345679@',
    'amr123456789',
    'amr12345@',
    '',
    'AMR123456789@',
    'Amr 123456789@',
    '  ',
    null,
    undefined,
    false,
    [],
  ],
  username: [
    '123456',
    '#$@!',
    123456789,
    '',
    'amr@#$',
    'amr_gamal',
    'am',
    null,
    undefined,
  ],
  confirmPassword: [
    'wrongPass123',
    'notMatching',
    'Amr123456789',
    null,
    undefined,
  ],
  terms: [12346, '@#$%', false, null, undefined, '', 0, '0'],
};

// ____________________________ Register Email Cases _____________________________

export const validRegisterEmail = {
  email: 'amr5879520@gmail.com',
  password: 'Amr123456789@',
  username: 'amr gamal',
  confirmPassword: 'Amr123456789@',
  terms: true,
};

export const invalidRegisterEmail = {
  email: [
    'invalidemail',
    'amr#gmail.com',
    'amr123gmail.com',
    'amr123gmail',
    'amr123gmail.dcx',
    12345678,
    false,
    null,
    undefined,
  ],
  password: [...registerData.password],
  username: [...registerData.username],
  confirmPassword: [...registerData.confirmPassword],
  terms: [...registerData.terms],
};

// ____________________________ Register Phone Cases _____________________________

export const validRegisterPhone = {
  phoneNumber: '+201200812674',
  password: 'Amr123456789@',
  username: 'amr gamal',
  confirmPassword: 'Amr123456789@',
  terms: true,
};

export const invalidRegisterPhone = {
  phoneNumber: [
    '201200812637',
    '',
    '#201200812637',
    'amr',
    123456789,
    '2012008126389',
    'amr123456789',
    '+20120081263',
    null,
    undefined,
    false,
  ],
  password: [...registerData.password],
  username: [...registerData.username],
  confirmPassword: [...registerData.confirmPassword],
  terms: [...registerData.terms],
};
