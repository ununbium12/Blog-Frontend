# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


===================================

### 2023.02.28 / 버전업
전에 있던 화면 구성을 갈아업고서, 각각의 화면구성 파일들을 폴더로 나누어 저장함

1. login_register = 로그인/회원가입 페이지
2. components = 화면을 구성시 들어가는 소규모 파일 폴더
3. pages = 기본 화면 구성 페이지 [홈 화면(home), 게시판 생성 및 수정 화면(New, Edit), 게시판 확인 화면(Blog)]
4. util = 화면 구성시 여러 곳에 필요한 데이터를 모아둔 폴더
5. assets = 이미지 파일 저장 폴더

그외의 삭제된 폴더는 필요 없다고 판단되어 삭제

### 2023.03.04 / 수정 및 삭제 기능 추가

1. 수정 및 삭제 기능 추가
2. 일부 오류 수정

### 2023.03.05 / 오류 수정 및 화면 구성

1. 안보여도 되는 console.log 삭제
2. 일부 오류 수정
3. 화면 헤더 부분 메인페이지로 이동하는 이미지 추가

### 2023.03.06 / 로그인 / 회원가입 페이지 화면구성 및 푸터 제작, 일부 기능 추가, 수정

1. 로그인 / 회원가입 화면 구성 설정
2. 일부 로그인 / 회원가입에 있던 미작동 기능 추가
3. 전역에 보이는 푸터제작
4. 해더는 로그인, 회원가입에 보이지 않게 설정됨
5. 없는 url을 입력해 없는 페이지로 이동하던 문제를 해결 이제는 Notfound 페이지로 이동 후 바로 홈 화면으로 보내버림.
6. 그외의 자잘한 오류 수정