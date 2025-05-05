import BaseRepository from "../Base/Repository";
import { InferCreationAttributes, Model } from "sequelize";
import { Variant, VariantTemplate } from "./Model";
import { MakeNullishOptional } from "sequelize/types/utils";

class VariantRepository extends BaseRepository{
  constructor(){ super() }

  async addVariant(data: MakeNullishOptional<InferCreationAttributes<VariantTemplate, {
    omit: never;
}>>): Promise<Model<VariantTemplate> | null>{
    try {
      const variantData = await this.addData<VariantTemplate>(VariantTemplate, data);
      return variantData;
    } catch (error) {
      console.log("Error in add Vairant data", error);
      throw error;
    }
  }
}

export default VariantRepository;
