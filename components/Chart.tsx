import React, { useRef } from 'react';
import ReactECharts from "echarts-for-react";

export const Chart = ({ 
  data = [3.35, 6.27, 3.85, 5.27, 6.34, 8.94, 5.36, 8.94, 10.42, 9, 14], 
  categories = ["", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", ""] 
}) => {
  const containerRef = useRef(null);
  const containerWidth = containerRef.current ? containerRef.current.offsetWidth : window.innerWidth;
    const isMobile = containerWidth <= 768;
    const options = {
        tooltip: {
            trigger: "axis",
            backgroundColor: "#363636",
            borderWidth: 0,             
            textStyle: {
              color: "#fff",            
              fontSize: 14,
            },
            axisPointer: {
              type: "line",
              lineStyle: {
                color: "#303030",       
                width: 2,
              },
            },
            formatter: (params) => {
              // params — масив з даними по серії
              const item = params[0];
              const month = item.axisValue;   
              const value = item.data;        
              const year = "2025"; 
          
              return `
                <div style="display:flex; gap:36px; min-width:120px; padding: 3px 15px;">
                  <span style="font-weight:400; font-size:14px; color:#fff;">${month} ${year}</span>
                  <span style="font-size:14px; display:flex; gap:12px; font-weight:400; color:#fff;"><span style="opacity:0.5;">APY: </span><span style="color:#18A0FB;">${value}</span></span>
                </div>
              `;
            },
          },
        xAxis: {
            type: "category",
            data: categories,
            boundaryGap: false,
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: {
              fontFamily: "'Space Mono', monospace",
              show: true,
              color: "rgba(255, 255, 255, 0.5)",
              fontSize: 12,
              padding: [20, 0, 0, 0],
            },
          },
        yAxis: {
          type: "value",
          name: "APY",              
          nameLocation: "end",
          nameTextStyle: {
            fontFamily: "'Space Mono', monospace",
            fontSize: 12,
            color: "#fff",
            padding: [0, 100, 13, 0]  
          },
          min: 0,
          max: 15, 
          interval: 1,
          axisLabel: {
            fontFamily: "'Space Mono', monospace",
            formatter: "{value} %",
            color: "rgba(255, 255, 255, 0.5)",
            fontSize: 12,
            padding: isMobile ? [0, 5, 0, 0] : [0, 20, 0, 0],
            margin: 5,
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "#303030", 
            },
          },
        },
        series: [
          {
            data,
            type: "line",
            smooth: true,
            showSymbol: false, 
            emphasis: {
                focus: "series",
                itemStyle: {
                  color: "#000", 
                  borderColor: "#0088d4", 
                  borderWidth: 3, 
                },
                symbol: "circle",
                symbolSize: 16, 
              },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 1, color: "rgba(0, 136, 212, 0)" },
                ],
              },
            },
            lineStyle: {
              color: "#18A0FB",
              width: 2,
            },
            symbol: "circle",
            symbolSize: 8,
            itemStyle: {
              color: "#0088d4",
            },
          },
        ],
      };

  return (
    <ReactECharts option={options} style={{ height: "510px", width: "100%", maxWidth: "1000px", marginTop: "-50px" }} />
  );
};

