import { InferAttributes, FindOptions } from "sequelize";
import { Category } from "./Model";
import CategoryRepository from "./Repository";
import CommonService from "../../services/Global/common";
import { ConflictError, FailedError, NotFoundError } from "../../Utils/Errors";
import i18n from "i18n";
import _ from "lodash";
import { Op } from "sequelize";

class Service{
  /**
   * Handle add category
   * @param data
   * @returns
   */
  async handleAddCategory(data: InferAttributes<Category>): Promise<Category | Error> {
    const [slug, staticKey] = CommonService.generateKeyAndSlug(data.title);
    const query = { where: { title: data.title, staticKey } };
    const isExist = await new CategoryRepository().checkAlreadyExist(Category, query);
    if(isExist){
      throw new ConflictError(i18n.__("CATEGORY_ALREADY_EXIST"));
    }
    const category = await new CategoryRepository(data).addCategory();
    if(category){
      return category;
    }
    throw new FailedError(i18n.__("FAILED_TO_CREATE_CATEGORY"));
  }

  /**
   * Handle category listing
   * @param body
   * @returns
   */
  async handleCategoryListing(body: any): Promise<Category[]>{
    const searchableFiled = ["title"];
    let [query, limit, offset]: [FindOptions<Category>, number, number] = CommonService.generateListingQuery(body, searchableFiled);
    const categories: Category[] = await new CategoryRepository().getListingData(Category, query, { limit, offset });
    if(_.isEmpty(categories)){
      return [];
    }
    return categories;
  }

  async handleUpdateCategory(body: any): Promise<number | Error>{
    const query = { where: { _id: body.id } }
    const category: Category | null = await new CategoryRepository().checkAlreadyExist(Category, query);
    if(!category){
      throw new NotFoundError(i18n.__("CATEGORY_NOT_FOUND"));
    }
    const updatedCategory: number | null = await new CategoryRepository().updateCategory(body, query);
    if(updatedCategory){
      return updatedCategory;
    }
    throw new FailedError(i18n.__("FAILED_TO_UPDATE_CATEGORY"));
  }

  /**
   * Handle delete category
   * @param id
   * @returns
   */
  async handleDeleteCategory(id: string): Promise<number | Error>{
    const query = { where: { _id: id } }
    const category: Category | null = await new CategoryRepository().checkAlreadyExist(Category, query);
    if(!category){
      throw new NotFoundError(i18n.__("CATEGORY_NOT_FOUND"));
    }
    const deletedCategory: number | null = await new CategoryRepository().deleteData(Category, query);
    if(deletedCategory){
      return deletedCategory;
    }
    throw new FailedError(i18n.__("FAILED_TO_DELETE_CATEGORY"));
  }

  /**
   * Handle get categories
   * @param body
   * @returns
   */
  async handleGetCategories(body: any): Promise<Category[]>{
    const searchableField = ["title"];
    let query: FindOptions<Category> = {}
    query.where = CommonService.generateSearchText(searchableField, body.searchText);
    const categories: Category[] = await new CategoryRepository().getListingData(Category, query, {});
    if(_.isEmpty(categories)){
      return [];
    }
    return categories;
  }
}

export default Service;
