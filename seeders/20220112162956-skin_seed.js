'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('skins', [
      {
        name: 'Green',
        color: '#99D98C',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Brown',
        color: '#D4A373',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Orange',
        color: '#FAA307',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Yellow',
        color: '#FDFFB6',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pink',
        color: '#EE969C',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Purple',
        color: '#9785FF',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Silver',
        color: '#ADB5BD',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Gold',
        color: '#FFD700',
        createdAt: new Date(),
        updatedAt: new Date()
      },
])
  },
    

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
