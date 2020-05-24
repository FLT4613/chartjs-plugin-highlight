import * as Chart from "chart.js"
import * as Color from "color"
import * as ColorString from 'color-string'
import { plugin } from './plugin'

const bar: Chart.ChartConfiguration = {
    type: 'bar',
    plugins: [plugin],
    data: {
        labels: ["Day1", "Day2", "Day3"],
        datasets: [
            {
                label: "base data",
                data: [27, 33, 49],
                borderColor: '#FF0000',
                backgroundColor: '#FF0000',
                stack: 'Stack 0',
            },
            {
                label: "stacked data",
                data: [10, 15, 22],
                backgroundColor: '#0000FF',
                stack: 'Stack 0',
            }
        ]
    },
    options: {
        scales: {
            xAxes: [{
                stacked: true,
            }],
            yAxes: [{
                stacked: true,
                ticks: {
                    beginAtZero: true,
                    min: 0
                }
            }]
        }
    }
};

const pie: Chart.ChartConfiguration = {
    type: 'pie',
    plugins: [plugin],
    data: {
        datasets: [{
            data: [
                10,20,10,20,39
            ],
            backgroundColor: [
                Color(ColorString.to.hsl([Math.floor(Math.random() * 360), 50, 50])).toString(),
                Color(ColorString.to.hsl([Math.floor(Math.random() * 360), 50, 50])).toString(),
                Color(ColorString.to.hsl([Math.floor(Math.random() * 360), 50, 50])).toString(),
                Color(ColorString.to.hsl([Math.floor(Math.random() * 360), 50, 50])).toString(),
                Color(ColorString.to.hsl([Math.floor(Math.random() * 360), 50, 50])).toString(),
            ],
        }],
        labels: [
            'Dataset 1',
            'Dataset 2',
            'Dataset 3',
            'Dataset 4',
            'Dataset 5',
        ]
    },
};

[
    bar,
    // pie
].forEach((v: Chart.ChartConfiguration) => {
    const title = document.createElement('h2')
    title.textContent = v.type
    const wrapper = document.createElement('div')
    wrapper.style.width = "400px";
    wrapper.style.height = "400px";
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    document.getElementById('root').appendChild(title)
    document.getElementById('root').appendChild(wrapper)
    wrapper.appendChild(canvas)
    var ctx = canvas.getContext("2d");
    new Chart(ctx, v)
});

