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
import './js/listeners';
import {loadMeetings} from './js/sideBar';

fontawesome.library.add(solids, regulars);

const app = remote.app;
const appDir = jetpack.cwd(app.getAppPath());

const manifest = appDir.read('package.json', 'json');


loadMeetings();



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

