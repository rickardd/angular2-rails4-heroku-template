class IndexController < ApplicationController

  def index
    render json: {message: "rails app works" }.to_json
  end
end
