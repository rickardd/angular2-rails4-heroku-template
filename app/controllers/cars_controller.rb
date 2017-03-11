class CarsController < ApplicationController

  def index

    if !session[:counter]
      session[:counter] = 0
    end

    session[:counter] += 1

    obj = {
        counter: session[:counter],
        cars: [
          { name: "bill", type: "volvo", color: "red" },
          { name: "carl", type: "saab", color: "green" },
          { name: "peter", type: "audi", color: "blue" }
        ]
      }


    render json: obj.to_json
  end

end
