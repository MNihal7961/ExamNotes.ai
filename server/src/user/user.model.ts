import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ default: 50 })
  credits!: number;

  @Prop({ default: true })
  isCreditAvailable!: boolean;

  @Prop({ type: [Types.ObjectId], ref: 'Note', default: [] })
  notes!: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
