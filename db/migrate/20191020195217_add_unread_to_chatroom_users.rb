class AddUnreadToChatroomUsers < ActiveRecord::Migration[5.2]
  def change
  	add_column :chatroom_users, :unread, :integer, :default => 0
  end
end
