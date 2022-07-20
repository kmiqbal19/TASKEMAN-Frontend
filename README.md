# Project Title

TASKEMAN (Task Management App) Client Side

## Demo

![App Screenshot](https://i.ibb.co/rH7FCV5/new.gif)

## Authors

- [@kmiqbal19](https://github.com/kmiqbal19)

## API Reference

#### User signup

```http
   POST /api/v1/users/signup
```

| Parameter         | Type     | Description                              |
| :---------------- | :------- | :--------------------------------------- |
| `name`            | `string` | **Required**. Your name                  |
| `email`           | `string` | **Required**. Your email address         |
| `password`        | `string` | **Required**. Your given password        |
| `passwordConfirm` | `string` | **Required**. Your password confirmation |

#### User login

```http
   POST /api/v1/users/login
```

| Parameter  | Type     | Description                       |
| :--------- | :------- | :-------------------------------- |
| `email`    | `string` | **Required**. Your email address  |
| `password` | `string` | **Required**. Your given password |

#### User Update Data

```http
   PUT /api/v1/users/updateUserData
```

| Parameter | Type     | Description                      |
| :-------- | :------- | :------------------------------- |
| `email`   | `string` | **Required**. Your email address |
| `name`    | `string` | **Required**. Your name          |
| `photo`   | `file`   | **Not Required**. Your image     |

#### Change Password

```http
  PATCH /api/v1/users/changePassword
```

| Parameter         | Type     | Description                               |
| :---------------- | :------- | :---------------------------------------- |
| `currentPassword` | `string` | **Required** Users current password       |
| `password`        | `string` | **Required**. Users password              |
| `passwordConfirm` | `string` | **Required**. Users password Confirmation |

#### Get all tasks

```http
  GET /api/v1/tasks
```

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `jwt`     | `string` | **Required**. Your jwt token |

#### Get task

```http
  GET /api/task/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of task to fetch |
| `jwt`     | `string` | **Required**. Your jwt token      |

#### Update task

```http
  PATCH /api/task/${id}
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of task to update |
| `jwt`     | `string` | **Required**. Your jwt token       |

#### Create task

```http
  POST /api/tasks
```

| Parameter     | Type     | Description                         |
| :------------ | :------- | :---------------------------------- |
| `jwt`         | `string` | **Required**. Your jwt token        |
| `title`       | `string` | **Required**. Your task title       |
| `description` | `string` | **Required**. Your task description |
| `photo`       | `file`   | **Not Required**. Your task photo   |

#### Delete task

```http
  DELETE /api/task/${id}
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of task to delete |
| `jwt`     | `string` | **Required**. Your jwt token       |

## Documentation

[Documentation](https://documenter.getpostman.com/view/20397790/UzR1J2S3)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `CI= npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
