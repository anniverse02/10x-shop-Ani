# 10X Shop – Final Report

## Project Overview

During this project, I worked on building an online shop with React and TypeScript. My main focus was to make the website functional and complete the most important features first.

I started with the basic structure and pages, then worked on connecting the API, building the shopping cart and adding the login and checkout functionality.

## Work Completed

The main features I implemented were:

- Displaying products from DummyJSON API
- Opening individual product pages
- Adding and removing products from the cart
- Changing product quantities
- Calculating the total price
- Saving cart data after page refresh
- Login and Logout functionality
- Protecting the checkout page
- Submitting the checkout form
- Showing order confirmation

I also worked on the website design and made sure it looked good on smaller screens.

Some additional features, such as product filters, reviews, profile and order history, were not included in the final version. I decided to spend more time on the main functionality instead.

## Planned vs Delivered

The main goal was to complete the CORE features first. I managed to implement the main shopping experience, including the catalog, product details, cart, login and checkout.

Some FULL features, such as search, filters, reviews, profile and order history, were left for future improvements.

## Problems I Faced

One of the things that took more time was the shopping cart. I had to make sure that all changes were updated correctly and that the cart data was not lost after refreshing the page. I solved this by using Context API and localStorage.

Another challenge was authentication and checkout. I needed to make sure that only logged-in users could continue to checkout. I used AuthContext and protected routes to handle this.

I also had some difficulties with TypeScript errors and making the layout responsive. I fixed these issues by testing the pages, correcting the code and making design adjustments.

## What I Learned

While working on this project, I got more practice with React, TypeScript, Context API, React Router and working with APIs.

I also learned that building a project takes more than just writing code. Testing, fixing errors and making small improvements are also important parts of the process.

## What I Would Change

If I had more time, I would add the remaining features, improve some parts of the code and spend more time testing the website.

## Project Metrics

| Metric | Result |
|---|---|
| Total commits | 34 |
| PLAN.md first committed | November 3, 2026 |
| Total dist folder size | 0.31 MB |
| Mobile Performance | 82 |
| Desktop Performance | 68 |
| Accessibility | 95 |
| Best Practices | 96 |
| SEO | 91 |
| Merged Pull Requests | 7 |
| Estimated working hours | Approximately 77 hours |

The Lighthouse scores were measured after development. The total dist folder size is approximately 0.31 MB.

## AI Tools

I used AI during development when I needed explanations, help with errors or guidance on implementing certain features. It was especially useful for understanding unfamiliar parts of React and TypeScript.

I also used it to review solutions and understand different approaches. However, I did not use every suggestion directly. When a solution seemed too complicated, I asked for a simpler approach because I wanted to understand the code and keep the project easy to work with.

I also checked the suggested changes and tested the features myself to make sure they worked correctly.