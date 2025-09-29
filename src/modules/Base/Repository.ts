import { QueryTypes, CreationAttributes, FindOptions, InferAttributes, InferCreationAttributes, Model, ModelStatic, WhereOptions, Attributes } from "sequelize";
import { MakeNullishOptional } from "sequelize/types/utils";

class BaseRepository{
  /**
   * Chexk already exist  category
   * @returns
   */
  async checkAlreadyExist<T extends Model>(Model: ModelStatic<T>, query?: FindOptions<T>): Promise<T | null > {
    try {
      const existedItem = await Model.findOne(query);
      if(existedItem){
        return existedItem;
      }
      return null;
    } catch (error) {
      console.log("Error in checkAlreadyExist", error);
      throw error;
    }
  }

  async addData<T extends Model>(Model: ModelStatic<T>, data: MakeNullishOptional<T["_creationAttributes"]>): Promise<null | Attributes<T>>{
    try {
      const newData: Attributes<T> = await Model.create(data)
      if(newData){
        return newData;
      }
      return null;
    } catch (error) {
      console.log("Error in add Data", error);
      throw error;
    }
  }

  async getListingData<T extends Model>(Model: ModelStatic<T>, query: FindOptions<T> , projection?: any, paginationOptions?: { limit?: number, offset?: number }): Promise<T[]> {
    try {
      const data = await Model.findAll({
        ...query,
        ...paginationOptions
      });
      return data;
    } catch (error) {
      console.log("Error in getListingData", error);
      throw error;
    }
  }

  async deleteData<T extends Model>(Model: ModelStatic<T>, query?: FindOptions<T>): Promise<number | null>{
    try {
      const deletedItem = await Model.destroy(query);
      if(deletedItem){
        return deletedItem;
      }
      return null;
    } catch (error) {
      console.log("Error in deleteData", error);
      throw error;
    }
  }

}

export default BaseRepository;
