module.exports = (sequelize: any, DataTypes: any) => {
  const Account = sequelize.define("Account", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    balance: {
      type: DataTypes.STRING,
    }
  }, {
    timestamps: false,
    tableName: "Accounts",
  })
  return Account;
}
