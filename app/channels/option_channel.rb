class OptionChannel < ApplicationCable::Channel
  def subscribed
    stream_from "option_channel"
  end

  def unsubscribed
    stop_all_streams
  end
end
