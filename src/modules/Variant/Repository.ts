import BaseRepository from "../Base/Repository";
import { Attributes, FindOptions, InferAttributes, InferCreationAttributes, Model, QueryTypes } from "sequelize";
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
}>>): Promise<Attributes<VariantTemplate> | null>{
    try {
      const variantTemplateData: Attributes<VariantTemplate> | null = await this.addData<VariantTemplate>(VariantTemplate, data);
      return variantTemplateData;
    } catch (error) {
      console.log("Error in add Vairant data", error);
      throw error;
    }
  }

  /**
   * This function is used to add Variants type of variants
   * based on the variant template 
   * @param data 
   * @returns 
   */
  async addVariant(data: Attributes<Variant>): Promise<Attributes<Variant> | null >{
    try{
      const variantData: Attributes<Variant> | null = await this.addData<Variant>(Variant, data);
      return variantData;
    }catch(error){
      console.log("Error in add variant data");
      throw error;
    }
  }

  /**
   * Function to list all the variants for the admin 
   * 
   */

  async handleVariantListing(){
    
  }
}

export default VariantRepository;
