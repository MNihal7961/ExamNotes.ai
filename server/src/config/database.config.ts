import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

const logger = new Logger('MongooseModule');

export const databaseConfigFactory = (
  config: ConfigService,
): MongooseModuleFactoryOptions => ({
  uri: config.get<string>('MONGODB_URI'),
  onConnectionCreate: (connection: Connection) => {
    connection.on('connected', () => {
      logger.log('MongoDB connected');
    });
    connection.on('error', (error: Error) => {
      logger.error(`MongoDB connection error: ${error.message}`);
    });
    connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });
    return connection;
  },
});
