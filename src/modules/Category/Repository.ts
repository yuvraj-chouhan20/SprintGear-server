import { InferAttributes, QueryOptions } from "sequelize";
import { Category } from "./Model";
import BaseRepository from "../Base/Repository";

class Repository extends BaseRepository{

  data?: InferAttributes<Category>;
  query?: any;

  constructor(data?: InferAttributes<Category>, query?: QueryOptions){
    super();
    this.data = data;
    this.query = query;
  }


  /**
   * Add category
   * @param datas
   * @returns
   */
  async addCategory(): Promise<Category | null> {
    const category: Category | null = await Category.create(this.data!);
    if(category){
      return category;
    }
    return null;
  }

  /**
   * Update category
   * @param data
   * @param query
   * @returns
   */
  async updateCategory(data: InferAttributes<Category>, query?: any): Promise<number | null> {
    const [rowsUpdated]: any = await Category.update(data, query);
    if(rowsUpdated > 0){
      return rowsUpdated;
    }
    return null;
  }

}

export default Repository;

