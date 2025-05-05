import BaseRepository from "../Base/Repository";
import { InferAttributes, FindOptions } from "sequelize";
import { Variant } from "./Model";

class Repository extends BaseRepository{
  data?: InferAttributes<Variant>
  query?: FindOptions<Variant>;
  constructor(data?: InferAttributes<Variant>, query?: FindOptions<Variant>){
    super();
    this.data = data;
    this.query = query;
  }
}

export default Repository;
