'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      debitedAccountId: {
        allowNull: false,
        foreignKey: true,
        type: Sequelize.INTEGER,
      },
      creditedAccountId: {
        allowNull: false,
        foreignKey: true,
        type: Sequelize.INTEGER,
      },
      value: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }, {
      tableName: "Transactions",
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Transactions")
  }
};
