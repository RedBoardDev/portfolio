import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";
import "./WordCloud.css";
import { Paper, Box } from '@mui/material';

const WordCloud = ({ data }) => {
    const wordCloudRef = useRef(null);

    useEffect(() => {
        d3.select(wordCloudRef.current).html("");

        const drawWordCloud = data => {
            const color = d3.scaleOrdinal()
                .domain(data.map(d => d.text))
                .range(["#003f5c", "#bc5090", "#ffa600", "#ff7c43", "#1F1F1F", "#008080", "#D2691E", "#808080"]);

            const screenWidth = wordCloudRef.current.clientWidth;
            const maxWordSize = 40;
            const minWordSize = 20;
            const maxPadding = 10;
            const minPadding = 5;

            const wordSizeScale = d3
                .scaleLinear()
                .domain([300, 1200])
                .range([minWordSize, maxWordSize])
                .clamp(true);

            const paddingScale = d3
                .scaleLinear()
                .domain([300, 1200])
                .range([minPadding, maxPadding])
                .clamp(true);

            const layout = cloud()
                .size([screenWidth, 400])
                .words(data.map((d) => ({ text: d.text, size: wordSizeScale(screenWidth) })))
                .padding((d) => paddingScale(screenWidth))
                .rotate(() => Math.floor(Math.random() * 21) - 10)
                .font("Arial")
                .fontSize((d) => d.size)
                .on("end", draw);
            layout.start();


            function draw(words) {
                const svg = d3.select(wordCloudRef.current)
                    .append("svg")
                    .attr("width", layout.size()[0])
                    .attr("height", layout.size()[1])
                    .append("g")
                    .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")");

                const text = svg.selectAll("text")
                    .data(words)
                    .enter()
                    .append("text")
                    .style("font-size", d => d.size + "px")
                    .style("font-family", "Arial")
                    .style("fill", d => color(d.text))
                    .attr("class", "word-cloud-word")
                    .attr("text-anchor", "middle")
                    .attr("transform", d => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")")
                    .text(d => d.text)
                    .on('click', handleClick);
            }

            function handleClick(d) {
                const word = d3.select(this);
                const isSelected = word.classed("selected");

                if (!isSelected) {
                    d3.selectAll(".word-cloud-word")
                        .style("font-weight", "normal")
                        .classed("selected", false);

                    word.style("font-weight", "bold")
                        .classed("selected", true);
                }

                const descriptionContainer = d3.select(".description-container");
                const matchedData = data.find(item => item.text === word.text());
                descriptionContainer.text(matchedData.text + ": " + matchedData.description);
            }
        };

        drawWordCloud(data);
    }, [data]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '94%',
            margin: '0 auto'
        }}>
            <Paper elevation={15} sx={{
                padding: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRadius: '25px',
                alignItems: 'stretch',
                width: '100%',
                bgcolor: '#f5f2f2'
            }}>
                <Box sx={{
                    flexGrow: 1,
                    height: 400,
                    position: 'relative',
                    borderRadius: '15px'
                }} ref={wordCloudRef}></Box>
            </Paper>
            <Box sx={{
                width: '100%',
                minHeight: 'auto',
                p: 2,
                borderRadius: '15px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                fontSize: '16px',
                fontFamily: '"Lucida Console", Monaco, monospace',
                letterSpacing: '0.1em',
                lineHeight: '24px',
                marginTop: '0.5em',
                transition: 'all 0.3s ease'
            }} className="description-container">
                Cliquez sur un mot pour plus de détails
            </Box>
        </Box>
    );
};

export default WordCloud;
