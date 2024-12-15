import React, { useEffect, createRef } from 'react';
import { styled } from '@superset-ui/core';
// @ts-ignore
import * as venn from 'venn.js';
// @ts-ignore
import * as d3 from 'd3'
import { VennDiagramProps, VennDiagramStylesProps } from './types';

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
`;

export default function VennDiagram(props: VennDiagramProps) {
  const { data, height, width } = props;
  const rootElem = createRef<HTMLDivElement>();
  // console.log(data)

  useEffect(() => {
    const root = rootElem.current as HTMLElement;

    // Clear any existing diagram
    d3.select(root).select('svg').remove();

    // Set up the Venn diagram
    const chart = venn.VennDiagram().width(width).height(height);

    const schemaCount: { [key: string]: number } = {};
    const intersectionCount: { [key: string]: number } = {};

    // data.forEach(item => {
    //   if (schemaCount[item.project?.toString()+""]) {
    //     schemaCount[item.project?.toString()+""]++;
    //   } else {
    //     schemaCount[item.project?.toString()+""] = 1;
    //   }
    // });

    data.forEach(item => {
      const schema = item.project?.toString();
      if (schemaCount[schema+""]) {
        schemaCount[schema+""]++;
      } else {
        schemaCount[schema+""] = 1;
      }

      // Handle intersections
      const intersectionKey = Object.keys(schemaCount).filter(key => key !== schema).map(key => `${key},${schema}`).join(',');
      if (intersectionCount[intersectionKey]) {
        intersectionCount[intersectionKey]++;
      } else {
        intersectionCount[intersectionKey] = 1;
      }
    });
    

    // const vennData: { sets: string[], size: number }[] = Object.keys(schemaCount).map(schema => ({
    //   sets: [schema],
    //   size: schemaCount[schema],
    // }));

    const vennData: { sets: string[], size: number }[] = Object.keys(schemaCount).map(schema => ({
      sets: [schema],
      size: schemaCount[schema],
    }));


    console.log(vennData)

    const svg = d3
      .select(root)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    svg.datum(vennData).call(chart);

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
    >
    </Styles>
  );
}