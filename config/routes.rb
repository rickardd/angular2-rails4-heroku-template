Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/', to: 'index#index'

  resources :api do
    collection do
      resources :cars
    end
  end

end
