import BaseRepository from "../Base/Repository";
import { FindOptions, InferAttributes, InferCreationAttributes, Model, QueryTypes } from "sequelize";
import { Variant, VariantTemplate } from "./Model";
import { MakeNullishOptional } from "sequelize/types/utils";

class VariantRepository extends BaseRepository{
  query?: FindOptions;

  constructor(query?: FindOptions){
    super()
    this.query = query;
   }

  async addVariantTemplate(data: MakeNullishOptional<InferCreationAttributes<VariantTemplate, {
    omit: never;
}>>): Promise<Model<VariantTemplate> | null>{
    try {
      const variantTemplateData: Model<VariantTemplate> | null = await this.addData<VariantTemplate>(VariantTemplate, data);
      return variantTemplateData;
    } catch (error) {
      console.log("Error in add Vairant data", error);
      throw error;
    }
  }
}

export default VariantRepository;
