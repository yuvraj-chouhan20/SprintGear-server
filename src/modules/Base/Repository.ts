import { FindOptions, Model, ModelStatic, WhereOptions } from "sequelize";
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
