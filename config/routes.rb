Rails.application.routes.draw do

	# Chatroom route
	root 'chatroom#index'

	#User route
	get 'signup' => 'users#new'
	post 'users' => 'users#create'

	# Session routes
	get 'login' => 'sessions#new'
	post 'login' => 'sessions#create'
	delete 'logout' => 'sessions#destroy'

	# Message route
	post 'message' => 'messages#create'

	# Channel route
	mount ActionCable.server, at: '/cable'

end
