
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ 
    collection: 'users',
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => {
          ret.id = ret._id;
          delete ret._id;
        },
    },
})
export class User extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ 
        required: true, 
        default: process.env.INICIAL_USER_BALANCE ?? 10000, 
        min: 0 
    })
    balance: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
