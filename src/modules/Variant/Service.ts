import { FindOptions, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import VariantRepository from "./Repository";
import { VariantTemplate } from "./Model";
import _ from "lodash"
import { ConflictError } from "../../Utils/Errors";
import i18n from "i18n"
import CommonService from "../../services/Global/common";

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
    const variantTemplate: Model<VariantTemplate> | null = await new VariantRepository(query).addVariantTemplate(data);
    if(!_.isEmpty(variantTemplate)){
      return variantTemplate;
    }
    throw new Error(i18n.__("FAILED_TO_CREATE_DATA"));
  }

  /**
   * Handle Get Variant details
   */

  async handleVariantTemplateListing(): Promise<InferAttributes<VariantTemplate>[] | []> {
  return []
  }
}

export default Service;