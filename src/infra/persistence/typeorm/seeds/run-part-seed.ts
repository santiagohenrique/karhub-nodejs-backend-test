import dataSource from "@/src/infra/persistence/typeorm/data-source";
import { seedPartsOnce } from "@/src/infra/persistence/typeorm/seeds/part.seed";

async function run(): Promise<void> {
  try {
    await dataSource.initialize();
    const result = await seedPartsOnce(dataSource);

    if (result.skipped) {
      console.log('Seed was skipped.');
      return;
    }

    console.log(
      `Seed completed successfully. Inserted ${result.inserted} parts.`,
    );
  } catch (error) {
    console.error('Error occurred while running part seed:', error);
    process.exitCode = 1;
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
}

void run();
