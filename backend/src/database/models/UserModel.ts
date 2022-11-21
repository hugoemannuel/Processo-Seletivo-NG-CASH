
module.exports = (sequelize: any, DataTypes: any) => {
  const User = sequelize.define("User", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    accountId: {
      allowNull: false,
      foreignKey: true,
      type: DataTypes.INTEGER,
    },
  }, {
    timestamps: false,
    tableName: "Users",
  });

  User.associate = (models: any) => {
    User.belongsTo(models.Account,
      { foreignKey: 'accountId', as: 'account' });
  };

  return User;
};

