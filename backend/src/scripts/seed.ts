import { hash } from 'bcrypt';

// Models
import { User } from '@modules/user/user.model';
import { Office } from '@modules/office/office.model';
import { Report } from '@modules/report/report.model';

import env from '@config/env';
import { logger } from '@config/logger';
import { connectDB } from '@config/db';

import fs from 'fs';
import path from 'path';

const setupUploadsDirectory = () => {
  logger.info('🔧 Setting up uploads directory...');

  const uploadsDir = path.join(__dirname, '../../uploads');
  const reportsDir = path.join(uploadsDir, 'reports');
  const seedImagesDir = path.join(__dirname, '../../seed_images');

  // Create uploads directory if it doesn't exist
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    logger.info('✅ Created uploads directory');
  }

  // Create reports directory if it doesn't exist
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
    logger.info('✅ Created reports directory');
  }

  // Copy seed images to reports directory
  if (fs.existsSync(seedImagesDir)) {
    const images = fs.readdirSync(seedImagesDir);

    images.forEach((image) => {
      const sourcePath = path.join(seedImagesDir, image);
      const destPath = path.join(reportsDir, image);

      // Only copy if doesn't exist (avoid overwriting)
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(sourcePath, destPath);
        logger.info(`✅ Copied ${image} to reports directory`);
      }
    });

    logger.info(`✅ Copied ${images.length} seed images`);
  } else {
    logger.info('⚠️  seed_images directory not found, skipping image copy');
  }
};

const seedDataBase = async () => {
  try {
    setupUploadsDirectory();

    await connectDB();
    logger.info('📦 Starting database seed...');

    // Seeding super user
    const email = env.SUPER_EMAIL;
    const password = env.SUPER_PASS;

    if (!email || !password) {
      logger.error(
        'Super user env variables missing (SUPER_EMAIL, SUPER_PASS).'
      );
      return;
    }

    const existing = await User.findOne({ email });
    if (!existing) {
      // Create new super user
      const hashed = await hash(password, 10);
      await User.create({
        email,
        password: hashed,
        role: 'super_user',
      });
    }

    logger.info(
      `Super user created successfully (${email}) and password: ${password})`
    );

    // Seed standard_user and service_desk_user
    const standarUserCount = await User.countDocuments({
      role: 'standard_user',
    });
    const serviceDeskUserCount = await User.countDocuments({
      role: 'service_desk_user',
    });

    if (standarUserCount === 0) {
      const stdHashed = await hash('standard_pass', 10);
      await User.create({
        email: 'standard_user@example.com',
        password: stdHashed,
        role: 'standard_user',
      });
      logger.info(
        'Standard user created successfully (standard_user@example.com and password: standard_pass)'
      );
    }

    if (serviceDeskUserCount === 0) {
      const sdHashed = await hash('service_desk_pass', 10);
      await User.create({
        email: 'service_desk_user@example.com',
        password: sdHashed,
        role: 'service_desk_user',
      });
      logger.info(
        'Service desk user created successfully (service_desk_user@example.com and password: service_desk_pass)'
      );
    }

    // Seed Offices
    const officeCount = await Office.countDocuments();
    if (officeCount === 0) {
      const offices = [
        { name: 'Headquarters', location: 'New York', isActive: true },
        { name: 'Branch Office', location: 'Los Angeles', isActive: true },
        { name: 'Remote Office', location: 'Chicago', isActive: false },
        { name: 'Sales Office', location: 'Miami', isActive: true },
      ];
      await Office.insertMany(offices);
      logger.info('Offices seeded successfully');
    }
    // Seed reports
    const reportCount = await Report.countDocuments();
    if (reportCount === 0) {
      const standardUser = await User.findOne({ role: 'standard_user' });
      const office = await Office.findOne({ isActive: true });

      if (standardUser && office) {
        const reports = [
          {
            title: 'Broken coffee Mug at home',
            description:
              'I was drinking my coffee, but suddenly, my coffee mug exploded into a hundred pieces... I need a new one!',
            office: office._id,
            createdBy: standardUser._id,
            attachments: ['/uploads/reports/1766142917297-595954635.jpeg'],
            status: 'open',
          },
          {
            title: 'Broken monitor',
            description:
              'My monitor just decided to RIP. Please send a new one',
            office: office._id,
            status: 'in_progress',
            createdBy: standardUser._id,
            attachments: ['/uploads/reports/1766143193432-13714367.jpeg'],
          },
          {
            title: 'Dangerous mutant glasses',
            description:
              'My glasses have turned into dangerous mutants that attack my face every time I try to wear them. Need immediate replacement!',
            office: office._id,
            status: 'closed',
            createdBy: standardUser._id,
            resolution: 'Replaced glasses with a new pair of safety goggles.',
            attachments: ['/uploads/reports/1766143430365-499324071.jpeg'],
          },
        ];
        await Report.insertMany(reports);
        logger.info('Reports seeded successfully');
      }
    }

    console.log('🎉 Database seeding completed!');
    process.exit(0);
  } catch (error) {
    logger.error('Seeding error: ' + error);
    process.exit(1);
  }
};

seedDataBase();
