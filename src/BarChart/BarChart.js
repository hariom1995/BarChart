import React, { Component } from 'react';
import * as d3 from 'd3';

class BarChart extends React.Component {
    componentDidMount() {
        this.drawSVG()
    }

    drawSVG = () => {
        console.log('inside drawSVG');
        let data = [
            {
                year: 2010,
                value: 15000
            },
            {
                year: 2011,
                value: 10000
            }, {
                year: 2012,
                value: 17000
            }, {
                year: 2013,
                value: 18000
            }, {
                year: 2014,
                value: 19000
            }, {
                year: 2015,
                value: 90000
            },
        ];

        let svg = d3.select("svg"),
            margin = 200,
            width = svg.attr("width") - margin,
            height = svg.attr("height") - margin;

        svg.append("text")
            .attr("transform", "translate(100,0)")
            .attr("x", 50)
            .attr("y", 50)
            .attr("font-size", "24px")
            .text("Bengalore Rent Price")

        let x = d3.scaleBand().range([0, width]).padding(0.4),
            y = d3.scaleLinear().range([height, 0]);

        let g = svg.append("g")
            .attr("transform", "translate(" + 100 + "," + 100 + ")");

        x.domain(data.map(function (d) { return d.year; }));
        y.domain([0, d3.max(data, function (d) { return d.value; })]);

        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .append("text")
            .attr("y", height - 250)
            .attr("x", width - 100)
            .attr("text-anchor", "end")
            .attr("stroke", "black")
            .text("Year");

        g.append("g")
            .call(d3.axisLeft(y).tickFormat(function (d) {
                return "Rs" + d;
            }).ticks(10))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "-5.1em")
            .attr("text-anchor", "end")
            .attr("stroke", "black")
            .text("Price");

        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .on("mouseover", onMouseOver)
            .on("mouseout", onMouseOut)
            .attr("x", function (d) { return x(d.year); })
            .attr("y", function (d) { return y(d.value); })
            .attr("width", x.bandwidth())
            .transition()
            .ease(d3.easeLinear)
            .duration(400)
            .delay(function (d, i) {
                return i * 50;
            })
            .attr("height", function (d) { return height - y(d.value); });

        function onMouseOver(d, i) {
            d3.select(this).attr('class', 'highlight');
            d3.select(this)
                .transition() 
                .duration(400)
                .attr('width', x.bandwidth() + 5)
                .attr("y", function (d) { return y(d.value) - 10; })
                .attr("height", function (d) { return height - y(d.value) + 10; });

            g.append("text")
                .attr('class', 'val')
                .attr('x', function () {
                    return x(d.year);
                })
                .attr('y', function () {
                    return y(d.value) - 15;
                })
                .text(function () {
                    return ['Rs' + d.value];
                });
        }

        function onMouseOut(d, i) {
            d3.select(this).attr('class', 'bar');
            d3.select(this)
                .transition()
                .duration(400)
                .attr('width', x.bandwidth())
                .attr("y", function (d) { return y(d.value); })
                .attr("height", function (d) { return height - y(d.value); });

            d3.selectAll('.val')
                .remove()
        }

    }

    render() {
        return (
            <React.Fragment>
                <div className='barChart' style={{ fontSize: '30px' }}>Bar Chart With React and D3 JS </div>
                <div className='barChart' style={{ fontSize: '15px' }}>Here Am Showing in a Bengalore room rent price according to year(am using custom data) </div>
                <svg width="800" height="600"></svg>
            </React.Fragment>
        );
    }
}

export default BarChart;
