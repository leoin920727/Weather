"use strict"
const btn = document.querySelector("button")
const text = document.querySelector(".title")
const wd = document.querySelector(".weather")
const input = document.querySelector("input")
const rains = document.querySelector(".rains")
const temp = document.querySelector(".temp")
const winds = document.querySelector(".winds")
const times = document.querySelector(".time")
btn.addEventListener("click", getWeather)
async function getWeather() {
    const data = await fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-86A0AC43-A4B0-4037-B722-9ACE391FB717")
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            console.log(res)
            return res.records.locations[0].location
        })
        .catch((error) => {
            console.log("ERROR", error)
        })
    text.innerHTML = ""
    const location = input.value
    text.innerHTML = location
    input.value = ""
    search(data, location);
    console.log(data)
}
function search(data, location) {
    for (let arr of data) {
        if (arr.locationName === location) {
            let min = arr.weatherElement[8].time[0].elementValue[0].value
            let max = arr.weatherElement[12].time[0].elementValue[0].value
            let rain = arr.weatherElement[0].time[0].elementValue[0].value
            let wind = arr.weatherElement[4].time[0].elementValue[0].value
            temp.innerHTML = `${min}℃~${max}℃`
            rains.innerHTML = `${rain}%`
            winds.innerHTML = `${wind}公里/時`
            let msg = arr.weatherElement[6].time[0].elementValue[0].value
            changeimg(msg)

        }
    }
}
const wdImg = document.querySelector(".IMG")
function changeimg(msg) {
    wd.innerHTML = msg
    // wdImg.innerHTML = 
    switch (msg) {
        case "多雲時晴":
        case "晴時多雲":
        case "多雲":
            wdImg.innerHTML = '<img src="./img/sc.png" style="width: 100%;"></img>'
            break;
    }
}
function time() {
    const date = new Date().toLocaleString()
    times.innerHTML = date
}
setInterval(time, 1000)


// 降雨機率[0]
// 最大風速[4]
// 天氣現象[6]
// 最低溫[8]
// 最高溫[12]
