# Coupon App

Coupon app using, node.js with the Express.JS framework, REST API.
## Dependency
* mongoose
* express
* joi
* body-parser
## Link

* [https://fierce-lowlands-61603.herokuapp.com/](https://fierce-lowlands-61603.herokuapp.com/): find the production link here.  This is hosted in Heroku's free tier, so it may be slow 

## Features

* User can validate existing coupon
* User can create new coupon
   * There are two type coupon [flat,percent]
   * Max. Discount amount is considered only coupon type is percent
* Frontend and backend are served in single project
* Basic folder structure followed
* Used Html,Bootstrap,javascript for frontend.
* User can see existing token

## Note 
* Basic features are implemented
* UI Issues and bugs may exist

## Running in Local

	git clone https://github.com/Gaonkar121632/coupon-BE
	cd coupon-BE
	npm install
	node server.js
	
	Open public/app.js change the url variable as mentioned in the same file.
	Open http://localhost:3004/
