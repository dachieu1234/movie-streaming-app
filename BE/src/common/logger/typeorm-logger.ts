import { Logger, QueryRunner } from 'typeorm';

export class TypeOrmLogger implements Logger {
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    console.log(`📝 QUERY: ${query}`);
    if (parameters && parameters.length) {
      console.log(`   PARAMS: ${JSON.stringify(parameters)}`);
    }
  }

  logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    console.error(`❌ QUERY ERROR: ${error}`);
    console.error(`   QUERY: ${query}`);
    if (parameters && parameters.length) {
      console.error(`   PARAMS: ${JSON.stringify(parameters)}`);
    }
  }

  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    console.warn(`🐢 SLOW QUERY: ${time}ms`);
    console.warn(`   QUERY: ${query}`);
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    console.log(`⚙️ SCHEMA BUILD: ${message}`);
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    console.log(`🚀 MIGRATION: ${message}`);
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
    if (level === 'warn') console.warn(message);
    else console.log(message);
  }
}
