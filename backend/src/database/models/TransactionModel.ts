module.exports = (sequelize: any, DataTypes: any) => {
  const Transaction = sequelize.define("Transaction", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    debitedAccountId: {
      allowNull: false,
      foreignKey: true,
      type: DataTypes.INTEGER,
    },
    creditedAccountId: {
      allowNull: false,
      foreignKey: true,
      type: DataTypes.INTEGER,
    },
    value: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    updatedAt: false
  })

  Transaction.associate = (models: any) => {
    Transaction.belongsTo(models.Account, { foreignKey: 'debitedAccountId' })
    Transaction.belongsTo(models.Account, { foreignKey: 'creditedAccountId' })
  }
  return Transaction
}

