import React, { useEffect, createRef } from 'react';
import { styled } from '@superset-ui/core';
// @ts-ignore
import * as venn from 'venn.js';
// @ts-ignore
import * as d3 from 'd3'
import { VennDiagramProps, VennDiagramStylesProps } from './types';
import ProcessData from './dataPrep';

const Styles = styled.div<VennDiagramStylesProps>`
  background-color: #fff;
  padding: ${({ theme }) => theme.gridUnit * 4}px;
  border-radius: ${({ theme }) => theme.gridUnit * 2}px;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;

  svg {
    display: block;
    margin: 0 auto;
  }

  h3 {
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.gridUnit * 3}px;
    font-size: ${({ theme, headerFontSize }) =>
    theme.typography.sizes[headerFontSize]}px;
    font-weight: ${({ theme, boldText }) =>
    theme.typography.weights[boldText ? 'bold' : 'normal']};
  }

  /* Tooltip styles */
  .tooltip {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 5px;
    border-radius: 3px;
    font-size: 12px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s;
  }
`;

export default function VennDiagram(props: VennDiagramProps) {
  const { data, height, width } = props;
  const rootElem = createRef<HTMLDivElement>();

  useEffect(() => {
    const root = rootElem.current as HTMLElement;

    // Clear any existing diagram
    d3.select(root).select('svg').remove();

    // Set up the Venn diagram
    const chart = venn.VennDiagram().width(width).height(height);

    const finalData = ProcessData(data);

    const vennData: { sets: string[], size: number }[] = finalData.map((projectGroup) => ({
      sets: projectGroup.set,
      size: projectGroup.count,
    }));

    console.log("Venn Data is: ")
     console.log(vennData)

    const svg = d3
      .select(root)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    svg.datum(vennData).call(chart);

    // Create a tooltip div and append it to the body
    const tooltip = d3.select('body').append('div').attr('class', 'tooltip');

    // Add mouseover and mouseout events to show and hide the tooltip
    svg
      .selectAll('path')
      .on('mouseover', function (event:any, d:any) {
        tooltip
          .style('opacity', 1)
          .html(`Count: ${d.size}`)
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY + 10}px`);
      })
      .on('mouseout', function () {
        tooltip.style('opacity', 0);
      });

    // Add labels to the diagram
    svg
      .selectAll('text')
      .style('fill', 'black')
      .style('font-size', '12px');
  }, [data, height, width]);

  

  
  return (
    <Styles
      ref={rootElem}
      boldText={props.boldText}
      headerFontSize={props.headerFontSize}
      height={height}
      width={width}
    />
  );
}
