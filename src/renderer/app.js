import './stylesheets/main.scss';
// Small helpers you might want to keep
import '../helpers/context_menu.js';
import '../helpers/external_links.js';
import {remote} from 'electron';
import jetpack from 'fs-jetpack';
import env from 'env';
import fontawesome from '@fortawesome/fontawesome';
import solids from '@fortawesome/fontawesome-free-solid';
import regulars from '@fortawesome/fontawesome-free-regular';
import brands from '@fortawesome/fontawesome-free-brands';
import './js/listeners';
import {loadMeetings} from './js/sideBar';
import React from 'react';
import ReactDOM from 'react-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';


fontawesome.library.add(solids, regulars, brands);

const app = remote.app;
const appDir = jetpack.cwd(app.getAppPath());

const manifest = appDir.read('package.json', 'json');


loadMeetings();
const elem = <div className="grid-y">
    <div className="cell text-center"><p>Kies een vergadering uit de lijst!</p></div>
    <div className="cell text-center"><FontAwesomeIcon icon={"arrow-circle-left"} size={"10x"}/></div>

</div>;
ReactDOM.render(elem, document.getElementById('content'));



// const osMap = {
//   win32: 'Windows',
//   darwin: 'macOS',
//   linux: 'Linux'
// };

// document.querySelector('#app').style.display = 'block';
// document.querySelector('#greet').innerHTML = greet();
// document.querySelector('#os').innerHTML = osMap[process.platform];
// document.querySelector('#author').innerHTML = manifest.author;
// document.querySelector('#env').innerHTML = env.name;
// document.querySelector('#electron-version').innerHTML = process.versions.electron;

console.log(manifest.version);

