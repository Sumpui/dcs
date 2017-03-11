# DCS - Drone Communication System

This project was created as diploma project. This is an instrument, that allows you to build your own algorithms and apply them on the drones. Base location, Dotes, trajectories and ~~areas~~ of observation, drones and air defence are available to you to set on a canvas layer. All you need to do is to make your own algorithm and upload it into the system.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

The project was built on node.js and express.js. So first you need to install is [Node.js](https://nodejs.org/en/).

After that you should install all dependencies of the project.

This command will follow to your project location and install all development dependecies:
```
cd ~/<Your path>/dcs && sudo npm install
```

If your OS is Windows, I reccomend you to install [Git bash](https://git-for-windows.github.io/)

### Installing

1. After dependencies were installed, you should build the project using gulp build system. _Remember to execute this command from your project location!_

```
sudo gulp
```

1. Then, you should to run server script. To make this run follow command:

```
node server.js
```
The server will listen 8080 and 8443 ports.

1. After that you can go to your browser and in the adress bar type follow adress:

```
http://locahost:8080 or https://localhost:8443
```

## Testing the system

To understand that the system works, I've created the simplest drone communication algorithm. It has already uploaded into the system.

You need to follow next steps to test the system:

1. Set ammount of dotes, trajectories, like it shown here
![The screenshot](https://image.ibb.co/mio7fa/1_Step.png)
1. Set amount of drones and air defence the same slide moving.
1. Choose the algorithm by clicking on its name.
![The screenshot](https://image.ibb.co/fg4PRF/2_Step.png)
1. Switch on canvas layer by clicking the button 'Переключиться на холст'.
![The screenshot](http://image.prntscr.com/image/f9de6d1b443946c7b7b0c61147164c7f.png)
1. Add base location and dotes, trajectories, ~~areas~~ of observation on canvas map.
![The screenshot](http://image.prntscr.com/image/e3a93bab813049c0947c47c9ce4e364f.png)
1. Choose your set of drones.
![The screenshot](http://image.prntscr.com/image/de479b49fcf74ae5b509d3ec6df5ea62.png)
1. Click on the button 'Моделировать' to start testing algorithm.
![The screenshot](http://image.prntscr.com/image/eb849ac0895a403ebc7054d2b6236e3b.png)

## Built With

* [Node.js](https://nodejs.org/) - Event-driven I/O server-side JavaScript environment.
* [Express.js](https://expressjs.com/) - Web development framework for node.js.
* [Jade or Pug](https://github.com/pugjs/pug) - High performance engine.
* [Stylus](stylus-lang.com/) - CSS preprocessor.

## Authors

* **Vladislav Dudin** - *Initial work* - [Simpui](https://github.com/Sumpui)

## License

This project is licensed under the MIT License
