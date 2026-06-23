import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true, discriminatorKey: 'role' })
export class User {
  _id!: Types.ObjectId  ;

  @Prop({ type: String, required: true, minlength: 2, maxlength: 20 })
  username!: string;

  @Prop({
    type: String,
  })
  password!: string;

  @Prop({ type: String, required: true, unique: true })
  email!: string;

  @Prop({ type: String })
  phoneNumber!: string;

 
}

export const UserSchema = SchemaFactory.createForClass(User);