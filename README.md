### Getting Started

This project helps me to develop and keep track of code comments containing `AWAIT`/`TODO`. Follow the steps below to set up the project on your system.

#### Backend Setup

Navigate to the `./backend` folder and run the following commands:

```bash
$ npm install
$ node index.js
```

#### Frontend Setup

Navigate to the `./front` folder and run the following commands:

```bash
$ npm install
$ ng serve -o
```

If you do not have Angular installed, consult the [Angular documentation](https://angular.io/guide/setup-local) for installation instructions.

#### Script Setup

1. Navigate to the `./scripts` folder.
2. Edit `file_list` by adding the files you want to track on your system.
3. Run `initialize_awaits.bat` by executing it. Ensure you have all the required Python packages installed.


#### Caching Setup

This project uses redis server caching.

1. Install redis server
2. Copy your redis server port and input it in the enviornment variables in backend/enviornment.js
3. Start the redis server.