import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'games',
})
export class Game extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  betAmount: number;

  @Prop({ required: true })
  totalMines: number;

  @Prop({ required: true })
  board: string[][];

  @Prop({ required: true })
  revealed: string[][];

  @Prop({ default: 0 })
  hits: number;

  @Prop({ default: false })
  isGameOver: boolean;

  @Prop({ default: 1 })
  lastOdd: number;

  @Prop({ default: null })
  winAmount: number;

  @Prop({ default: null })
  finishedAt: Date;
}

export const GameSchema = SchemaFactory.createForClass(Game);
