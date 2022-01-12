import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { addTileLayer, validateIp } from "./helpers";
import icon from '../images/icon-location.svg';

const ipInput = document.querySelector('.search-bar__input');
const button = document.querySelector('.search-bar__btn');
const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

button.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

const markerIcon = L.icon({
    iconUrl: icon,
    iconSize: [30, 40],
})

const mapArea = document.querySelector('.map');
const map = L.map(mapArea, {
    center: [51.505, -0.09],
    zoom: 13,
});

addTileLayer(map);
L.marker([51.505, -0.09], {icon: markerIcon}).addTo(map);

function getData() {
    if (validateIp(ipInput.value)) {
        fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_w8ieG8mdSf7YDhJPFHKOw4DC3BFa7&ipAddress=${ipInput.value}`)
        .then(response => response.json())
        .then(setInfo)
    }
}

function handleKey(e) {
    if (e.key === 'Enter') {
        getData();
    }
}

function setInfo(mapData) {
    console.log(mapData);
    const {country, region, timezone} = mapData.location;
    ipInfo.innerText = mapData.ip;
    locationInfo.innerText = country + ' ' + region;
    timezoneInfo.innerText = timezone;
    ispInfo.innerText = mapData.isp;

    map.setView([51.505, -0.09]);
}