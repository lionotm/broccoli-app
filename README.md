## TODO

Visual Requirements
[x] The UI should occupy the full height of the screen.
[x] Shows a fixed header that is always on top of the window and a footer that is always on the bottom of the window (assuming a reasonable window height).
[x] The page content is sandwiched in the middle, containing just a heading, a small piece of text and a button to request an invite.
[x] A rough mockup of the basic layout is attached. While preserving this layout on desktop, you may style it however you wish, with or without images.
[x] The solution must be mobile friendly (users won't need to pinch and zoom on their mobile devices).

UI Behaviour / Validation (unit tests)
[ ] When the Request Invite button is clicked, a popup shows containing the Full name, Email and Confirm Email input fields.
[ ] The user needs to fill in all three fields to request an invite. Full name needs to be at least 3 characters long, Email needs to be in validation email format and Confirm Email needs to match Email. (You may display the validation errors inline)
[ ] If the user clicks Send and one or more fields do not validate properly, the app should not contact the backend but instead provide appropriate feedback to the user (use your judgement on what this UX should be).
[ ] If the user clicks Send and all fields validate properly, the app should send the request to the backend server (see specs below) and inform the user that the request is being sent.
[ ] If the server returns 200 OK, it should switch to another popup, indicating that everything went through OK. This popup can be dismissed and will simply close - revealing the homepage again.
[ ] The server may return 400 Bad Request, in which case the app should simply display the error message from the server.
[ ] The Send button can be clicked again to re-attempt the submission.

You're encouraged to tweak/customise the UI to provide a better user experience. However the final solution must still adhere to layout design provided.

Tooling
The solution should be implemented in React.
The solution should use a modern styling approach.
The solution should run on most modern browsers (e.g. flexbox and grid okay).
The solution should include unit tests.
The solution should be production ready.
Static type checking is appreciated.

Backend API
The API endpoint is available on https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth
The request is in the form of a JSON payload { "name": "XXX", "email": "XXX" }
The request must use the POST method.
Email "usedemail@airwallex.com" is hardcoded in the backend to trigger a specific error that needs to be handled by the front-end app.
Submission

Please submit your code via an online Git repository or simply zip it to us, including a README.md for building, running and testing the
app.
Write some tests to make sure the app behaves as expected.
Do not develop your own backend API, use the one specified above.

# Broccoli & Co. Invitation Request Web Application

This is a simple single-page web application for Broccoli & Co., an upcoming online service company. The purpose of this application is to allow users to request an invitation by entering their name and email address.

## Features

- **Request Invitation**: Users can enter their name and email address to request an invitation.
- **Responsive Design**: The application is designed to be clean and user-friendly across different devices.
- **Simple Validation**: The form validates the input to ensure that both name and email are provided, and that the email address is in a valid format.

## Tech Stack

- **HTML5**: For the structure of the webpage.
- **CSS3**: For styling the page and making it responsive.
- **JavaScript**: For handling form validation and submission logic.
- **[Optional: Framework]**: If you used any frameworks like React, Vue, or Angular, you can mention it here.

## Getting Started

### Prerequisites

To run this project locally, you'll need a basic understanding of HTML, CSS, and JavaScript. If you're using any frameworks, you'll also need to have Node.js installed.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/broccoli-co-invitation.git
   cd broccoli-co-invitation
   ```

2. If you're using any package managers (like npm or yarn) for a framework, install dependencies:

   ```bash
   npm install
   ```

3. Open the `index.html` file in your browser to view the application.

### Running the Application

If you're using a framework:

```bash
npm start
```

Otherwise, just open the `index.html` file directly in a web browser.

## Usage

1. Open the homepage.
2. Enter your name and email address in the provided form.
3. Click the "Request Invitation" button to submit your request.
4. Upon successful submission, a confirmation message will be displayed.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
