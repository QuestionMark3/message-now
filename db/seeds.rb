# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create(username: 'R2D2', password: 'test')
User.create(username: 'Anakin', password: 'test')
User.create(username: 'Luke', password: 'test')
User.create(username: 'Padme', password: 'test')
User.create(username: 'Palpatine', password: 'test')
User.create(username: 'Yoda', password: 'test')
User.create(username: 'Ben', password: 'test')
User.create(username: 'Han', password: 'test')
User.create(username: 'Leia', password: 'test')
User.create(username: 'Lando', password: 'test')

Message.create(body: 'Created a new chat app! Is there anything I can\'t do?!', user: User.find(2))
Message.create(body: 'Become a master.', user: User.find(6))
Message.create(body: '^^^^^^', user: User.find(7))
Message.create(body: '...', user: User.find(1))