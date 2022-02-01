# Logixboard Frontend Engineering Take-Home Challenge

Thanks for applying to Logixboard! The next step in our process is a coding challenge. Our goals
with this step in the process are the following:

1. To assess your ability to problem solve and develop a well-engineered solution to a user need.
1. To give you an opportunity to show creativity in how you solve a user need.
1. To give us a tool we can use for discussion and collaboration in our synchronous interviews.

We hope and expect that this exercise should take about two hours to complete. If it takes you a
bit more than that, that's okay, and you don't need to tell us. If it takes you a _lot_ more than
that, please let us know so we can reevaluate the exercise for future candidates.

## Assignment

For this challenge, we are asking you to fix a bug and add a new feature to the application.

### Product Context

Logixboard is a customer engagement tool for freight forwarders to provide their customers with
visibility into their supply chains. You've probably gotten an intro at this point on what a
Freight Forwarder is, but in case you haven't: Freight Forwarders are the project managers of the
logistics world. They don't own any planes, trains, or boats. They are just really good at
coordinating with all the actors to make sure their customers' freight gets from point A to B.

Logixboard's offering has grown into being the primary communication hub between freight
forwarders and their customers, but we started out with something not too different from this
app, with a focus on giving customers visibility into their shipments.

### Bug Fix: Table Tweaks

One of our differentiators in the market for logistics software is our interface and its ease of
use. As such, we'd like you to fix a bug in the app that makes the table's pagination a bit hard
to use.

When loading the shipments page in the top navigation bar, you will see a table containing one page
of shipments. You'll notice that you have to scroll down through both the rows in the table and
the full browser window to access the pagination controls. Please modify the app such that the
pagination controls on the table never extend past the bottom of the view port.

Additionally, imagine that we have decided that the best user experience would be to only be
presented with enough rows per page to fill the view port and no more. Please modify the app
such that the number of shipments per page results in no scrolling in the grid.

After your modification, expanding the app's window vertically should allow the count of shipments
per page to increase to fill the available space.

### Feature: The Next Week of Shipments

An important value proposition of Logixboard is helping users contextualize the flood of
information they receive. We want to present the user first with what is most important at any
given time. For many users, arrival time is a the most critical date on a shipment. They
organize their work around when their goods are arriving. We want to present a user with a view
of shipments arriving in the next week, broken down by day.

Please add some new functionality to the currently blank dashboard page. The ask from the user is
to be able to see at a glance which shipments are arriving in each of the next seven days.

Here's a couple more notes that might be helpful:

- Because we don't have a shipment detail page, the feature added to the dashboard does not
    need to be interactive.
- Many users identify a shipment by it's `House Bill Number`. This could be relevant information
    for you when you are deciding how to display the available data.
- There is no need to reinvent the wheel. If there is a library out there that will help you solve
    this problem, you are more than welcome to use it. Be prepared to explain your choices in the
    synchronous interview.

## Setup

### Dependencies

This app was built with Node.js 15, but it should work with most modern versions of Node.js. If
you run into any hiccups start by making sure you're on Node 15. We encourage the use of a tool
like [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) to manage multiple versions and
make sure you're running the correct one.

To install dependencies:
```
npm install
```

To start the development server:
```
npm start
```

Once started, the development server should show any typescript errors and should auto-reload on
any code change. The app is by default exposed on `http://localhost:3000` which you can visit in
the browser of your choice.

## Submission

When you are complete, please submit in one of the following ways:

1. Compress the entire directory into any commonly used compression format and return it via
    email
2. Send us a link to a publicly available repository with the code.

We will assess your submission and follow up with next steps.

## About the Repo

This project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app). It's a pretty straightforward
React application with minimal customization beyond what Create React App provides.

Our goal is not to assess your specific knowledge of the idiosyncracies of React. We're excited
to bring on engineers that have experience with any modern toolset. We have tried to build the
scaffolding for this project in a way that should be easy for any developer to pick up.

### About that fetchShipments function
We built the fetchShipments function to simulate a network call to retrieve data to drive the app. You
are welcome to change anything you need to about the function including the interface and any
transformations it makes, but please don't change the _spirit_ of it and just import the shipment
data directly. We want this to be at least somewhat realistic :)
