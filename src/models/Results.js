import Sequelize, { Model,DataTypes } from "sequelize";

class Results extends Model {
  static init(sequelize) {
    super.init(
      {
        QUERY: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        NUMBERCOINS: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        PROFIT: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        GROWTHFACTOR: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        LAMBOS: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        INVESTMENT: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        SYMBOL: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        GENERATIONDATE: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true, //If it's false do not add the attributes (updatedAt, createdAt).
        //paranoid: true, //If it's true, it does not allow deleting from the bank, but inserts column deletedAt. Timestamps need be true.
        //underscored: true, //If it's true, does not add camelcase for automatically generated attributes, so if we define updatedAt it will be created as updated_at.
        freezeTableName: true, //If it's false, it will use the table name in the plural. Ex: Users
        tableName: 'Results' //Define table name
      }
    );

    return this;
  }

}

export default Results;