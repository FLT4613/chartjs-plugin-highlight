import * as Chart from "chart.js"
import * as Color from "color"

interface ChartOptionWithHighlightProp extends Chart.ChartDataSets {
    focusing: Boolean
}

interface ChartLegend extends Chart {
    legend: {
        mouseOnLegend: Boolean;
        legendItems: Chart.ChartLegendOptions[]
    }
}

export const plugin = {
    afterInit: function (chart: ChartLegend, options: Chart.ChartOptions) {
        const focus = (chart: Chart, index: number) => {
            chart.config.data.datasets.forEach((_, i, a: ChartOptionWithHighlightProp[]) => {
                a[i].borderColor = Color(a[i].borderColor).alpha(0.2).toString()
                a[i].backgroundColor = Color(a[i].backgroundColor).alpha(0.2).toString()
                a[i].focusing = false
            })
            chart.config.data.datasets[index].backgroundColor = Color(
                chart.config.data.datasets[index].backgroundColor
            ).alpha(1).toString()
            chart.config.data.datasets[index].borderColor = Color(
                chart.config.data.datasets[index].borderColor
            ).alpha(1).toString()
            const dataset: ChartOptionWithHighlightProp = <ChartOptionWithHighlightProp>chart.config.data.datasets[index]
            dataset.focusing = true
            chart.update({
                duration: 0,
            })
        }
        const unfocus = (chart: Chart) => {
            chart.config.data.datasets.forEach((_, i, a: ChartOptionWithHighlightProp[]) => {
                a[i].borderColor = Color(a[i].borderColor).alpha(1).toString()
                a[i].backgroundColor = Color(a[i].backgroundColor).alpha(1).toString()
                a[i].focusing = false
            })
            chart.update()
        }
        chart.options.onHover = function (e, legendItem) {
            if (legendItem.length > 0) {
                const meta: { _datasetIndex?: number } = chart.getDatasetAtEvent(e)[0]
                const index: number = meta._datasetIndex
                const dataset:ChartOptionWithHighlightProp = <ChartOptionWithHighlightProp>chart.config.data.datasets[index]
                if (!dataset.focusing) {
                    focus(chart, index)
                }
            } else {
                if (chart.config.data.datasets.some((v:ChartOptionWithHighlightProp) => v.focusing)) {
                    const legend = chart.legend
                    if(!legend.mouseOnLegend){
                        unfocus(chart)
                    }
                }
            }
        }
        chart.options.tooltips.callbacks.labelColor = function(tooltipItem, chart) {
            const dataset = chart.config.data.datasets[tooltipItem.datasetIndex]
            return {
                borderColor: <string>dataset.borderColor,
                backgroundColor: <string>dataset.backgroundColor
            };
        }
        chart.options.legend.onHover = function (e, legendItem) {
            const index: number = legendItem.datasetIndex
            const legend = chart.legend
            if (!legend.mouseOnLegend) {
                const legend = chart.legend
                legend.mouseOnLegend = true
                focus(chart, index)
            }
        }
        chart.options.legend.onLeave = function () {
            const legend = chart.legend
            if(legend.mouseOnLegend){
                unfocus(chart)
                legend.mouseOnLegend = false
            }
        }
    },
    beforeDraw: function (c: ChartLegend) {
        const legends = c.legend.legendItems;
        c.config.data.datasets.forEach(function (v, i) {
            legends[i].fillStyle = Color(v.backgroundColor).alpha(1).toString();
        })
    }
};

