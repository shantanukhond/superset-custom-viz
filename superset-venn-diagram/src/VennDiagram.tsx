/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * either express or implied.  See the License for the specific
 * language governing permissions and limitations under the License.
 */

import React, { useEffect, createRef } from 'react';
import { styled } from '@superset-ui/core';
// @ts-ignore
import * as venn from 'venn.js';
// @ts-ignore
import * as d3 from 'd3'
import { VennDiagramProps, VennDiagramStylesProps } from './types';

const Styles = styled.div<VennDiagramStylesProps>`
  background-color: ${({ theme }) => theme.colors.secondary.light2};
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

  useEffect(() => {
    const root = rootElem.current as HTMLElement;

    // Clear any existing diagram
    d3.select(root).select('svg').remove();

    // Set up the Venn diagram
    const chart = venn.VennDiagram().width(width).height(height);

    const vennData =  [
      { sets: ['A'], size: 10 },
      { sets: ['B'], size: 10 },
      { sets: ['A', 'B'], size: 5 },
    ];

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
      <h3>{props.headerText}</h3>
    </Styles>
  );
}
