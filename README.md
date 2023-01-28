# E-commerce
NodeJs E-commerce Project including authentication, authorizathion, Validation, REST APIS

# Technologies and Libraries
- NodeJS
- ExpressJS
- SQL Server
- jsonwebtoken (for auth)
- joi (for validation)
- crypto-js 


# REST APIS
- 	**Auth Route**
  	 
    **BaseURL** : http://localhost:5000/auth
    | End Point | Method |Description | Body | Auth Header |
    | ----------- | ----------- | ----------- | ----------- | ----------- |
    | /register | POST | Creating new accounts for users | name - email - password | --- |
    | /login | POST | Login for users and admins | email - password | --- |

- 	**User Route**
     	 
    **BaseURL** : http://localhost:5000//user
    | End Point | Method |Description | Body | Auth Header |
    | ----------- | ----------- | ----------- | ----------- | ----------- |
    | / | GET | For admins to get all users | --- | token : bearer (admin token) |
    | /find/{id} | GET | For admins to get specific user by user-id | --- | token : bearer (admin token) |
    | /{id} | PUT | For user to edit his data | name - email - password | token : bearer (user token) |
    | /{id} | DELETE | For admins to delete specific user by user-id | --- | token : bearer (admin token) |
 
 
 - 	**Product Route**
     	 
    **BaseURL** : http://localhost:5000//Product
    | End Point | Method |Description | Body | Auth Header |
    | ----------- | ----------- | ----------- | ----------- | ----------- |
    | / | POST | For creating new Product by admin | title - descreption - imgURL - category - color - price | token : bearer (admin token) |
    | /{id} | PUT | For updating Products by admin | title - descreption - imgURL - category - color - price | token : bearer (admin token) |
    | /{id} | DELETE | For admins to delete Products by product-id  | --- | token : bearer (admin token) |
    | /find/{id} | GET | for users to find specific product by its id | --- | --- |
    | / | GET | for users to get products  | --- | --- |
 
 
 - 	**Cart Route**
     	 
    **BaseURL** : http://localhost:5000//cart
    | End Point | Method |Description | Body | Auth Header |
    | ----------- | ----------- | ----------- | ----------- | ----------- |
    | / | POST | for user to add product to his cart | userid - cartid - productid | token : bearer (user token) |
    | / | DELETE | for user to delete product from his cart | userid - cartid - productid | token : bearer (user token) |
    | /clear | DELETE | for user to delete all products from his cart | userid - cartid | token : bearer (user token) |
    | /{id} | GET | for user to get all products in his cart by his id | --- | token : bearer (user token) |
    
 
- 	**Order Route**
     	 
    **BaseURL** : http://localhost:5000//order
    | End Point | Method |Description | Body | Auth Header |
    | ----------- | ----------- | ----------- | ----------- | ----------- |
    | / | POST | For users to add order | userid - cartid - cost - address | token : bearer (user token) |
    | /find/{id} | GET | For user to get order by order-id | --- | token : bearer (user token) |
    | /{user-id}/{order-id} | DELETE | For users to delete order by order-id | --- | token : bearer (user token) |    
    
    
    
    
    # Database
    - DataBase Schema 
      ![image](https://user-images.githubusercontent.com/73653538/215234906-817a7453-9658-46ce-963e-67bf0455e036.png)

    
    
    
    
