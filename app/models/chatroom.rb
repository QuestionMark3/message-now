class Chatroom < ApplicationRecord
	validates :title, presence: true
	has_many :messages
	has_many :chatroom_users, :dependent => :destroy
	has_many :users, through: :chatroom_users
end