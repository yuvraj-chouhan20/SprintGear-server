import { InferCreationAttributes, Model } from "sequelize";
import VariantRepository from "./Repository";
import { VariantTemplate } from "./Model";
import _ from "lodash"
import { ConflictError } from "../../Utils/Errors";
import i18n from "i18n"
class Service {
  Repository: VariantRepository
  constructor(){
    this.Repository = new VariantRepository();
  }
  async handleAddVariant(data: InferCreationAttributes<VariantTemplate>){
    const checkAlreadyExist: Model<VariantTemplate> | null = await this.Repository.addVariant(data)
    if(!_.isEmpty(checkAlreadyExist)){
      throw new ConflictError(i18n.__("DATA_EXIST"));
    }
    
  }
}

export default Service;