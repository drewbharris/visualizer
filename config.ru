require 'rack/websocket'

class MyApp < Rack::WebSocket::Application
end

map '/' do
  run MyApp.new
end
