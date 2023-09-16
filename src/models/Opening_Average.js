import Sequelize, { Model,DataTypes } from "sequelize";

class Opening_Average extends Model {
  static init(sequelize) {
    super.init(
      {
        SYMBOL: {
        type: DataTypes.STRING(100),
        allowNull: false,
        },
        AVERAGE: {
        type: DataTypes.FLOAT,
        allowNull: false,
        },
        GENERATIONDATE: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      },
      {
        sequelize,
        timestamps: true, //If it's false do not add the attributes (updatedAt, createdAt).
        //paranoid: true, //If it's true, it does not allow deleting from the bank, but inserts column deletedAt. Timestamps need be true.
        //underscored: true, //If it's true, does not add camelcase for automatically generated attributes, so if we define updatedAt it will be created as updated_at.
        freezeTableName: true, //If it's false, it will use the table name in the plural. Ex: Users
        tableName: 'Opening Average' //Define table name
      }
    );

    return this;
  }

}

export default Opening_Average;