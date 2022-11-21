const { User, Account } = require('../database/models')

const getUser = async (username: string) => {
  const validUser = await User.findAll({
    where: { username },
    attributes: { exclude: ["password", "id"] }
  });
  return validUser;
};

const getPassword = async (password: string) => {
  const validPassword = await User.findAll({
    where: { password },
    attributes: { exclude: ["accountId", "username", "id"] }
  });
  return validPassword;
};

const getAll = async () => {
  const validUser = await User.findAll()
  return validUser;
}

export const UserUtils = {
  getUser,
  getPassword,
  getAll,
}