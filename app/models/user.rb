class User < ApplicationRecord
	validates :username, presence: true, uniqueness: {case_sensitive: false}, length: {minimum: 3, maximum:15}
	has_many :messages
	has_many :chatroom_users, :dependent => :destroy
	has_many :chatrooms, through: :chatroom_users
	has_secure_password
end