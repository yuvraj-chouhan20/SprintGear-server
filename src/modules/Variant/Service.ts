import { Attributes, FindOptions, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import VariantRepository from "./Repository";
import { Variant, VariantTemplate } from "./Model";
import _ from "lodash"
import { ConflictError } from "../../Utils/Errors";
import i18n from "i18n"
import CommonService from "../../services/Global/common";
import { Pagination } from "../../types/requestTypes";

// service class for handling variant operations
class Service {
  Repository: VariantRepository
  constructor(){
    this.Repository = new VariantRepository();
  }

  /**
   * Handle Add Variant Template details
   * @param data
   * @returns
   */

  async handleAddVariantTemplate(data: InferCreationAttributes<VariantTemplate>){
    const [ slug, staticKey] = CommonService.generateKeyAndSlug(data.title);
    const query: FindOptions = { where: {
      staticKey,
      isDeleted: false,
    }}
    const checkAlreadyExist: Model<VariantTemplate> | null = await this.Repository.checkAlreadyExist(VariantTemplate, query)
    if(!_.isEmpty(checkAlreadyExist)){
      throw new ConflictError(i18n.__("DATA_EXIST"));
    }
    const variantTemplate: Attributes<VariantTemplate> | null = await new VariantRepository(query).addVariantTemplate(data);
    if(!_.isEmpty(variantTemplate)){
      return variantTemplate;
    }
    throw new Error(i18n.__("FAILED_TO_CREATE_DATA"));
  }

  /**
   * Handle Get Variant Templates details
   */

  async handleVariantTemplateListing(): Promise<InferAttributes<VariantTemplate>[] | []> {
  return []
  }


  /**
   * Handle Add Variant from admin side
   * @returns 
   */
  async handleAddVariant(data: Attributes<Variant>): Promise<Attributes<Variant>>{
    const [ slug, staticKey ] = CommonService.generateKeyAndSlug(data.title);
    const query: FindOptions = { where: {
      staticKey,
      isDeleted: false,
    }}
    const checkAlreadyExist: Model<Variant> | null = await this.Repository.checkAlreadyExist(Variant, query)
    if(!_.isEmpty(checkAlreadyExist)){
      throw new ConflictError(i18n.__("DATA_EXIST"));
    }
    const results: Attributes<Variant> | null = await new VariantRepository(query).addVariant(data);
     if(!_.isEmpty(results)){
      return results;
    }
    throw new Error(i18n.__("FAILED_TO_CREATE_DATA"));
  }

  /**
   * Handle variant listing from admin side
   */

  async handleVariantListing(data: Pagination): Promise<Attributes<Variant>[] | []>{
    const [ query, limit, offset ] =  CommonService.generateListingQuery<Attributes<Variant>>(data, ["title"]);

    return []
  }
}

export default Service;