import { ICourt } from "interfaces/Court";
import { Schema, model } from "mongoose";

const CourtSchema: Schema = new Schema({
  type: { type: String },
  number: { type: Number },
  status: { type: String, enum: ["enabled", "disabled"] },
});

export default model<ICourt>("Court", CourtSchema);
