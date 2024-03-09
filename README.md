# Blog app

## steps:

### Backend design (done)
-[x] Designed authentication endpoints using JWT
-[x] Designed post api endpoints
-[x] Designed comment api endpoints

### Front end (In progress):
-[x] display posts along with users, dates, and comment count.
-[x] Add nav bar with login, signup, home links.
-[x] When user is authenticated, navbar should contain his/her username, create post and log out links.
-[x] create token state to store user token.
-[x] Store token in local storage.  
-[x] Add a create post link that redirects user to blog create page.
-[x] Add a blog create form.
-[x] Create log out route. When user is logged out, set token and user states to null
-[x] make blog clickable. Once user click on it, they will be redirected to blog detail page.
-[x] check if current logged-in user is author of blog. if they are, create link that takes user to blog update page.
-[x] check if current logged-in user is author of blog. If they are, create link that allows user to delete blog.