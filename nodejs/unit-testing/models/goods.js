'use strict';
module.exports = (sequelize, DataTypes) => {
  const Goods = sequelize.define('Goods', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false
    },
    name: DataTypes.STRING,
    category: DataTypes.STRING
  }, {
    initialAutoIncrement: 10000
  });
  return Goods;
};