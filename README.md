# Access Buddy

Access Buddy is a user management app designed to help manage users, their profiles, and authentication. The app provides features such as user registration, login, profile editing, and role-based access control.

## Features

- User registration
- Login and logout
- User profile management (edit and delete)
- Role-based access control (user and admin)

## Getting Started

These instructions will help you set up the project on your local machine for development and testing purposes.

### Prerequisites

- Node.js (version 14.x.x or higher)
- Angular CLI (version 12.x.x or higher)
- Git

### Installation

1. Clone the repository:

   ```html
   git clone https://github.com/yourusername/access-buddy.git
   ```

2. Navigate to the project directory:

   ```html
   cd access-buddy
   ```

3. Install the required dependencies:

   ```html
   npm install
   ```

   This command installs all the necessary packages listed in the `package.json` file. These packages are essential for the development and functionality of the Access Buddy application.

## Running the Development Server

1. Start the development server:

   ```html
   ng serve
   ```

   This command compiles the Angular application and starts the development server. It also watches for any file changes and automatically reloads the application in the browser.

2. Open your browser and navigate to `http://localhost:4200`. The app should now be running.

You can now interact with the Access Buddy application in your browser. Any changes you make in the source code will be automatically reflected in the browser, making it easy to develop and test your application.

**Note**: If you need to change the default port (4200), you can do so by running `ng serve --port PORT_NUMBER`, replacing `PORT_NUMBER` with your desired port number.

## Running Tests

To run the unit tests, use the following command:

```html
ng serve
```

## Deployment

To create a production build, run the following command:

```html
ng build
```

The build artifacts will be stored in the `dist/` directory. You can then deploy these files to your preferred hosting provider.

## Contributing

If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch with a descriptive name.
3. Make your changes in the new branch.
4. Commit your changes with a clear and concise commit message.
5. Push your changes to your fork.
6. Create a pull request to the main branch of the original repository.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.

## Acknowledgments

- Special thanks to Angular for the framework and documentation.
- Thanks to the developers of third-party libraries used in this project.
