# Angular2 Rails4 to Heroku

This is a simple test/template for deploying a Angular2 and Ruby On Rails 4 to a working deploy to Heroku.

The angular build will be done on local machine and the static files will be pushed to Heroku.

This is the process...

1. #### Create and rails app.
  - Move ``gem 'sqlite3'`` to development in the gem file
  - Add ``gem 'pg'`` to production

2. #### Install gems and create an Heroku app.
  - ``bundle install --without production``
  - ``git init``
  - ``git add .``
  - ``git commit -m 'init'`
  - Log in heroku if you're not yet
    - ``heroku login``
  - ``heroku create <app-name>`
  - ``git push heroku master``

3. #### Test the app on heroku.

4. #### Install Angular with angular cli
  - ``ng new angular`` I call it angular but anything goes e.g client...
  - Ether remove the .gitignore file or remove the line ``/dist`` from it.
    - Since the build files has to be commited.
  - ``ng build`` in the folder
  - add, commit and push to heroku.

5. #### Test it... Add, commit and push to heroku.

6. #### Add navigation and routes
  - Add routes
  ```
  resources :api do
    collection do
      resources :cars
    end
  end
  ```
  - Add some sample data to controller cars#index

  ```
    render json: {
        cars: [
          { name: "bill", type: "volvo", color: "red" },
          { name: "carl", type: "saab", color: "green" },
          { name: "peter", type: "audi", color: "blue" }
        ]
      }.to_json
  ```

  - Add navigation with at least 2 links in the angular app and get the sample data.
  ```
  ngOnInit() {
    this._http.get('http://localhost:3000/api/cars')
      .map( response => response.json())
      .subscribe(response => this.cars = response.cars);
  }
  ```

7. #### Test the app locally. 'http://localhost:3000/api/cars' will give 404 on heroku so no need to test that.

8. #### Set up proxy configuration.

  - Create the file **proxy.conf.json** and add
  ```
  {
   "/api": {
      "target": "http://localhost:3000",
      "secure": false
   }
  }
  ```
  - In package.json change
    - ``"start": "ng serve",`` to
    - ``"start": "ng serve --proxy-config proxy.conf.json",``
  - Restart the server and run ``npm start``
  - On the previous line we got data from the server... now change
    - ``this._http.get('http://localhost:3000/api/cars')`` to
    - ``this._http.get('/api/cars')``


9. #### Test it locally and if everything works add, commit and push to Heruko.

10. #### Last step. Send the user to right (client/server) side on page refresh.

  If you are on e.g ``/cars`` and the refresh the page, rails will give you a "page not found". Not quite what we want. Instead following is what we want.
  - All **defined routs** in angular to stay on the same page on page refresh.
  - All **undefined routs** to redirect back to index.html
  - Everything that is ``/api/**`` rails server will take care of.

  ##### This is what we need to do.

  - Add ``gem 'rack-rewrite'`` to the gemfile.rb
  - In **config.ru** add
  ```
  require_relative 'config/environment'

  use Rack::Rewrite do
    rewrite %r{^(?!.*(api|\.)).*$}, '/index.html'
  end

  require ::File.expand_path('../config/environment',  __FILE__)
  run Rails.application
  ```


11. #### Test the app locally and then add, commit and push to Heroku.

The deployed app can be found here https://ng2-ror-heroku-v2.herokuapp.com

I was following article belove to get started although I change the flow a bit.
http://angularonrails.wpengine.com/deploy-angular-cli-webpack-project-heroku/

























