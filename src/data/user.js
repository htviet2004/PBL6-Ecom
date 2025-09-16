// user.js
export const USERS = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'htviet4961@gmail.com',
    password: '123456',
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'b@gmail.com',
    password: 'abcdef',
  },
]

export function getUserByEmail(email) {
  return USERS.find(u => u.email === email)
}
