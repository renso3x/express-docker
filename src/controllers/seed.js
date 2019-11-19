const faker = require('faker');
const bcrypt = require('bcrypt');
const { ObjectID } = require('mongodb');

const Member = require('../models/member');
const Organization = require('../models/organization');

module.exports.seed = async (req, res) => {
  try {
    await Member.deleteMany({});
    await Organization.deleteMany({});

    const hashedPassword = await bcrypt.hash('password', 10);

    const org1 = new ObjectID();
    const org2 = new ObjectID();

    const orgs = [
      {
        _id: org1,
        name: 'Xendit'
      },
      {
        _id: org2,
        name: 'Axa'
      }
    ];

    const members = [
      {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: hashedPassword,
        followers: faker.random.number(),
        following: faker.random.number(),
        avatarUrl: faker.image.imageUrl(),
        organization: org1
      },
      {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: hashedPassword,
        followers: faker.random.number(),
        following: faker.random.number(),
        avatarUrl: faker.image.imageUrl(),
        organization: org1
      },
      {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: hashedPassword,
        followers: faker.random.number(),
        following: faker.random.number(),
        avatarUrl: faker.image.imageUrl(),
        organization: org1
      },
      {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: hashedPassword,
        followers: faker.random.number(),
        following: faker.random.number(),
        avatarUrl: faker.image.imageUrl(),
        organization: org2
      },
      {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: hashedPassword,
        followers: faker.random.number(),
        following: faker.random.number(),
        avatarUrl: faker.image.imageUrl(),
        organization: org2
      }
    ];

    await Organization.insertMany(orgs);
    await Member.insertMany(members);

    res.status(200).send('Finished Seeding');
  } catch (err) {
    res.status(500).send(err);
  }
};
