# points-badge-test

Please clone this repo into your account and send commits or branches with your results
to [Simon](mailto:s.hansen@digital-h.de).

## Task I

Please refactor the function `getUsersBadge()`. You can provide multiple version. Please describe in the commit messages
what has improved in your version.

## Task II

Please make the function `getUsersBadge` async.

Please check branch task-3 for the next assignment and merge your changes from this branch. The next assignments should
build on top of your improvements.

## Task III

There are new Badges! Please implement the following Badges:

```
> 1 starter
> 100 platinum  
> 2000 god like  
< 0 bad ass  
```
Please check branch task-4 for the next assignment and merge your changes from this branch. The next assignments should

## Task IV

We get more and more Users! We need to calculate the Badges for all users in our database.
Please read all User from `./src/user-store.ts` (`getAllUser()`) and calculate the badges for all Users.

It would be extra nice to have some statistics afterwards in the console like

1. how many users are there
2. what is the average userCount
3. who are the top 5 user
4. what is the most given badge

Please check branch task-5 for the next assignment and merge your changes from this branch. The next assignments should
build on top of your improvements.

## Task V

To emulate a slow `getUsersBadge` function, please call and await the new `emulateLongProcess` function
inside `getUsersBadge`.

How does that impact the rest of the source code? Please optimize the code to reduce the overall execution time.

Please check branch task-6 for the next assignment and merge your changes from this branch. The next assignments should
build on top of your improvements.
